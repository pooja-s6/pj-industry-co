"use client";

import { startTransition, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/cn";
import {
  PRODUCT_FILTERS,
  listedProducts,
  type ProductCategory,
} from "@/lib/products";

function isCategory(value: string | null): value is ProductCategory {
  return PRODUCT_FILTERS.some((f) => f.id !== "all" && f.id === value);
}

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const raw = searchParams.get("category");
  // URL is the single source of truth — no mirrored local filter state
  const active: "all" | ProductCategory = isCategory(raw) ? raw : "all";
  const tabsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const all = listedProducts();
    if (active === "all") return all;
    return all.filter((p) => p.category === active);
  }, [active]);

  useEffect(() => {
    // When category changes from nav dropdown, keep filters in view
    if (!raw) return;
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [raw]);

  function setCategory(id: "all" | ProductCategory) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("category");
    else params.set("category", id);
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  return (
    <div>
      <div
        ref={tabsRef}
        className="flex scroll-mt-24 gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Product categories"
      >
        {PRODUCT_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={active === filter.id}
            onClick={() => setCategory(filter.id)}
            className={cn(
              "min-h-11 shrink-0 border px-4 text-sm font-medium transition-colors",
              active === filter.id
                ? "border-navy bg-navy text-white"
                : "border-steel/25 bg-white text-navy hover:border-teal hover:text-teal",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        ) : (
          <p className="col-span-full text-steel">
            No products in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
