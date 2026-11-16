import dynamic from "next/dynamic";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { Hero } from "@/components/home/Hero";
import { ProductsPreview } from "@/components/home/ProductsPreview";

const Manufacturing = dynamic(
  () =>
    import("@/components/home/Manufacturing").then((m) => m.Manufacturing),
  { loading: () => <SectionSkeleton /> },
);
const WhyPJ = dynamic(
  () => import("@/components/home/WhyPJ").then((m) => m.WhyPJ),
  { loading: () => <SectionSkeleton /> },
);
const TrustedBy = dynamic(
  () => import("@/components/home/TrustedBy").then((m) => m.TrustedBy),
  { loading: () => <SectionSkeleton /> },
);
const CTABanner = dynamic(
  () => import("@/components/home/CTABanner").then((m) => m.CTABanner),
);

function SectionSkeleton() {
  return (
    <div
      className="min-h-[12rem] animate-pulse bg-light/80"
      aria-hidden
    />
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <ProductsPreview />
      <Manufacturing />
      <WhyPJ />
      <TrustedBy />
      <CTABanner />
    </>
  );
}
