import { NextRequest, NextResponse } from "next/server";
import { getDynamicSagas, parsePrefix, validatePreviewAccess } from "@/lib/serverData";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

  // Check draft preview authorization
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

  // Look up pages
  const comicsDir = path.join(process.cwd(), "public", "comics");
  
  // Find actual saga folder name matching foundSaga.id using parsePrefix
  const sagaFolders = fs.readdirSync(comicsDir);
  const actualSagaFolder = sagaFolders.find(f => {
    const { cleanName } = parsePrefix(f);
    return cleanName === foundSaga.id;
  }) || foundSaga.id;

  const sagaPath = path.join(comicsDir, actualSagaFolder);
  const chapterFolders = fs.readdirSync(sagaPath);
  const actualChapterFolder = chapterFolders.find(f => {
    const { cleanName } = parsePrefix(f);
    return cleanName === foundChapter.id;
  }) || foundChapter.id;

  const dirPath = path.join(sagaPath, actualChapterFolder);
  
  let pages: string[] = [];
  let cover: string | null = null;

  const encSaga = encodeURIComponent(actualSagaFolder);
  const encChapter = encodeURIComponent(actualChapterFolder);

  if (fs.existsSync(dirPath)) {
    const allFiles = fs.readdirSync(dirPath);
    const filteredFiles: string[] = [];

    for (const file of allFiles) {
      const ext = path.extname(file).toLowerCase();
      if (!SUPPORTED_FORMATS.includes(ext)) continue;

      const baseName = path.basename(file, ext).toLowerCase();
      if (baseName === "portada") {
        cover = `/comics/${encSaga}/${encChapter}/${encodeURIComponent(file)}`;
      } else {
        filteredFiles.push(file);
      }
    }

    pages = filteredFiles
      .sort((a, b) => {
        const nameA = path.basename(a, path.extname(a));
        const nameB = path.basename(b, path.extname(b));
        return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: "base" });
      })
      .map((file) => `/comics/${encSaga}/${encChapter}/${encodeURIComponent(file)}`);
  }

  if (!cover && pages.length > 0) {
    cover = pages[0];
  }

  let prevChapter = null;
  let nextChapter = null;

  const sagaIndex = sagas.findIndex((s) => s.id === foundSaga.id);

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
    dialogues: (() => {
      // Try to load dialogues.json from the chapter folder
      try {
        const dialoguesPath = path.join(dirPath, "dialogues.json");
        if (fs.existsSync(dialoguesPath)) {
          const raw = fs.readFileSync(dialoguesPath, "utf-8");
          return JSON.parse(raw);
        }
      } catch (e) {
        console.error("Error reading dialogues.json:", e);
      }
      return null;
    })(),
  });
}
