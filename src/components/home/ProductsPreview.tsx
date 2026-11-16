import { FadeUp } from "@/components/ui/FadeUp";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { listedProducts } from "@/lib/products";

export function ProductsPreview() {
  return (
    <Section tone="light">
      <FadeUp>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label">Catalogue</p>
            <h2 className="mt-2 font-heading text-[26px] font-bold md:text-4xl">
              Products
            </h2>
            <p className="mt-3 max-w-2xl text-steel">
              Hydraulic power packs, presses, cylinders, cooling systems,
              stackers, and special-purpose machines — manufactured in Chennai.
            </p>
          </div>
          <ButtonLink href="/products" variant="secondary">
            View all products
          </ButtonLink>
        </div>
      </FadeUp>

      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listedProducts().map((product, i) => (
          <FadeUp key={product.slug} delay={i * 60} className="h-full">
            <ProductCard product={product} />
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
