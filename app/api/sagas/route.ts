import { NextRequest, NextResponse } from "next/server";
import { getDynamicSagas, validatePreviewAccess } from "@/lib/serverData";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sagas = getDynamicSagas();
  return NextResponse.json(sagas);
}
