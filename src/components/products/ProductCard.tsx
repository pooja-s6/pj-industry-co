import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden bg-white">
      <SiteImage
        src={product.image}
        alt={`${product.name} manufactured by PJ Industries`}
        aspect="4/3"
        className="shrink-0 rounded-none"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
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
    </article>
  );
}
