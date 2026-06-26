import { pibes } from "./characterData/pibes";
import { secundarios } from "./characterData/secundarios";
import { voughtverse } from "./characterData/voughtverse";
import { matis } from "./characterData/matis";
import { antagonistas } from "./characterData/antagonistas";
import { entidades } from "./characterData/entidades";
import { deidades } from "./characterData/deidades";
import { locaciones } from "./characterData/locaciones";
import { UNLOCK_RULES } from "./characterData/unlockRules";
import { CharacterDetail } from "./characterData/types";
import { characterImages } from "./characterData/characterImages";

const rawCharacters: CharacterDetail[] = [
  ...pibes,
  ...secundarios,
  ...voughtverse,
  ...matis,
  ...antagonistas,
  ...entidades,
  ...deidades,
  ...locaciones
];

export const CHARACTER_DETAILS: CharacterDetail[] = rawCharacters.map((char) => {
  const images = characterImages[char.id];
  if (images) {
    // portadaImages and fichaImages are STRICTLY from the generator (public/ directory).
    // These are used as visibility gates — if empty, the character is hidden from the roster.
    const generatedPortadas = (images.portadas && images.portadas.length > 0) ? images.portadas : [];
    const generatedFichas   = (images.fichas   && images.fichas.length   > 0) ? images.fichas   : [];

    // Display image: real portada → real ficha → hardcoded fallback (for modal, never roster gate)
    const mainPortada = images.portada || generatedPortadas[0] || "";
    const mainFicha   = images.ficha   || generatedFichas[0]   || char.fichaImage || (char as any).ficha || "";
    const displayImage = mainPortada || mainFicha || char.image || char.fullBody || "";

    return {
      ...char,
      image:         displayImage,
      fullBody:      mainPortada || char.fullBody || char.image || mainFicha || "",
      portadaImages: generatedPortadas,   // strict: only real portadas from public/
      fichaImages:   generatedFichas,     // strict: only real fichas from public/
    };
  }
  return char;
});

export function getComputedCharacters(readChapters: string[], isClient: boolean, unlockAll: boolean = false) {
  const normalizedRead = readChapters.map(id => id.toLowerCase().trim());

  const hasRead = (chapterId: string) =>
    normalizedRead.includes(chapterId.toLowerCase().trim());

  return CHARACTER_DETAILS.map((char) => {
    // Before hydration, show all locked (avoids flash of unlocked content)
    if (!isClient) {
      const alwaysUnlocked = ['ian', 'jaz'].includes(char.id) || (UNLOCK_RULES[char.id] !== undefined && UNLOCK_RULES[char.id].length === 0);
      return {
        ...char,
        incognito: !alwaysUnlocked,
        displayName: alwaysUnlocked ? char.name : '???',
        displayColor: alwaysUnlocked ? char.color : '#6b7280',
      };
    }

    const rules = UNLOCK_RULES[char.id];
    const alwaysUnlocked = rules !== undefined && rules.length === 0;
    const unlocked = unlockAll || alwaysUnlocked || (rules?.some(hasRead) ?? false);

    return {
      ...char,
      incognito: !unlocked,
      displayName: unlocked ? char.name : '???',
      displayColor: unlocked ? char.color : '#6b7280',
    };
  });
}
