import { NextRequest, NextResponse } from "next/server";
import { getDynamicSagas } from "@/lib/serverData";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate editor password
    const editorPassword = request.headers.get("x-editor-password");
    const masterPassword = process.env.PREVIEW_PASSWORD || "hush2026";
    if (editorPassword !== masterPassword) {
      return NextResponse.json({ error: "Unauthorized: Invalid editor password" }, { status: 401 });
    }

    const body = await request.json();
    const { dialogues } = body;

    if (!dialogues) {
      return NextResponse.json({ error: "Missing dialogues data" }, { status: 400 });
    }

    // Find the chapter folder
    const sagas = getDynamicSagas();
    let chapterFolder = "";
    let sagaFolder = "";

    // We search the public/comics directory for folders
    const comicsDir = path.join(process.cwd(), "public", "comics");
    const sagaDirs = fs.readdirSync(comicsDir).filter(f => fs.statSync(path.join(comicsDir, f)).isDirectory());

    for (const sDir of sagaDirs) {
      const sPath = path.join(comicsDir, sDir);
      const chDirs = fs.readdirSync(sPath).filter(f => fs.statSync(path.join(sPath, f)).isDirectory());
      
      // Clean prefix to match ID
      const sClean = sDir.replace(/^\#\d+\s+/, "");
      
      const foundChDir = chDirs.find(cDir => {
        const cClean = cDir.replace(/^\#\d+\s+/, "");
        return cClean === id;
      });

      if (foundChDir) {
        sagaFolder = sDir;
        chapterFolder = foundChDir;
        break;
      }
    }

    if (!chapterFolder || !sagaFolder) {
      return NextResponse.json({ error: "Chapter directory not found" }, { status: 404 });
    }

    const chapterPath = path.join(comicsDir, sagaFolder, chapterFolder);
    const dialoguesFilePath = path.join(chapterPath, "dialogues.json");

    // Clean up dialogues: remove pages that have no dialogues and only default panels
    const cleanedDialogues = JSON.parse(JSON.stringify(dialogues));
    if (cleanedDialogues.pages) {
      for (const [pgKey, pgData] of Object.entries(cleanedDialogues.pages) as any) {
        const panels = pgData.panels || [];
        const hasDialogues = panels.some((p: any) => p.dialogue && p.dialogue.length > 0);
        
        // A page is considered default/unedited if it has exactly 3 panels, no dialogues, and focusY close to defaults
        const isDefault = panels.length === 3 &&
          Math.abs((panels[0].focusY || 0) - 0.15) <= 0.05 &&
          Math.abs((panels[1].focusY || 0) - 0.5) <= 0.1 &&
          Math.abs((panels[2].focusY || 0) - 0.82) <= 0.05;

        if (!hasDialogues && (isDefault || panels.length === 0)) {
          delete cleanedDialogues.pages[pgKey];
        }
      }
    }

    // Format JSON compactly so empty panel arrays don't take up excessive lines on disk
    const rawJson = JSON.stringify(cleanedDialogues, null, 2);
    const compactJson = rawJson.replace(
      /\{\s*"focusY":\s*([0-9.]+),\s*"dialogue":\s*\[\s*\]\s*\}/g,
      '{"focusY": $1, "dialogue": []}'
    );

    // Save dialogues JSON to disk
    fs.writeFileSync(dialoguesFilePath, compactJson, "utf-8");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving dialogues:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
