"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";
import { useInView } from "@/hooks/useInView";
import { MEDIA } from "@/lib/media";

const photos = [
  { id: 1, caption: "Cooling units ready at the works" },
  { id: 2, caption: "Hydraulic cylinder — painted and ready" },
  { id: 3, caption: "Cylinder and base assembly" },
  { id: 4, caption: "Mobile oil filtration / transfer unit" },
  { id: 5, caption: "Special-purpose hydraulic machine (SPM)" },
  { id: 6, caption: "Production floor — Ambattur works" },
  { id: 7, caption: "Tools and parts store" },
  { id: 8, caption: "Production office" },
].map((photo, i) => ({
  ...photo,
  src: MEDIA.infrastructure[i],
}));

export function InfrastructureGallery() {
  const [active, setActive] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "200px 0px",
    once: true,
  });

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") {
        setActive((cur) => {
          if (cur === null) return cur;
          const idx = photos.findIndex((p) => p.id === cur);
          return photos[(idx + 1) % photos.length].id;
        });
      }
      if (e.key === "ArrowLeft") {
        setActive((cur) => {
          if (cur === null) return cur;
          const idx = photos.findIndex((p) => p.id === cur);
          return photos[(idx - 1 + photos.length) % photos.length].id;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  const activePhoto = photos.find((p) => p.id === active);

  return (
    <>
      <div ref={ref} className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {inView
          ? photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActive(photo.id)}
                className="mb-4 block w-full break-inside-avoid text-left"
              >
                <SiteImage
                  src={photo.src}
                  alt={photo.caption}
                  aspect={i % 3 === 0 ? "16/9" : "4/3"}
                  className="transition hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <p className="mt-2 text-sm text-steel">{photo.caption}</p>
              </button>
            ))
          : photos.map((photo) => (
              <div
                key={photo.id}
                className="mb-4 break-inside-avoid"
                aria-hidden
              >
                <div className="aspect-[4/3] animate-pulse bg-light" />
                <p className="mt-2 text-sm text-steel">{photo.caption}</p>
              </div>
            ))}
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center text-white"
            aria-label="Close lightbox"
            onClick={() => setActive(null)}
          >
            <X className="size-7" />
          </button>
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SiteImage
              src={activePhoto.src}
              alt={activePhoto.caption}
              aspect="16/9"
              className="bg-white/10"
              sizes="90vw"
              priority
            />
            <p className="mt-3 text-center text-white">{activePhoto.caption}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
