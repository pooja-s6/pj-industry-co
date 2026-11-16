"use client";

import { useState } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { Section } from "@/components/ui/Section";
import { useInView } from "@/hooks/useInView";
import { clients } from "@/lib/clients";
import { cn } from "@/lib/cn";

function ClientLogo({
  client,
}: {
  client: (typeof clients)[number];
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="client-logo">
      <div className="client-logo-img">
        {client.logo && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={client.logo}
            alt={`${client.shortName} logo`}
            width={176}
            height={65}
            loading="lazy"
            decoding="async"
            className="client-logo-media"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-xs text-steel">{client.shortName}</span>
        )}
      </div>
      <p className="client-logo-name">{client.shortName}</p>
    </div>
  );
}

export function TrustedBy() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });

  // Two copies are enough for a seamless loop; keeps DOM lighter
  const loop = [...clients, ...clients];

  return (
    <Section tone="white">
      <FadeUp>
        <p className="label">Clients</p>
        <h2 className="mt-2 font-heading text-[26px] font-bold md:text-4xl">
          Trusted by
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          Organisations we have worked with.
        </p>
      </FadeUp>

      <div
        ref={ref}
        className="client-marquee mt-10"
        aria-label="Client logos"
      >
        <div
          className={cn(
            "client-marquee-track",
            inView && "client-marquee-track--running",
          )}
        >
          {loop.map((client, i) => (
            <ClientLogo key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </Section>
  );
}
