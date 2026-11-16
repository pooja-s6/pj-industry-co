"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const alt = `${product.name} manufactured by PJ Industries`;

  return (
    <article className="card-lift flex h-full flex-col overflow-hidden bg-white">
      <button
        type="button"
        className="group block w-full shrink-0 cursor-zoom-in text-left"
        onClick={() => setOpen(true)}
        aria-label={`View larger photo of ${product.name}`}
      >
        <SiteImage
          src={product.image}
          alt={alt}
          aspect="4/3"
          className="rounded-none transition group-hover:opacity-95"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </button>
      <div className="flex min-h-[11.5rem] flex-1 flex-col p-5">
        <h3 className="font-heading line-clamp-2 min-h-[3.25rem] text-xl font-semibold leading-snug text-navy">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-steel">
          {product.tagline || product.summary || "\u00A0"}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-teal hover:underline"
        >
          View details
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <ImageLightbox
        items={[{ src: product.image, alt }]}
        index={0}
        open={open}
        onClose={() => setOpen(false)}
      />
    </article>
  );
}
