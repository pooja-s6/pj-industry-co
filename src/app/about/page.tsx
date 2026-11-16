import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { MEDIA } from "@/lib/media";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About PJ Industries | Hydraulic Manufacturer since 2011",
  description:
    "PJ Industries is a Chennai-based hydraulic equipment manufacturer established in 2011, with works in Ambattur and registered office in Mannurpet.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description={`Hydraulic equipment manufacturer in Chennai since ${SITE.foundedYear}.`}
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="label">Our story</p>
            <h2 className="mt-2 font-heading text-[26px] font-bold md:text-4xl">
              Built around manufacturing
            </h2>
            <p className="mt-4 text-steel">
              Founded in {SITE.foundedYear}, PJ Industries manufactures hydraulic
              equipment in Chennai. We are a manufacturer — work is carried out
              at our Ambattur works — not a trading company.
            </p>
            <p className="mt-4 text-steel">
              Our range includes hydraulic power packs, presses, cylinders,
              cooling systems, stackers, and special-purpose machines and
              fixtures. Details and specifications are shared on enquiry.
            </p>
          </div>
          <SiteImage
            src={MEDIA.aboutWorkshop}
            alt="PJ Industries works"
            aspect="4/3"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </Section>

      <Section tone="light">
        <p className="label">Locations</p>
        <h2 className="mt-2 font-heading text-[26px] font-bold md:text-4xl">
          Where we work
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[SITE.locations.registeredOffice, SITE.locations.works].map(
            (loc) => (
              <article key={loc.label} className="card-lift bg-white p-6">
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded bg-light text-blue">
                  <MapPin className="size-5" aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy">
                  {loc.label}
                </h3>
                <p className="mt-2 text-steel">{loc.area}</p>
                <p className="mt-2 text-sm">
                  {loc.address ? (
                    loc.address
                  ) : (
                    <span className="text-steel">Address details on request</span>
                  )}
                </p>
              </article>
            ),
          )}
        </div>
      </Section>

      <Section tone="white">
        <p className="label">Leadership</p>
        <h2 className="mt-2 font-heading text-[26px] font-bold md:text-4xl">
          People behind PJ
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {SITE.leadership.map((person) => (
            <article key={person.name} className="card-lift bg-white p-6">
              <h3 className="font-heading text-xl font-semibold text-navy">
                {person.name}
              </h3>
              <p className="mt-1 text-steel">{person.role}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
