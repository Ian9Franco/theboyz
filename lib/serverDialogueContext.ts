import fs from "fs";
import path from "path";
import {
  createEmptyDialogueContext,
  type DialogueContextConfig,
  type DialogueDocumentRole,
} from "@/lib/dialogueContext";

const CONTEXT_FILENAME = "ai-context.json";
const MAX_DOCUMENT_CHARS_PER_LAYER = 60_000;

export function loadDialogueContext(chapterPath: string): DialogueContextConfig {
  const contextPath = path.join(chapterPath, CONTEXT_FILENAME);
  if (!fs.existsSync(contextPath)) return createEmptyDialogueContext();

  try {
    const parsed = JSON.parse(fs.readFileSync(contextPath, "utf-8"));
    return {
      version: 1,
      documents: Array.isArray(parsed.documents) ? parsed.documents : [],
      pages: parsed.pages && typeof parsed.pages === "object" ? parsed.pages : {},
    };
  } catch (error) {
    console.error("Error reading ai-context.json:", error);
    return createEmptyDialogueContext();
  }
}

export function saveDialogueContext(chapterPath: string, config: DialogueContextConfig) {
  fs.writeFileSync(
    path.join(chapterPath, CONTEXT_FILENAME),
    `${JSON.stringify(config, null, 2)}\n`,
    "utf-8"
  );
}

export function resolveDocumentPath(relativeDocumentPath: string): string | null {
  const docsRoot = path.resolve(process.cwd(), "docs");
  const targetPath = path.resolve(docsRoot, relativeDocumentPath);
  const relative = path.relative(docsRoot, targetPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  if (path.extname(targetPath).toLowerCase() !== ".md") return null;
  return targetPath;
}

export function readContextDocuments(
  config: DialogueContextConfig,
  role: DialogueDocumentRole
) {
  // The Docs tab is the source of truth for associations. Character names are
  // page metadata for the model, not a filename convention: selected sheets
  // must not disappear merely because a document uses an alias or codename.
  const associations = config.documents.filter((document) => document.role === role);

  const documents: Array<{ path: string; content: string }> = [];
  let usedCharacters = 0;
  for (const association of associations) {
    const targetPath = resolveDocumentPath(association.path);
    if (!targetPath || !fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) continue;

    const remaining = MAX_DOCUMENT_CHARS_PER_LAYER - usedCharacters;
    if (remaining <= 0) break;
    const content = fs.readFileSync(targetPath, "utf-8").slice(0, remaining);
    usedCharacters += content.length;
    documents.push({ path: association.path, content });
  }
  return documents;
}
