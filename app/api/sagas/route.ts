import { NextRequest, NextResponse } from "next/server";
import { getDynamicSagas, validatePreviewAccess } from "@/lib/serverData";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sagas = getDynamicSagas();
  const hasAccess = validatePreviewAccess(request);

  if (hasAccess) {
    return NextResponse.json(sagas);
  }

  // Filter out draft sagas and draft chapters
  const publicSagas = sagas
    .filter((saga) => !saga.draft)
    .map((saga) => ({
      ...saga,
      chapters: saga.chapters.filter((chapter) => !chapter.draft),
    }));

  return NextResponse.json(publicSagas);
}
