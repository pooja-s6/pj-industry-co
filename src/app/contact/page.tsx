import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact PJ Industries | Chennai",
  description:
    "Contact PJ Industries in Chennai — Mannurpet registered office and Ambattur works. Call 91767 88482 or email pjindustries2011@gmail.com.",
};

export default function ContactPage() {
  const wa = whatsappUrl();
  const locations = [SITE.locations.registeredOffice, SITE.locations.works];

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Reach the PJ Industries team in Chennai."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />

      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-2">
          {locations.map((loc) => {
            const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&output=embed`;
            const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.mapQuery)}`;
            return (
              <article key={loc.label} className="overflow-hidden border border-steel/15 bg-white">
                <div className="aspect-video bg-light">
                  <iframe
                    title={`Map — ${loc.label}`}
                    src={mapSrc}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-heading text-xl font-semibold text-navy">
                    {loc.label}
                  </h2>
                  <p className="mt-2 text-steel">{loc.area}</p>
                  <p className="mt-2 text-sm">
                    {loc.address ? (
                      loc.address
                    ) : (
                      <span className="text-steel">
                        Address details on request
                      </span>
                    )}
                  </p>
                  <a
                    href={directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-teal hover:underline"
                  >
                    Get directions
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-navy md:text-3xl">
              Talk to us
            </h2>
            <ul className="mt-6 space-y-4 text-steel">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 text-blue" aria-hidden />
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-teal">
                  {SITE.phoneDisplay}
                </a>
              </li>
              {wa ? (
                <li className="flex items-start gap-3">
                  <MessageCircle
                    className="mt-0.5 size-5 text-blue"
                    aria-hidden
                  />
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:underline"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 text-blue" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="hover:text-teal">
                  {SITE.email}
                </a>
              </li>
              {SITE.workingHours ? (
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 text-blue" aria-hidden />
                  <span>Working hours: {SITE.workingHours}</span>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="bg-white p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Short contact form
            </h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
