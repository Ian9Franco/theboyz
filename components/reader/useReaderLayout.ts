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
      if (mode === "edit") {
        const scale = Math.min((containerSize.w * 0.9) / imgSize.w, (containerSize.h * 0.85) / imgSize.h);
        imgWidth = imgSize.w * scale;
        imgLeft = (containerSize.w - imgWidth) / 2;
        imgTop = (containerSize.h - imgSize.h * scale) / 2;
        imgHeight = imgSize.h * scale;
      } else {
        // Mode: "read"
        const activeBubble = activePanel?.dialogue?.[activeReadingBubbleIdx];

        if (focusDialogue && activeBubble && !zoomedOut) {
          // Focus camera on the active dialogue bubble
          let fitScale = 1.25; // default mild zoom when focusPanel is off
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
            
            // Milder panel scale: cap at 2.0 and multiply by 0.75
            fitScale = Math.max(1.1, Math.min(2.0, Math.min(scaleX, scaleY) * 0.75));

            // Interpolate panel center and bubble position to keep panel context and other dialogues visible
            const cropCenterX = rx + rw / 2;
            const cropCenterY = ry + rh / 2;
            fx = cropCenterX * 0.7 + bx * 0.3;
            fy = cropCenterY * 0.7 + by * 0.3;
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
          
          // Milder standard panel focus: cap at 2.2 instead of 3.5, and scale by 0.85
          const fitScale = Math.max(1, Math.min(2.2, Math.min(scaleX, scaleY) * 0.85));

          imgWidth = imgSize.w * fitScale;
          imgHeight = imgSize.h * fitScale;

          const cropCenterX = imgSize.w * (rx + rw / 2);
          const cropCenterY = imgSize.h * (ry + rh / 2);

          imgLeft = containerSize.w / 2 - cropCenterX * fitScale;
          imgTop = containerSize.h / 2 - cropCenterY * fitScale;
        } else {
          // Always fit the entire page within the viewport to ensure it is never cropped
          const scale = Math.min((containerSize.w * 0.95) / imgSize.w, (containerSize.h * 0.95) / imgSize.h);
          imgWidth = imgSize.w * scale;
          imgHeight = imgSize.h * scale;
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
