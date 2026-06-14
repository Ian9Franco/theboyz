const { execSync } = require("child_process");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const siblingRoot = path.join(projectRoot, "..", "the-boyz-comic");

const commitMsg = process.argv[2] || "chore: sync y actualizaciones de diálogos/cómics";

console.log("🚀 Iniciando flujo de publicación unificado...\n");
console.log(`Mensaje de commit: "\x1b[32m${commitMsg}\x1b[0m"\n`);

// ── 1. Optimizar y sincronizar assets en el repo de cómics ──────────────────
console.log("--- 🎨 Preparando Assets (the-boyz-comic) ---");
try {
  console.log("⏳ Corriendo optimización de imágenes (convert)...");
  execSync("npm run convert", { cwd: siblingRoot, stdio: "inherit" });
  
  console.log("⏳ Sincronizando marcadores con el proyecto principal (sync)...");
  execSync("npm run sync", { cwd: siblingRoot, stdio: "inherit" });
} catch (error) {
  console.error("⚠️ Ocurrió un error al procesar/sincronizar los assets. Continuando con git push...");
}
console.log();

// Helper para publicar un repositorio
function publishRepo(name, dir) {
  console.log(`--- 📤 Publicando repo: ${name} ---`);
  try {
    console.log("Staging de archivos...");
    execSync("git add .", { cwd: dir, stdio: "inherit" });

    const status = execSync("git status --porcelain", { cwd: dir }).toString().trim();
    if (!status) {
      console.log(`✅ No hay cambios pendientes en ${name}.\n`);
      return;
    }

    console.log("Creando commit...");
    const escapedMsg = commitMsg.replace(/"/g, '\\"');
    execSync(`git commit -m "${escapedMsg}"`, { cwd: dir, stdio: "inherit" });

    console.log("Haciendo git push...");
    execSync("git push", { cwd: dir, stdio: "inherit" });

    console.log(`🎉 ¡${name} publicado con éxito!\n`);
  } catch (error) {
    console.error(`❌ Error al publicar ${name}:`, error.message);
    console.log();
  }
}

// ── 2. Hacer commit y push de ambos repositorios ──────────────────────────
publishRepo("the-boyz-comic (Assets)", siblingRoot);
publishRepo("the-boys (Main App)", projectRoot);

console.log("🏁 ¡Flujo de publicación unificado completado!");
