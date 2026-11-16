import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote | Hydraulic Enquiry",
  description:
    "Send an enquiry to PJ Industries for hydraulic power packs, presses, cylinders, cooling systems and custom machines.",
};

async function EnquiryFormFromParams({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  return <EnquiryForm defaultProduct={product || ""} />;
}

export default function EnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  return (
    <>
      <PageHeader
        title="Request a Quote"
        description={`Tell us what you need. Enquiries go to ${SITE.email}.`}
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Request a Quote" },
        ]}
      />
      <Section tone="white">
        <div className="mx-auto max-w-2xl">
          <Suspense
            fallback={
              <div className="h-96 animate-pulse rounded bg-light" aria-hidden />
            }
          >
            <EnquiryFormFromParams searchParams={searchParams} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
