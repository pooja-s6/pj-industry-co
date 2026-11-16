"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { PlaceholderImage } from "./Placeholder";

type Aspect = "4/3" | "16/9" | "1/1" | "auto";

/**
 * Lazy by default. Pass priority for LCP images (hero / product lead only).
 */
export function SiteImage({
  src,
  alt,
  aspect = "4/3",
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  objectFit = "cover",
}: {
  src: string | null | undefined;
  alt: string;
  aspect?: Aspect;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);

  const aspectClass =
    aspect === "4/3"
      ? "aspect-[4/3]"
      : aspect === "16/9"
        ? "aspect-video"
        : aspect === "1/1"
          ? "aspect-square"
          : "";

  if (!src || failed) {
    return (
      <PlaceholderImage label={alt} aspect={aspect} className={className} />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-light",
        aspectClass,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        unoptimized
        className={objectFit === "contain" ? "object-contain" : "object-cover"}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
