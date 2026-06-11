import { NextRequest, NextResponse } from "next/server";
import { parsePrefix, getDynamicSagas, validatePreviewAccess } from "@/lib/serverData";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ saga: string; chapter: string }> }
) {
  const { saga, chapter } = await params;

  // Prevent path traversal safely without mutating spaces or cases
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

  // Check draft preview authorization
  const sagas = getDynamicSagas();
  const targetSaga = sagas.find((s) => s.id.toLowerCase() === saga.toLowerCase());
  if (targetSaga) {
    const targetChapter = targetSaga.chapters.find((c) => c.id.toLowerCase() === chapter.toLowerCase());
    const isDraft = targetSaga.draft || (targetChapter && targetChapter.draft);
    if (isDraft) {
      const hasAccess = validatePreviewAccess(request, targetSaga.id);
      if (!hasAccess) {
        return NextResponse.json({ pages: [], cover: null, error: "locked" });
      }
    }
  }

  const comicsDir = path.join(process.cwd(), "public", "comics");

  if (!fs.existsSync(comicsDir)) {
    return NextResponse.json({ pages: [], cover: null });
  }

  // Resolve actual saga directory name
  const sagaFolders = fs.readdirSync(comicsDir);
  const actualSagaFolder = sagaFolders.find((f) => {
    const { cleanName } = parsePrefix(f);
    return cleanName.toLowerCase() === saga.toLowerCase();
  }) || saga;

  const sagaPath = path.join(comicsDir, actualSagaFolder);
  if (!fs.existsSync(sagaPath)) {
    return NextResponse.json({ pages: [], cover: null });
  }

  // Resolve actual chapter directory name
  const chapterFolders = fs.readdirSync(sagaPath);
  const actualChapterFolder = chapterFolders.find((f) => {
    const { cleanName } = parsePrefix(f);
    return cleanName.toLowerCase() === chapter.toLowerCase();
  }) || chapter;

  const dirPath = path.join(sagaPath, actualChapterFolder);

  if (!fs.existsSync(dirPath)) {
    return NextResponse.json({ pages: [], cover: null });
  }

  const allFiles = fs.readdirSync(dirPath);

  // Find cover image if it exists (named "portada" in any supported format)
  let coverFile: string | null = null;
  const filteredFiles: string[] = [];

  const encSaga = encodeURIComponent(actualSagaFolder);
  const encChapter = encodeURIComponent(actualChapterFolder);

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) continue;

    const baseName = path.basename(file, ext).toLowerCase();
    if (baseName === "portada") {
      coverFile = `/comics/${encSaga}/${encChapter}/${encodeURIComponent(file)}`;
    } else {
      filteredFiles.push(file);
    }
  }

  // Sort remaining comic pages naturally
  const pages = filteredFiles
    .sort((a, b) => {
      const nameA = path.basename(a, path.extname(a));
      const nameB = path.basename(b, path.extname(b));
      return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: "base" });
    })
    .map((file) => `/comics/${encSaga}/${encChapter}/${encodeURIComponent(file)}`);

  // Fallback cover is the first page if "portada" is not explicitly provided
  const finalCover = coverFile || (pages.length > 0 ? pages[0] : null);

  return NextResponse.json({ pages, cover: finalCover });
}
