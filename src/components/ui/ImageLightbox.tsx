"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { src: string; alt: string };

type Props = {
  items: Item[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
};

/**
 * Full-screen photo viewer with pinch / wheel zoom and pan.
 */
export function ImageLightbox({
  items,
  index,
  open,
  onClose,
  onIndexChange,
}: Props) {
  const item = items[index];
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const frame = useRef<HTMLDivElement>(null);

  const resetView = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!open) return;
    resetView();
  }, [open, index, resetView]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && items.length > 1) {
        onIndexChange?.((index + 1) % items.length);
      }
      if (e.key === "ArrowLeft" && items.length > 1) {
        onIndexChange?.((index - 1 + items.length) % items.length);
      }
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(4, s + 0.25));
      if (e.key === "-") setScale((s) => Math.max(1, s - 0.25));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onIndexChange, index, items.length]);

  if (!open || !item) return null;

  function clampOffset(next: { x: number; y: number }, nextScale = scale) {
    if (nextScale <= 1) return { x: 0, y: 0 };
    const max = 180 * (nextScale - 1);
    return {
      x: Math.max(-max, Math.min(max, next.x)),
      y: Math.max(-max, Math.min(max, next.y)),
    };
  }

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((s) => {
      const next = Math.min(4, Math.max(1, s + delta));
      if (next <= 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }

  function onPointerDown(e: React.PointerEvent) {
    if (scale <= 1) return;
    dragging.current = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || scale <= 1) return;
    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => clampOffset({ x: o.x + dx, y: o.y + dy }));
  }

  function onPointerUp() {
    dragging.current = false;
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      pinchStart.current = { dist, scale };
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchStart.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const next = Math.min(
        4,
        Math.max(1, (pinchStart.current.scale * dist) / pinchStart.current.dist),
      );
      setScale(next);
      if (next <= 1) setOffset({ x: 0, y: 0 });
    }
  }

  function onTouchEnd() {
    pinchStart.current = null;
  }

  function onDoubleClick() {
    if (scale > 1) resetView();
    else setScale(2.2);
  }

  const multi = items.length > 1;

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-navy/95"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 px-3 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2">
        <p className="truncate px-2 text-sm text-white/80">{item.alt}</p>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-white"
            aria-label="Zoom out"
            onClick={() =>
              setScale((s) => {
                const next = Math.max(1, s - 0.35);
                if (next <= 1) setOffset({ x: 0, y: 0 });
                return next;
              })
            }
          >
            <ZoomOut className="size-5" />
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-white"
            aria-label="Zoom in"
            onClick={() => setScale((s) => Math.min(4, s + 0.35))}
          >
            <ZoomIn className="size-5" />
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-white"
            aria-label="Close photo"
            onClick={onClose}
          >
            <X className="size-7" />
          </button>
        </div>
      </div>

      <div
        ref={frame}
        className="relative flex min-h-0 flex-1 touch-none items-center justify-center overflow-hidden px-2 pb-[max(1rem,env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {multi ? (
          <button
            type="button"
            className="absolute left-1 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur sm:left-3"
            aria-label="Previous photo"
            onClick={() =>
              onIndexChange?.((index - 1 + items.length) % items.length)
            }
          >
            <ChevronLeft className="size-6" />
          </button>
        ) : null}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          onDoubleClick={onDoubleClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            "max-h-[min(82dvh,900px)] max-w-full select-none object-contain transition-transform duration-150",
            scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
          )}
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transformOrigin: "center center",
          }}
        />

        {multi ? (
          <button
            type="button"
            className="absolute right-1 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur sm:right-3"
            aria-label="Next photo"
            onClick={() => onIndexChange?.((index + 1) % items.length)}
          >
            <ChevronRight className="size-6" />
          </button>
        ) : null}
      </div>

      <p className="pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center text-xs text-white/50">
        Pinch or use + / − to zoom · double-tap to toggle
      </p>
    </div>
  );
}
