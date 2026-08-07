import type { NextRequest } from "next/server";
import { getDynamicSagas } from "@/lib/serverData";

export function validateEditorAccess(request: NextRequest, chapterId: string): boolean {
  const masterPassword = process.env.PREVIEW_PASSWORD || "spiderman1999";
  const headerPass = request.headers.get("x-editor-password");
  const cookiePass = request.cookies.get("preview_password")?.value;
  const providedPassword = headerPass || cookiePass;

  if (!providedPassword) return false;
  if (providedPassword === masterPassword) return true;

  return getDynamicSagas().some(
    (saga) =>
      saga.chapters.some((chapter) => chapter.id === chapterId) &&
      Boolean(saga.password) &&
      saga.password === providedPassword
  );
}

