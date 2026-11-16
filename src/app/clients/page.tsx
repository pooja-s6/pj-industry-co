import type { Metadata } from "next";
import { clients } from "@/lib/clients";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Industrial customers of PJ Industries including Brakes India, CUMI, Pradeep Stainless Steel, Heat Tech, Impacttech and Pressform.",
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        title="Clients"
        description="Organisations we have worked with."
        crumbs={[{ href: "/", label: "Home" }, { label: "Clients" }]}
      />

      <Section tone="white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <article key={client.name} className="card-lift bg-white p-6">
              <div className="mb-4 flex aspect-video items-center justify-center bg-light p-6">
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={240}
                    height={120}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                    style={{ filter: "none" }}
                  />
                ) : (
                  <span className="text-sm text-steel">{client.shortName}</span>
                )}
              </div>
              <h2 className="font-heading text-xl font-semibold text-navy">
                {client.name}
              </h2>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
