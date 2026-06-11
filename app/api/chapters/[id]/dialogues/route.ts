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

    // Save dialogues JSON to disk
    fs.writeFileSync(dialoguesFilePath, JSON.stringify(dialogues, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving dialogues:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
