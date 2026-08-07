export const DIALOGUE_DOCUMENT_ROLES = [
  "sagaCanon",
  "characterSheet",
  "chapterState",
] as const;

export type DialogueDocumentRole = (typeof DIALOGUE_DOCUMENT_ROLES)[number];

export type DialogueDocumentAssociation = {
  path: string;
  role: DialogueDocumentRole;
};

export type DialoguePageContext = {
  prompt: string;
  characters: string[];
  continuityPages: number;
};

export type DialogueContextConfig = {
  version: 1;
  documents: DialogueDocumentAssociation[];
  pages: Record<string, DialoguePageContext>;
};

export function createEmptyDialogueContext(): DialogueContextConfig {
  return {
    version: 1,
    documents: [],
    pages: {},
  };
}

export function getPageDialogueContext(
  config: DialogueContextConfig,
  pageKey: string
): DialoguePageContext {
  return config.pages[pageKey] || {
    prompt: "",
    characters: [],
    continuityPages: 2,
  };
}

