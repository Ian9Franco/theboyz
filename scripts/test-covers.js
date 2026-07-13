const fs = require('fs');
const path = require('path');

const comicsDir = path.join(process.cwd(), 'public', 'comics');
console.log("Comics Dir exists:", fs.existsSync(comicsDir));

const folders = fs.readdirSync(comicsDir).filter(f => fs.statSync(path.join(comicsDir, f)).isDirectory());

folders.forEach(folder => {
  if (folder.includes('Distrito Nulo')) {
    const sagaPath = path.join(comicsDir, folder);
    const chFolders = fs.readdirSync(sagaPath).filter(f => fs.statSync(path.join(sagaPath, f)).isDirectory());
    console.log("Saga:", folder);
    chFolders.forEach(chFolder => {
      const chPath = path.join(sagaPath, chFolder);
      const chFiles = fs.readdirSync(chPath);
      const coverFile = chFiles.find(f => f.toLowerCase().startsWith('portada'));
      console.log("  Chapter Folder:", chFolder);
      console.log("    Cover File Found:", coverFile);
      if (coverFile) {
        const chCover = `/comics/${encodeURIComponent(folder)}/${encodeURIComponent(chFolder)}/${encodeURIComponent(coverFile)}`;
        console.log("    Resolved Cover:", chCover);
      }
    });
  }
});
