"use client";

import React, { useState, useRef } from "react";

interface UseReaderZoomProps {
  containerSize: { w: number; h: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * useReaderZoom Hook
 * Encapsulates pan, zoom, wheel zoom, double-tap zoom, pinch-to-zoom,
 * and bubble dragging offset controls for the CinematicReader.
 */
export function useReaderZoom({ containerSize, containerRef }: UseReaderZoomProps) {
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [bubbleOffsets, setBubbleOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [draggedBubbleKey, setDraggedBubbleKey] = useState<string | null>(null);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragBubbleStartRef = useRef({ x: 0, y: 0 });
  const dragBubbleOffsetStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const totalDragDistRef = useRef(0);
  const initialPinchDistRef = useRef<number | null>(null);
  const initialPinchScaleRef = useRef<number>(1);
  const lastTapRef = useRef<number>(0);

  const handlePanStart = (clientX: number, clientY: number) => {
    setIsPanning(true);
    dragStartRef.current = { x: clientX, y: clientY };
    panStartRef.current = { ...panOffset };
    totalDragDistRef.current = 0;
  };

  const handlePanMove = (clientX: number, clientY: number) => {
    if (!isPanning) return;
    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;
    totalDragDistRef.current = Math.sqrt(dx * dx + dy * dy);

    const horizontalPadding = Math.max(120, containerSize.w * 0.35);
    const verticalPadding = Math.max(120, containerSize.h * 0.35);
    const maxPanX = Math.max(0, (containerSize.w * zoomScale - containerSize.w) / 2) + horizontalPadding;
    const maxPanY = Math.max(0, (containerSize.h * zoomScale - containerSize.h) / 2) + verticalPadding;

    const targetX = Math.max(-maxPanX, Math.min(maxPanX, panStartRef.current.x + dx));
    const targetY = Math.max(-maxPanY, Math.min(maxPanY, panStartRef.current.y + dy));

    setPanOffset({ x: targetX, y: targetY });
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      if (
        (e.target as HTMLElement).closest(".zoom-controls") ||
        (e.target as HTMLElement).closest(".btn") ||
        (e.target as HTMLElement).closest(".tag") ||
        (e.target as HTMLElement).closest(".cursor-grab") ||
        (e.target as HTMLElement).closest(".cursor-grabbing")
      ) {
        return;
      }
      handlePanStart(e.clientX, e.clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePanMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handlePanEnd();
  };

  const toggleZoomAtPoint = (clientX: number, clientY: number) => {
    if (zoomScale > 1) {
      setZoomScale(1);
      setPanOffset({ x: 0, y: 0 });
    } else {
      const targetScale = 2.5;
      setZoomScale(targetScale);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const targetX = (centerX - clickX) * 1.5;
        const targetY = (centerY - clickY) * 1.5;

        const horizontalPadding = Math.max(120, rect.width * 0.35);
        const verticalPadding = Math.max(120, rect.height * 0.35);
        const maxPanX = Math.max(0, (rect.width * targetScale - rect.width) / 2) + horizontalPadding;
        const maxPanY = Math.max(0, (rect.height * targetScale - rect.height) / 2) + verticalPadding;

        setPanOffset({
          x: Math.max(-maxPanX, Math.min(maxPanX, targetX)),
          y: Math.max(-maxPanY, Math.min(maxPanY, targetY)),
        });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (
      (e.target as HTMLElement).closest(".zoom-controls") ||
      (e.target as HTMLElement).closest(".btn") ||
      (e.target as HTMLElement).closest(".tag") ||
      (e.target as HTMLElement).closest(".cursor-grab") ||
      (e.target as HTMLElement).closest(".cursor-grabbing")
    ) {
      return;
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const now = Date.now();

      if (now - lastTapRef.current < 250) {
        e.preventDefault();
        toggleZoomAtPoint(touch.clientX, touch.clientY);
        lastTapRef.current = 0;
        setIsPanning(false);
        return;
      }

      lastTapRef.current = now;
      handlePanStart(touch.clientX, touch.clientY);
    } else if (e.touches.length === 2) {
      setIsPanning(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDistRef.current = dist;
      initialPinchScaleRef.current = zoomScale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isPanning) {
      const touch = e.touches[0];
      handlePanMove(touch.clientX, touch.clientY);
    } else if (e.touches.length === 2 && initialPinchDistRef.current !== null) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / initialPinchDistRef.current;
      const newScale = Math.max(1, Math.min(4, initialPinchScaleRef.current * ratio));
      setZoomScale(newScale);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      handlePanEnd();
      initialPinchDistRef.current = null;
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      handlePanStart(touch.clientX, touch.clientY);
      initialPinchDistRef.current = null;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (
      (e.target as HTMLElement).closest(".zoom-controls") ||
      (e.target as HTMLElement).closest(".btn") ||
      (e.target as HTMLElement).closest(".tag")
    ) {
      return;
    }

    const zoomFactor = 0.12;
    const delta = -e.deltaY;
    const factor = delta > 0 ? 1 + zoomFactor : 1 - zoomFactor;
    const newScale = Math.max(1, Math.min(4, zoomScale * factor));

    setZoomScale(newScale);

    if (newScale <= 1.01) {
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(".zoom-controls") ||
      (e.target as HTMLElement).closest(".btn") ||
      (e.target as HTMLElement).closest(".tag")
    ) {
      return;
    }
    e.stopPropagation();
    toggleZoomAtPoint(e.clientX, e.clientY);
  };

  const handleBubblePointerDown = (e: React.PointerEvent, key: string) => {
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {
      console.warn("setPointerCapture not supported or failed", err);
    }
    setDraggedBubbleKey(key);
    dragBubbleStartRef.current = { x: e.clientX, y: e.clientY };
    dragBubbleOffsetStartRef.current = bubbleOffsets[key] || { x: 0, y: 0 };
  };

  const handleBubblePointerMove = (e: React.PointerEvent, key: string) => {
    if (draggedBubbleKey !== key) return;
    e.stopPropagation();
    const dx = e.clientX - dragBubbleStartRef.current.x;
    const dy = e.clientY - dragBubbleStartRef.current.y;

    setBubbleOffsets((prev) => ({
      ...prev,
      [key]: {
        x: dragBubbleOffsetStartRef.current.x + dx,
        y: dragBubbleOffsetStartRef.current.y + dy,
      },
    }));
  };

  const handleBubblePointerUp = (e: React.PointerEvent, key: string) => {
    if (draggedBubbleKey === key) {
      e.stopPropagation();
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
      setDraggedBubbleKey(null);
    }
  };

  return {
    zoomScale,
    setZoomScale,
    panOffset,
    setPanOffset,
    isPanning,
    bubbleOffsets,
    setBubbleOffsets,
    draggedBubbleKey,
    totalDragDistRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
    handleDoubleClick,
    handleBubblePointerDown,
    handleBubblePointerMove,
    handleBubblePointerUp,
  };
}
