import { FadeUp } from "@/components/ui/FadeUp";
import { Section } from "@/components/ui/Section";

const points = [
  {
    title: "Manufacturer, not a trader",
    text: "Hydraulic equipment is manufactured at our Ambattur works.",
  },
  {
    title: "Built to your requirement",
    text: "Power packs, presses, cylinders, cooling systems, stackers, and special machines — enquire with your need.",
  },
  {
    title: "Chennai based",
    text: "Registered office in Mannurpet and works in Ambattur.",
  },
  {
    title: "Since 2011",
    text: "Established hydraulic equipment manufacturer serving industrial customers.",
  },
];

export function WhyPJ() {
  return (
    <Section tone="light">
      <FadeUp>
        <p className="label">Why us</p>
        <h2 className="mt-2 font-heading text-[26px] font-bold md:text-4xl">
          Why PJ Industries
        </h2>
      </FadeUp>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {points.map((point, i) => (
          <FadeUp key={point.title} delay={i * 70}>
            <article className="h-full border-l-4 border-teal bg-white p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-heading text-xl font-semibold text-navy">
                {point.title}
              </h3>
              <p className="mt-2 text-steel">{point.text}</p>
            </article>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
