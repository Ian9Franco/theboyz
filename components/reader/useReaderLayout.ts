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
        // Mode: "read"
        // Always fit the entire page within the viewport to ensure it is never cropped
        const scale = Math.min((containerSize.w * 0.95) / imgSize.w, (containerSize.h * 0.95) / imgSize.h);
        imgWidth = imgSize.w * scale;
        imgHeight = imgSize.h * scale;
        imgLeft = (containerSize.w - imgWidth) / 2;
        imgTop = (containerSize.h - imgHeight) / 2;
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
