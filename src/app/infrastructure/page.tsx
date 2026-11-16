import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

const InfrastructureGallery = dynamic(
  () =>
    import("@/components/infrastructure/Gallery").then(
      (m) => m.InfrastructureGallery,
    ),
  {
    loading: () => (
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <div className="aspect-[4/3] animate-pulse bg-white/60" />
          </div>
        ))}
      </div>
    ),
  },
);

export const metadata: Metadata = {
  title: "Infrastructure | Ambattur Works",
  description:
    "Photos from the PJ Industries Ambattur works in Chennai.",
};

export default function InfrastructurePage() {
  return (
    <>
      <PageHeader
        title="Infrastructure"
        description="Photos from our Ambattur works."
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Infrastructure" },
        ]}
      />

      <Section tone="white">
        <p className="max-w-3xl text-steel">
          PJ Industries manufactures hydraulic equipment at Ambattur, Chennai.
          The gallery below shows our works and equipment.
        </p>
      </Section>

      <Section tone="light" className="pt-0 md:pt-0">
        <InfrastructureGallery />
      </Section>
    </>
  );
}
