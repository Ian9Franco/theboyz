const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..", "..");
const comicsDir = path.join(projectRoot, "public", "comics");

const mapping = {
  "green-truck": {
    "the-green-truck-chronicles": { date: "13/06/2026", estimatedTime: "5 horas" },
    "special-chapter-the-mysterious-contact": { date: "13/06/2026", estimatedTime: "3 horas" },
    "sleeping-with-the-fishes": { date: "13/06/2026", estimatedTime: "4 horas" },
    "no-turning-back": { date: "13/06/2026", estimatedTime: "4 horas" }
  },
  "mativerse-part-1": {
    "the-first-incursion": { date: "13/06/2026", estimatedTime: "6 horas" },
    "casino": { date: "13/06/2026", estimatedTime: "5 horas" },
    "worlds": { date: "13/06/2026", estimatedTime: "6 horas" }
  },
  "el-silencio-del-dragon": {
    "un-lugar": { date: "15/06/2026", estimatedTime: "5 días" },
    "kenji": { date: "15/06/2026", estimatedTime: "5 días" }
  },
  "distrito-nulo": {
    "despertar": { date: "20/06/2026", estimatedTime: "5 días" }
  },
  "distrito-nulo-parte-2-los-pecados": {
    "pecados-de-brooklyn-la-mentira": { date: "04/07/2026", estimatedTime: "11 días" }
  },
  "distrito-nulo-parte-3-la-caceria": {
    "la-caceria": { date: "23/06/2026", estimatedTime: "19 días" }
  },
  "primer-vuelo": {
    "dos-anos-despues": { date: "26/07/2026", estimatedTime: "27 días" }
  }
};

const sagaMapping = {
  "distrito-nulo-parte-3-la-caceria": { date: "23/06/2026", estimatedTime: "19 días" },
  "primer-vuelo": { date: "26/07/2026", estimatedTime: "27 días" }
};

function cleanName(name) {
  const match = name.match(/^(?:#)?(\d+)[-_. ]+(.*)$/);
  const base = match ? match[2] : name;
  return base.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
}

console.log("Updating saga.json and chapter.json files with launch/development dates...");

if (fs.existsSync(comicsDir)) {
  const sagaFolders = fs.readdirSync(comicsDir).filter(f => fs.statSync(path.join(comicsDir, f)).isDirectory());
  sagaFolders.forEach(sagaFolder => {
    const sagaPath = path.join(comicsDir, sagaFolder);
    const sagaId = cleanName(sagaFolder);
    
    // Update saga.json if exists and has mapping
    const sagaJsonPath = path.join(sagaPath, "saga.json");
    if (fs.existsSync(sagaJsonPath)) {
      const mappedSagaMeta = sagaMapping[sagaId];
      if (mappedSagaMeta) {
        try {
          const data = JSON.parse(fs.readFileSync(sagaJsonPath, "utf-8"));
          data.date = mappedSagaMeta.date;
          data.estimatedTime = mappedSagaMeta.estimatedTime;
          fs.writeFileSync(sagaJsonPath, JSON.stringify(data, null, 2), "utf-8");
          console.log(`  Updated saga.json for ${sagaFolder}: ${mappedSagaMeta.date} | ${mappedSagaMeta.estimatedTime}`);
        } catch (e) {
          console.error(`Error updating saga.json for ${sagaFolder}:`, e.message);
        }
      }
    }

    const mappedSaga = mapping[sagaId];
    if (!mappedSaga) {
      return;
    }

    const chFolders = fs.readdirSync(sagaPath).filter(f => fs.statSync(path.join(sagaPath, f)).isDirectory());
    chFolders.forEach(chFolder => {
      const chPath = path.join(sagaPath, chFolder);
      const chId = cleanName(chFolder);
      const mappedCh = mappedSaga[chId];
      if (!mappedCh) {
        console.log(`  No mapping found for chapter ${chFolder} (id: ${chId}) under saga ${sagaFolder}`);
        return;
      }

      const jsonPath = path.join(chPath, "chapter.json");
      let data = {};
      if (fs.existsSync(jsonPath)) {
        try {
          data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        } catch (e) {
          console.error(`Error reading ${jsonPath}:`, e.message);
        }
      }
      data.date = mappedCh.date;
      data.estimatedTime = mappedCh.estimatedTime;

      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
      console.log(`  Updated ${path.relative(projectRoot, jsonPath)}: ${mappedCh.date} | ${mappedCh.estimatedTime}`);
    });
  });
}
console.log("Done!");
