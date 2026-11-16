"use client";

import { useMemo, useState } from "react";
import { SiteImage } from "@/components/ui/SiteImage";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  image: string;
  gallery?: string[];
  priority?: boolean;
};

export function ProductMedia({
  name,
  image,
  gallery = [],
  priority = false,
}: Props) {
  const items = useMemo(
    () => [
      { src: image, alt: `${name} manufactured by PJ Industries` },
      ...gallery.map((src, i) => ({
        src,
        alt: `${name} photo ${i + 2}`,
      })),
    ],
    [image, gallery, name],
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        className="group block w-full cursor-zoom-in text-left"
        onClick={() => openAt(0)}
        aria-label={`View larger photo of ${name}`}
      >
        <SiteImage
          src={image}
          alt={`${name} manufactured by PJ Industries`}
          aspect="4/3"
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="transition group-hover:opacity-95"
        />
      </button>

      {gallery.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              className={cn(
                "cursor-zoom-in overflow-hidden text-left transition hover:opacity-90",
              )}
              onClick={() => openAt(i + 1)}
              aria-label={`View gallery photo ${i + 2} of ${name}`}
            >
              <SiteImage
                src={src}
                alt={`${name} photo ${i + 2}`}
                aspect="4/3"
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      ) : null}

      <ImageLightbox
        items={items}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
