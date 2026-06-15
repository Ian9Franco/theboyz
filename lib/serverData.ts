import fs from "fs";
import path from "path";

export type Chapter = {
  id: string;
  title: string;
  number: number;
  coverColor?: string;
  accentColor?: string;
  status?: string;
  draft?: boolean;
  cinematic?: boolean;
  cover?: string | null;
};

export type Saga = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  chapters: Chapter[];
  order: number;
  status?: string;
  draft?: boolean;
  password?: string;
  cinematic?: boolean;
  cover?: string | null;
  nuevo?: boolean;
  proximamente?: boolean;
};

const POP_ART_COLORS = ["#1b4332", "#00b8d4", "#f5e642", "#6d28d9", "#f97316", "#16a34a"];
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export function titleCase(str: string): string {
  return str
    .split(/[-_ ]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Parse prefix like "#1 title", "01-title", "1_title" or "2. title"
export function parsePrefix(name: string): { order: number | null; cleanName: string } {
  const match = name.match(/^(?:#)?(\d+)[-_. ]+(.*)$/);
  if (match) {
    return {
      order: parseInt(match[1], 10),
      cleanName: match[2],
    };
  }
  return { order: null, cleanName: name };
}

export function getDynamicSagas(): Saga[] {
  const comicsDir = path.join(process.cwd(), "public", "comics");

  if (!fs.existsSync(comicsDir)) {
    return [];
  }

  const sagaFolders = fs.readdirSync(comicsDir).filter((file) => {
    return fs.statSync(path.join(comicsDir, file)).isDirectory();
  });

  const sagas: Saga[] = [];

  sagaFolders.forEach((folder, idx) => {
    const sagaPath = path.join(comicsDir, folder);
    const { order: folderOrder, cleanName } = parsePrefix(folder);

    // Default metadata
    let title = titleCase(cleanName);
    let tagline = "Una saga de cómics original.";
    let description = "Una historia picante donde los pibes se mandan una tras otra.";
    
    if (cleanName === "green-truck") {
      description = "La aventura arranca acá. Acompañá a los pibes en este primer arco donde se va todo al pasto.";
    } else if (cleanName === "mativerse") {
      description = "El caos total. Preparate porque acá se rompen las reglas y saltamos a dimensiones re flasheras.";
    }
    let color = POP_ART_COLORS[idx % POP_ART_COLORS.length];
    let order = folderOrder !== null ? folderOrder : idx + 1;
    let sagaStatus = "published";
    let sagaPassword = undefined;
    let sagaCinematic = false;
    let sagaCover: string | null = null;
    let sagaNuevo = false;
    let sagaProximamente = false;

    // Load saga.json if exists
    const jsonPath = path.join(sagaPath, "saga.json");
    if (fs.existsSync(jsonPath)) {
      try {
        const meta = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        if (meta.title) title = meta.title;
        if (meta.tagline) tagline = meta.tagline;
        if (meta.description) description = meta.description;
        if (meta.color) color = meta.color;
        if (meta.order !== undefined) order = meta.order;
        if (meta.status) sagaStatus = meta.status;
        if (meta.password) sagaPassword = meta.password;
        if (meta.cinematic) sagaCinematic = true;
        if (meta.nuevo !== undefined) sagaNuevo = !!meta.nuevo;
        if (meta.proximamente !== undefined) sagaProximamente = !!meta.proximamente;
      } catch (err) {
        console.error(`Error parsing saga.json in ${folder}:`, err);
      }
    }

    // Scan sagaPath for a cover image named "portada"
    if (fs.existsSync(sagaPath)) {
      const files = fs.readdirSync(sagaPath);
      const coverFile = files.find((f) => {
        const ext = path.extname(f).toLowerCase();
        if (!SUPPORTED_FORMATS.includes(ext)) return false;
        return path.basename(f, ext).toLowerCase() === "portada";
      });
      if (coverFile) {
        sagaCover = `/comics/${encodeURIComponent(folder)}/${encodeURIComponent(coverFile)}`;
      }
    }

    // Scan chapters in this saga
    const chapterFolders = fs.readdirSync(sagaPath).filter((file) => {
      return fs.statSync(path.join(sagaPath, file)).isDirectory();
    });

    const chapters: Chapter[] = [];

    chapterFolders.forEach((chFolder, chIdx) => {
      const chPath = path.join(sagaPath, chFolder);
      const { order: chOrder, cleanName: chCleanName } = parsePrefix(chFolder);

      // Default chapter metadata
      let chTitle = titleCase(chCleanName);
      let chNumber = chOrder !== null ? chOrder : chIdx + 1;
      let chStatus = "published";
      let chCinematic = false;

      // Load chapter.json if exists
      const chJsonPath = path.join(chPath, "chapter.json");
      if (fs.existsSync(chJsonPath)) {
        try {
          const chMeta = JSON.parse(fs.readFileSync(chJsonPath, "utf-8"));
          if (chMeta.title) chTitle = chMeta.title;
          if (chMeta.number !== undefined) chNumber = chMeta.number;
          if (chMeta.status) chStatus = chMeta.status;
          if (chMeta.cinematic) chCinematic = true;
        } catch (err) {
          console.error(`Error parsing chapter.json in ${folder}/${chFolder}:`, err);
        }
      }

      // Scan chPath for a cover image named "portada"
      let chCover: string | null = null;
      if (fs.existsSync(chPath)) {
        const chFiles = fs.readdirSync(chPath);
        const coverFile = chFiles.find((f) => {
          const ext = path.extname(f).toLowerCase();
          if (!SUPPORTED_FORMATS.includes(ext)) return false;
          return path.basename(f, ext).toLowerCase() === "portada";
        });
        if (coverFile) {
          chCover = `/comics/${encodeURIComponent(folder)}/${encodeURIComponent(chFolder)}/${encodeURIComponent(coverFile)}`;
        }
      }

      chapters.push({
        id: chCleanName, // Use cleaned name as the route id
        title: chTitle,
        number: chNumber,
        coverColor: `from-[#0a0a0f] to-[#e8185a]`,
        accentColor: color,
        status: chStatus,
        draft: chStatus === "draft" || sagaStatus === "draft",
        cinematic: chCinematic || sagaCinematic,
        cover: chCover,
      });
    });

    // Sort chapters by number
    chapters.sort((a, b) => a.number - b.number);

    sagas.push({
      id: cleanName, // Use cleaned name as the route id
      title,
      tagline,
      description,
      color,
      chapters,
      order,
      status: sagaStatus,
      draft: sagaStatus === "draft",
      password: sagaPassword,
      cinematic: sagaCinematic,
      cover: sagaCover,
      nuevo: sagaNuevo,
      proximamente: sagaProximamente,
    });
  });

  // Sort sagas by order
  sagas.sort((a, b) => a.order - b.order);

  // Deduplicate sagas by id, keeping the first one in sorted order
  const uniqueSagas: Saga[] = [];
  const seenIds = new Set<string>();
  for (const saga of sagas) {
    if (!seenIds.has(saga.id)) {
      seenIds.add(saga.id);
      uniqueSagas.push(saga);
    }
  }

  return uniqueSagas;
}

export function findDynamicChapter(chapterId: string): { chapter: Chapter; saga: Saga; chapterIndex: number } | null {
  const sagas = getDynamicSagas();
  for (const saga of sagas) {
    const index = saga.chapters.findIndex((c) => c.id === chapterId);
    if (index !== -1) {
      return { chapter: saga.chapters[index], saga, chapterIndex: index };
    }
  }
  return null;
}

import { NextRequest } from "next/server";

export function validatePreviewAccess(request: NextRequest, sagaId?: string): boolean {
  const cookiePass = request.cookies.get("preview_password")?.value;
  const headerPass = request.headers.get("x-preview-password");
  const urlPass = request.nextUrl.searchParams.get("password") || request.nextUrl.searchParams.get("preview_password");

  const providedPassword = cookiePass || headerPass || urlPass;

  if (!providedPassword) {
    return false;
  }

  const masterPassword = process.env.PREVIEW_PASSWORD || "hush2026";
  if (providedPassword === masterPassword) {
    return true;
  }

  if (sagaId) {
    const sagas = getDynamicSagas();
    const targetSaga = sagas.find((s) => s.id === sagaId);
    if (targetSaga && targetSaga.password && providedPassword === targetSaga.password) {
      return true;
    }
  } else {
    const sagas = getDynamicSagas();
    for (const saga of sagas) {
      if (saga.password && providedPassword === saga.password) {
        return true;
      }
    }
  }

  return false;
}
