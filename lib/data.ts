export type Chapter = {
  id: string;
  title: string;
  number: number;
  coverColor: string; // Tailwind gradient class
  accentColor: string; // for UI accents
};

export type Saga = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  color: string; // primary saga color hex
  chapters: Chapter[];
};

export const sagas: Saga[] = [
  {
    id: "green-truck",
    title: "Green Truck",
    tagline: "La saga con la que arrancó todo.",
    description: "Polvo, secretos y un misterioso camión verde. Seguí los eventos que cambiaron todo, chabón.",
    color: "#21a34b",
    chapters: [
      {
        id: "the-green-truck-chronicles",
        title: "The Green Truck Chronicles",
        number: 1,
        coverColor: "from-[#1a5c30] via-[#21a34b] to-[#85d996]",
        accentColor: "#21a34b",
      },
      {
        id: "sleeping-with-the-fishes",
        title: "Sleeping with the Fishes",
        number: 2,
        coverColor: "from-[#0d2b5e] via-[#1a4fa8] to-[#4d9fd6]",
        accentColor: "#2b7ce3",
      },
      {
        id: "no-turning-back",
        title: "No Turning Back",
        number: 3,
        coverColor: "from-[#5c0d0d] via-[#a32121] to-[#e05555]",
        accentColor: "#e32b2b",
      },
    ],
  },
  {
    id: "mativerse",
    title: "Mativerse",
    tagline: "Una nueva realidad se asoma.",
    description: "La realidad se quiebra. Todo lo que sabías está a punto de cambiar para siempre. Preparate, boludo.",
    color: "#7c3aed",
    chapters: [
      {
        id: "mativerse-chapter-one",
        title: "Chapter One",
        number: 1,
        coverColor: "from-[#2d0a6e] via-[#7c3aed] to-[#c084fc]",
        accentColor: "#7c3aed",
      },
    ],
  },
];

// Helper to find a chapter and its saga by chapter id
export function findChapter(chapterId: string): { chapter: Chapter; saga: Saga; chapterIndex: number } | null {
  for (const saga of sagas) {
    const index = saga.chapters.findIndex((c) => c.id === chapterId);
    if (index !== -1) {
      return { chapter: saga.chapters[index], saga, chapterIndex: index };
    }
  }
  return null;
}
