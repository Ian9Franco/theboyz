import { NextResponse } from "next/server";
import { getDynamicSagas } from "@/lib/serverData";

export async function GET() {
  const sagas = getDynamicSagas();
  return NextResponse.json(sagas);
}
