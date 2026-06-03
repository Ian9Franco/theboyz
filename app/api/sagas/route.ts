import { NextResponse } from "next/server";
import { getDynamicSagas } from "@/lib/serverData";

export const dynamic = "force-dynamic";

export async function GET() {
  const sagas = getDynamicSagas();
  return NextResponse.json(sagas);
}
