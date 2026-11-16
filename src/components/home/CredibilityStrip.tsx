"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useInView } from "@/hooks/useInView";
import { SITE } from "@/lib/site";

type StripItem =
  | { kind: "text"; headline: string; detail: string }
  | { kind: "count"; value: number; suffix: string; detail: string };

const items: StripItem[] = [
  {
    kind: "text",
    headline: `Since ${SITE.foundedYear}`,
    detail: "Established manufacturer",
  },
  {
    kind: "count",
    value: SITE.experienceYears,
    suffix: "+",
    detail: "Years of Experience",
  },
  {
    kind: "text",
    headline: "In-house Manufacturing",
    detail: "Ambattur works, Chennai",
  },
  {
    kind: "text",
    headline: "Custom-built",
    detail: "To your requirement",
  },
];

export function CredibilityStrip() {
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.45,
    rootMargin: "0px 0px -20% 0px",
    once: true,
  });

  return (
    <section ref={ref} className="border-y border-steel/10 bg-white">
      <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:py-10">
        {items.map((item) => (
          <div key={item.detail} className="text-center lg:text-left">
            {item.kind === "count" ? (
              <p className="font-heading text-3xl font-bold text-navy md:text-4xl">
                <CountUp end={item.value} active={inView} />
                {item.suffix}
              </p>
            ) : (
              <p className="font-heading text-2xl font-bold text-navy md:text-3xl">
                {item.headline}
              </p>
            )}
            <p className="mt-1 text-sm text-steel">{item.detail}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

function CountUp({ end, active }: { end: number; active: boolean }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(end);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, end]);

  return <span>{value}</span>;
}
