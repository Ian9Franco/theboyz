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
        const zoom = activeZoomRect;
        let baseImgLeft = 0;
        let baseImgTop = 0;

        if (zoom && !zoomedOut) {
          const zX = zoom.x / 100;
          const zY = zoom.y / 100;
          const zW = zoom.w / 100;
          const zH = zoom.h / 100;

          const cropW = zW * imgSize.w;
          const cropH = zH * imgSize.h;

          const scale = Math.min((containerSize.w * 0.95) / cropW, (containerSize.h * 0.95) / cropH);

          imgWidth = imgSize.w * scale;
          imgHeight = imgSize.h * scale;

          const cropCenterX = (zX + zW / 2) * imgSize.w * scale;
          const cropCenterY = (zY + zH / 2) * imgSize.h * scale;

          baseImgLeft = containerSize.w / 2 - cropCenterX;
          baseImgTop = containerSize.h / 2 - cropCenterY;
        } else {
          const scale = Math.min((containerSize.w * 0.92) / imgSize.w, (containerSize.h * 0.92) / imgSize.h);
          imgWidth = imgSize.w * scale;
          imgHeight = imgSize.h * scale;
          baseImgLeft = (containerSize.w - imgWidth) / 2;
          baseImgTop = (containerSize.h - imgHeight) / 2;
        }

        if (zoomScale === 1 && !zoomedOut && activePanel) {
          const activeBubble = activePanel.dialogue?.[activeReadingBubbleIdx];
          if (activeBubble) {
            const posX = activeBubble.posX ?? 50;
            const posY = activeBubble.posY ?? (activePanel.focusY ?? 0.5) * 100;

            const bImgX = (posX / 100) * imgWidth;
            const bImgY = (posY / 100) * imgHeight;

            const bViewportX = baseImgLeft + bImgX;
            const bViewportY = baseImgTop + bImgY;

            const vCenterX = containerSize.w / 2;
            const vCenterY = containerSize.h / 2;

            const diffX = bViewportX - vCenterX;
            const diffY = bViewportY - vCenterY;

            const shiftFraction = 0.25;
            let autoPanX = -diffX * shiftFraction;
            let autoPanY = -diffY * shiftFraction;

            const maxAutoPanX = containerSize.w * 0.15;
            const maxAutoPanY = containerSize.h * 0.15;
            autoPanX = Math.max(-maxAutoPanX, Math.min(maxAutoPanX, autoPanX));
            autoPanY = Math.max(-maxAutoPanY, Math.min(maxAutoPanY, autoPanY));

            imgLeft = baseImgLeft + autoPanX;
            imgTop = baseImgTop + autoPanY;
          } else {
            imgLeft = baseImgLeft;
            imgTop = baseImgTop;
          }
        } else {
          imgLeft = baseImgLeft;
          imgTop = baseImgTop;
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
  ]);
}
