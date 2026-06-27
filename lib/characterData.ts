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

export const CHARACTER_DETAILS: CharacterDetail[] = rawCharacters
  .map((char) => {
    const images = characterImages[char.id];
    if (images) {
      const generatedPortadas = images.portadas || [];
      const generatedFichas   = images.fichas || [];

      // If the character doesn't have an image in PORTADAS, exclude them (except for locaciones)
      if (char.category !== "locaciones" && generatedPortadas.length === 0) {
        return null;
      }

      const mainPortada = images.portada || generatedPortadas[0] || char.image;
      const mainFicha   = images.ficha || generatedFichas[0] || char.image || "";

      return {
        ...char,
        // Override with strict paths from PORTADAS / Fichas
        image:         mainPortada,
        fullBody:      mainPortada || mainFicha,
        portadaImages: generatedPortadas,
        fichaImages:   generatedFichas,
      } as CharacterDetail;
    }
    return null;
  })
  .filter((c): c is CharacterDetail => c !== null);

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
