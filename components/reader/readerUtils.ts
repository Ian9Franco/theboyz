import type { DialogueLine } from "./DialogueBubble";

/**
 * Compute the path on the edge of the bubble (estimated as an ellipse/rect)
 * in the direction of the anchor target. Returns SVG path description string.
 */
export function buildTailPath(
  bubbleCenterX: number,
  bubbleCenterY: number,
  targetX: number,
  targetY: number,
  line?: DialogueLine
): string | null {
  const dx = targetX - bubbleCenterX;
  const dy = targetY - bubbleCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < 8) return null;

  const angle = Math.atan2(dy, dx);
  const perpAngle = angle + Math.PI / 2;
  // Tail base width at center — scales down with distance for an organic look unless specified
  const baseWidth = line?.tailWidth ?? Math.max(8, 28 - distance * 0.03);

  const bLX = bubbleCenterX + Math.cos(perpAngle) * (baseWidth / 2);
  const bLY = bubbleCenterY + Math.sin(perpAngle) * (baseWidth / 2);
  const bRX = bubbleCenterX - Math.cos(perpAngle) * (baseWidth / 2);
  const bRY = bubbleCenterY - Math.sin(perpAngle) * (baseWidth / 2);

  // Quadratic control point halfway, offset by curvature
  const curvature = line?.tailCurvature ?? 0;
  const cx = bubbleCenterX + dx * 0.5 + Math.cos(perpAngle) * curvature;
  const cy = bubbleCenterY + dy * 0.5 + Math.sin(perpAngle) * curvature;

  // Open path to prevent stroke from closing the bubble outline
  return `M ${bLX} ${bLY} Q ${cx} ${cy} ${targetX} ${targetY} Q ${cx} ${cy} ${bRX} ${bRY}`;
}

/**
 * Estimate bubble half-dimensions from width/fontSize settings (approximate)
 */
export function estimateBubbleSize(line: DialogueLine): { halfW: number; halfH: number } {
  const w = line.width ?? 200;
  // Height is roughly proportional to text length and font size
  const fontSize = line.fontSize ?? 14;
  const charPerLine = Math.max(1, w / (fontSize * 0.55));
  const lines = Math.ceil((line.text?.length ?? 20) / charPerLine) + (line.speaker ? 1 : 0);
  const h = lines * (fontSize * 1.5) + 16; // +padding
  return { halfW: w / 2, halfH: h / 2 };
}

/**
 * Find if a point is inside another dialogue bubble on the page
 */
export function findTargetBubble(
  tx: number, // Target X in percentage (0-100)
  ty: number, // Target Y in percentage (0-100)
  dialogues: DialogueLine[],
  sourceIdx: number,
  imgWidth: number,
  imgHeight: number,
  imgLeft: number,
  imgTop: number
): { index: number; line: DialogueLine } | null {
  if (!imgWidth || !imgHeight) return null;
  const txPx = imgLeft + (tx / 100) * imgWidth;
  const tyPx = imgTop + (ty / 100) * imgHeight;

  for (let i = 0; i < dialogues.length; i++) {
    if (i === sourceIdx) continue;
    const line = dialogues[i];
    const cx = line.posX ?? 50;
    const cy = line.posY ?? 50;
    const size = estimateBubbleSize(line);

    const cxPx = imgLeft + (cx / 100) * imgWidth;
    const cyPx = imgTop + (cy / 100) * imgHeight;

    const dx = txPx - cxPx;
    const dy = tyPx - cyPx;

    // Ellipse test: (dx / radiusX)^2 + (dy / radiusY)^2 <= 1
    // 10% safety margin for target drop accuracy
    const radiusX = size.halfW * 1.1;
    const radiusY = size.halfH * 1.1;

    if ((dx / radiusX) ** 2 + (dy / radiusY) ** 2 <= 1) {
      return { index: i, line };
    }
  }
  return null;
}

/**
 * Synchronized delay groups calculation based on anchor collisions
 */
export function getEffectiveIndexes(
  dialogue: DialogueLine[],
  imgWidth: number,
  imgHeight: number,
  imgLeft: number,
  imgTop: number
): number[] {
  const n = dialogue.length;
  if (n === 0) return [];

  const adj: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    const line = dialogue[i];
    if (line.tailX !== undefined && line.tailY !== undefined) {
      const target = findTargetBubble(line.tailX, line.tailY, dialogue, i, imgWidth, imgHeight, imgLeft, imgTop);
      if (target) {
        adj[i].push(target.index);
        adj[target.index].push(i);
      }
    }
  }

  const visited = new Set<number>();
  const components: number[][] = [];

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      const component: number[] = [];
      const queue = [i];
      visited.add(i);
      while (queue.length > 0) {
        const u = queue.shift()!;
        component.push(u);
        for (const v of adj[u]) {
          if (!visited.has(v)) {
            visited.add(v);
            queue.push(v);
          }
        }
      }
      component.sort((a, b) => a - b);
      components.push(component);
    }
  }

  components.sort((a, b) => a[0] - b[0]);

  const effectiveIdx = new Array(n).fill(0);
  for (let compIdx = 0; compIdx < components.length; compIdx++) {
    for (const u of components[compIdx]) {
      effectiveIdx[u] = compIdx;
    }
  }

  return effectiveIdx;
}

/**
 * Devuelve la URL absoluta de una imagen del cómic.
 * Si NEXT_PUBLIC_ASSETS_BASE_URL está configurado, la cargará del CDN externo.
 * De lo contrario, usará la ruta local relativa en /public.
 */
export function getComicPageUrl(relativePath: string | null | undefined): string {
  if (!relativePath) return "";
  const baseUrl = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "";
  if (baseUrl) {
    if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
      return relativePath;
    }
    const cleanPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
    return `${baseUrl}${cleanPath}`;
  }
  return relativePath;
}

/**
 * Extrae la clave de página a partir de la URL (ej. "/comics/saga/chapter/12.webp" -> "12")
 */
export function getPageKeyFromUrl(url: string | undefined): string {
  if (!url) return "1";
  const parts = url.split('/');
  const filename = parts[parts.length - 1]; // "12.webp"
  const basename = filename.split('.')[0];  // "12"
  return basename;
}
