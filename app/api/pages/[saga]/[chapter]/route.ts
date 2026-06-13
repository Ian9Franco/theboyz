/**
 * app/api/pages/[saga]/[chapter]/route.ts
 *
 * API route para listar las páginas de un capítulo específico
 * por saga + chapter ID. Usa GitHub API en producción.
 */

import { NextRequest, NextResponse } from "next/server";
import { getDynamicSagas, validatePreviewAccess } from "@/lib/serverData";
import {
  fetchSagaFolders,
  fetchChapterFolders,
  fetchComicPages,
  resolveFolderName,
} from "@/lib/githubComics";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ saga: string; chapter: string }> }
) {
  const { saga, chapter } = await params;

  // Prevenir path traversal
  if (
    saga.includes("..") ||
    chapter.includes("..") ||
    saga.includes("/") ||
    saga.includes("\\") ||
    chapter.includes("/") ||
    chapter.includes("\\")
  ) {
    return NextResponse.json({ pages: [], cover: null }, { status: 400 });
  }

  // ── Verificar acceso a borradores ────────────────────────────────────────
  const sagas = getDynamicSagas();
  const targetSaga = sagas.find((s) => s.id.toLowerCase() === saga.toLowerCase());

  if (targetSaga) {
    const targetChapter = targetSaga.chapters.find(
      (c) => c.id.toLowerCase() === chapter.toLowerCase()
    );
    const isDraft = targetSaga.draft || (targetChapter && targetChapter.draft);
    if (isDraft) {
      const hasAccess = validatePreviewAccess(request, targetSaga.id);
      if (!hasAccess) {
        return NextResponse.json({ pages: [], cover: null, error: "locked" });
      }
    }
  }

  // ── Obtener páginas desde GitHub API ────────────────────────────────────
  const sagaFolders    = await fetchSagaFolders();
  const sagaFolderName = resolveFolderName(sagaFolders, saga) ?? saga;

  const chapterFolders    = await fetchChapterFolders(sagaFolderName);
  const chapterFolderName = resolveFolderName(chapterFolders, chapter) ?? chapter;

  const { pages, cover } = await fetchComicPages(sagaFolderName, chapterFolderName);

  return NextResponse.json({ pages, cover });
}
