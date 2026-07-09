import { useMemo } from "react";
import { PanelStop } from "./audioPlayer";

interface UseReaderLayoutProps {
  imgSize: { w: number; h: number } | null;
  containerSize: { w: number; h: number };
  mode: "read" | "edit";
  activeZoomRect: { x: number; y: number; w: number; h: number } | null;
  zoomedOut: boolean;
  zoomScale: number;
  activePanel: PanelStop;
  activeReadingBubbleIdx: number;
  focusPanel?: boolean;
  focusDialogue?: boolean;
}

export function useReaderLayout({
  imgSize,
  containerSize,
  mode,
  activeZoomRect,
  zoomedOut,
  zoomScale,
  activePanel,
  activeReadingBubbleIdx,
  focusPanel = true,
  focusDialogue = true,
}: UseReaderLayoutProps) {
  return useMemo(() => {
    let imgWidth = 0;
    let imgLeft = 0;
    let imgTop = 0;
    let imgHeight = 0;

    if (imgSize && containerSize.w > 0 && containerSize.h > 0) {
      const isMobile = containerSize.w < 768;

      if (mode === "edit") {
        const scale = Math.min((containerSize.w * 0.9) / imgSize.w, (containerSize.h * 0.85) / imgSize.h);
        imgWidth = imgSize.w * scale;
        imgLeft = (containerSize.w - imgWidth) / 2;
        imgTop = (containerSize.h - imgSize.h * scale) / 2;
        imgHeight = imgSize.h * scale;
      } else {
        // Mode: "read"
        const activeBubble = activePanel?.dialogue?.[activeReadingBubbleIdx];
        const pageFitScale = Math.min((containerSize.w * 0.95) / imgSize.w, (containerSize.h * 0.95) / imgSize.h);

        if (focusDialogue && activeBubble && !zoomedOut) {
          // Focus camera on the active dialogue bubble
          let fitScale = isMobile ? pageFitScale * 1.08 : 1.25;
          let fx = 0.5;
          let fy = 0.5;

          const bx = (activeBubble.posX ?? 50) / 100;
          const by = (activeBubble.posY ?? ((activePanel.focusY ?? 0.5) * 100)) / 100;

          if (focusPanel && activeZoomRect) {
            const rx = activeZoomRect.x / 100;
            const ry = activeZoomRect.y / 100;
            const rw = activeZoomRect.w / 100;
            const rh = activeZoomRect.h / 100;
            const cropW = imgSize.w * rw;
            const cropH = imgSize.h * rh;
            const scaleX = (containerSize.w * 0.9) / cropW;
            const scaleY = (containerSize.h * 0.9) / cropH;
            const panelFocusMultiplier = isMobile ? 0.5 : 0.75;
            const panelFocusMax = isMobile ? pageFitScale * 1.22 : 2.0;
            const panelFocusMin = isMobile ? pageFitScale : 1.1;
            
            // Mobile needs extra surrounding context; desktop can crop closer.
            fitScale = Math.max(panelFocusMin, Math.min(panelFocusMax, Math.min(scaleX, scaleY) * panelFocusMultiplier));

            // Interpolate panel center and bubble position to keep panel context and other dialogues visible
            const cropCenterX = rx + rw / 2;
            const cropCenterY = ry + rh / 2;
            const panelWeight = isMobile ? 0.55 : 0.7;
            fx = cropCenterX * panelWeight + bx * (1 - panelWeight);
            fy = cropCenterY * panelWeight + by * (1 - panelWeight);
          } else {
            // No panel focus: nudge camera slightly from page center towards active bubble
            fx = 0.5 * 0.6 + bx * 0.4;
            fy = 0.5 * 0.6 + by * 0.4;
          }

          imgWidth = imgSize.w * fitScale;
          imgHeight = imgSize.h * fitScale;
          imgLeft = containerSize.w / 2 - fx * imgWidth;
          imgTop = containerSize.h / 2 - fy * imgHeight;
        } else if (focusPanel && activeZoomRect && !zoomedOut) {
          const rx = activeZoomRect.x / 100;
          const ry = activeZoomRect.y / 100;
          const rw = activeZoomRect.w / 100;
          const rh = activeZoomRect.h / 100;

          const cropW = imgSize.w * rw;
          const cropH = imgSize.h * rh;

          const scaleX = (containerSize.w * 0.9) / cropW;
          const scaleY = (containerSize.h * 0.9) / cropH;
          const panelFocusMultiplier = isMobile ? 0.58 : 0.85;
          const panelFocusMax = isMobile ? pageFitScale * 1.32 : 2.2;
          const panelFocusMin = isMobile ? pageFitScale : 1;
          
          // Milder standard panel focus on mobile so the crop does not feel like a jump cut.
          const fitScale = Math.max(panelFocusMin, Math.min(panelFocusMax, Math.min(scaleX, scaleY) * panelFocusMultiplier));

          imgWidth = imgSize.w * fitScale;
          imgHeight = imgSize.h * fitScale;

          const cropCenterX = imgSize.w * (rx + rw / 2);
          const cropCenterY = imgSize.h * (ry + rh / 2);

          imgLeft = containerSize.w / 2 - cropCenterX * fitScale;
          imgTop = containerSize.h / 2 - cropCenterY * fitScale;
        } else {
          // Always fit the entire page within the viewport to ensure it is never cropped
          imgWidth = imgSize.w * pageFitScale;
          imgHeight = imgSize.h * pageFitScale;
          imgLeft = (containerSize.w - imgWidth) / 2;
          imgTop = (containerSize.h - imgHeight) / 2;
        }
      }
    }

    return { imgWidth, imgLeft, imgTop, imgHeight };
  }, [
    imgSize,
    containerSize.w,
    containerSize.h,
    mode,
    activeZoomRect,
    zoomedOut,
    zoomScale,
    activePanel,
    activeReadingBubbleIdx,
    focusPanel,
    focusDialogue,
  ]);
}
