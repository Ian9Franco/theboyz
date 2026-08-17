export const PRIMER_VUELO_COMPLETION_TOKEN = "primer-vuelo-completado";

export function markChapterCompletionUnlock(chapterId: string): void {
  if (typeof window === "undefined") return;

  let normalizedId = chapterId;
  try {
    normalizedId = decodeURIComponent(chapterId);
  } catch {}

  normalizedId = normalizedId.toLowerCase().trim();
  if (normalizedId !== "primer vuelo" && normalizedId !== "primer-vuelo") return;

  try {
    const saved = localStorage.getItem("read-chapters");
    const readChapters: string[] = saved ? JSON.parse(saved) : [];
    const normalizedRead = readChapters.map((id) => id.toLowerCase().trim());

    if (!normalizedRead.includes(PRIMER_VUELO_COMPLETION_TOKEN)) {
      readChapters.push(PRIMER_VUELO_COMPLETION_TOKEN);
      localStorage.setItem("read-chapters", JSON.stringify(readChapters));
      window.dispatchEvent(new Event("readChaptersChanged"));
    }
  } catch (error) {
    console.error("No se pudo registrar el final de Primer Vuelo:", error);
  }
}
