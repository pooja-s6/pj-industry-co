import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { howWeWork } from "@/lib/services";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services | Hydraulic Support in Chennai",
  description:
    "Manufacture and support for hydraulic equipment from PJ Industries, Ambattur, Chennai. Enquire for your requirement.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Manufacture and support for hydraulic equipment — tell us what you need."
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />

      <Section tone="white">
        <p className="max-w-2xl text-steel">
          PJ Industries manufactures hydraulic equipment at Ambattur and supports
          customers with related work on enquiry. We do not publish a fixed
          service menu here — share your requirement and we will confirm what we
          can do.
        </p>
        <ul className="mt-6 max-w-xl list-disc space-y-2 pl-5 text-steel">
          <li>New equipment manufacture (see Products)</li>
          <li>Custom builds to your requirement</li>
          <li>Support and related work — on enquiry</li>
        </ul>
        <p className="mt-6 text-steel">
          Call{" "}
          <a href={`tel:${SITE.phoneTel}`} className="font-medium text-teal">
            {SITE.phoneDisplay}
          </a>{" "}
          or send an enquiry.
        </p>
        <div className="mt-6">
          <ButtonLink href="/enquiry" variant="quote">
            Request a Quote
          </ButtonLink>
        </div>
      </Section>

      <Section tone="light">
        <p className="label">Process</p>
        <h2 className="mt-2 font-heading text-[26px] font-bold md:text-4xl">
          How we work
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWork.map((step) => (
            <article
              key={step.step}
              className="bg-white p-5 shadow-[var(--shadow-card)]"
            >
              <p className="font-heading text-3xl font-bold text-teal">
                {step.step}
              </p>
              <h3 className="mt-2 font-heading text-xl font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-steel">{step.text}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
