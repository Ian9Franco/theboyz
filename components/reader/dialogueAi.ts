import type { DialogueLine } from "./DialogueBubble";

export type DialogueTone =
  | "neutral"
  | "dramatic"
  | "comedic"
  | "dark"
  | "epic"
  | "intimate";

export type DialogueDensity = "sparse" | "balanced" | "dense";

/**
 * Temporary AI proposal. Coordinates stay normalized while the proposal is in
 * preview and are converted to the editor's percentage coordinates on apply.
 */
export type AiDialogueProposal = {
  panelIndex: number;
  text: string;
  speaker: string | null;
  showSpeakerName: boolean;
  offscreen: boolean;
  style: NonNullable<DialogueLine["style"]>;
  tail: NonNullable<DialogueLine["tail"]>;
  posX: number;
  posY: number;
  size: NonNullable<DialogueLine["size"]>;
  tailX: number | null;
  tailY: number | null;
};

