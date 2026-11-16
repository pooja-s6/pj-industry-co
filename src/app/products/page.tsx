import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ProductFilters } from "@/components/products/ProductFilters";

export const metadata: Metadata = {
  title: "Hydraulic Products Manufacturer in Chennai",
  description:
    "Browse PJ Industries hydraulic power packs, presses, cylinders, cooling systems, stackers and special machines manufactured in Chennai.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        description="Hydraulic equipment manufactured at our Ambattur works. Enquire for specifications and quote."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Products" },
        ]}
      />
      <Section tone="white">
        <Suspense
          fallback={
            <div className="h-64 animate-pulse rounded bg-light" aria-hidden />
          }
        >
          <ProductFilters />
        </Suspense>
      </Section>
    </>
  );
}
