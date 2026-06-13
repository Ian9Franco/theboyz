/**
 * app/api/chapters/[id]/route.ts
 *
 * API route que devuelve metadata y páginas de un capítulo.
 * En producción, las páginas se obtienen via GitHub API (githubComics.ts)
 * para no depender del filesystem de Vercel.
 *
 * Los dialogues.json SÍ se leen desde el filesystem local porque
 * viven en el repo principal (the-boys), no en el de imágenes.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDynamicSagas, parsePrefix, validatePreviewAccess } from "@/lib/serverData";
import {
  fetchSagaFolders,
  fetchChapterFolders,
  fetchComicPages,
  resolveFolderName,
} from "@/lib/githubComics";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // ── 1. Buscar el capítulo en la estructura de sagas ──────────────────────
  const sagas = getDynamicSagas();

  let foundSaga: any = null;
  let foundChapter: any = null;
  let chapterIndex = -1;

  for (const saga of sagas) {
    const idx = saga.chapters.findIndex((c) => c.id === id);
    if (idx !== -1) {
      foundSaga = saga;
      foundChapter = saga.chapters[idx];
      chapterIndex = idx;
      break;
    }
  }

  if (!foundSaga || !foundChapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  // ── 2. Verificar acceso a borradores ────────────────────────────────────
  const isDraft = foundSaga.draft || foundChapter.draft;
  if (isDraft) {
    const hasAccess = validatePreviewAccess(request, foundSaga.id);
    if (!hasAccess) {
      return NextResponse.json({
        locked: true,
        reason: "draft",
        title: foundChapter.title,
      });
    }
  }

  // ── 3. Obtener páginas desde GitHub API ──────────────────────────────────
  // Resolvemos el nombre exacto de la carpeta en el repo de imágenes
  // buscando por el cleanName (id) de la saga y el capítulo.
  const sagaFolders    = await fetchSagaFolders();
  const sagaFolderName = resolveFolderName(sagaFolders, foundSaga.id) ?? foundSaga.id;

  const chapterFolders    = await fetchChapterFolders(sagaFolderName);
  const chapterFolderName = resolveFolderName(chapterFolders, foundChapter.id) ?? foundChapter.id;

  const { pages, cover } = await fetchComicPages(sagaFolderName, chapterFolderName);

  // ── 4. Leer dialogues.json desde el filesystem local (repo principal) ────
  // Los diálogos SÍ están en el repo the-boys, por eso siguen usando fs.
  const dialogues = (() => {
    try {
      const comicsDir  = path.join(process.cwd(), "public", "comics");
      const sagaFolders = fs.readdirSync(comicsDir);
      const actualSagaFolder = sagaFolders.find((f) => {
        const { cleanName } = parsePrefix(f);
        return cleanName === foundSaga.id;
      }) ?? foundSaga.id;

      const sagaPath     = path.join(comicsDir, actualSagaFolder);
      const chFolders    = fs.existsSync(sagaPath) ? fs.readdirSync(sagaPath) : [];
      const actualChFolder = chFolders.find((f) => {
        const { cleanName } = parsePrefix(f);
        return cleanName === foundChapter.id;
      }) ?? foundChapter.id;

      const dialoguesPath = path.join(comicsDir, actualSagaFolder, actualChFolder, "dialogues.json");
      if (fs.existsSync(dialoguesPath)) {
        return JSON.parse(fs.readFileSync(dialoguesPath, "utf-8"));
      }
    } catch (e) {
      console.error("Error reading dialogues.json:", e);
    }
    return null;
  })();

  // ── 5. Navegación entre capítulos ────────────────────────────────────────
  const sagaIndex = sagas.findIndex((s) => s.id === foundSaga.id);

  let prevChapter = null;
  let nextChapter = null;

  if (chapterIndex > 0) {
    prevChapter = foundSaga.chapters[chapterIndex - 1];
  } else if (sagaIndex > 0) {
    const prevSaga = sagas[sagaIndex - 1];
    prevChapter = prevSaga.chapters[prevSaga.chapters.length - 1];
  }

  if (chapterIndex < foundSaga.chapters.length - 1) {
    nextChapter = foundSaga.chapters[chapterIndex + 1];
  } else if (sagaIndex < sagas.length - 1) {
    const nextSaga = sagas[sagaIndex + 1];
    nextChapter = nextSaga.chapters[0];
  }

  return NextResponse.json({
    chapter: foundChapter,
    saga: {
      id: foundSaga.id,
      title: foundSaga.title,
      color: foundSaga.color,
    },
    chapterIndex,
    pages,
    cover,
    prevChapter,
    nextChapter,
    cinematic: foundSaga.cinematic || foundChapter.cinematic || false,
    dialogues,
  });
}
