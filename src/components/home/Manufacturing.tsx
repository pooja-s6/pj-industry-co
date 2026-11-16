import { Factory, PackageCheck, Settings2, Wrench } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { MEDIA } from "@/lib/media";

const steps = [
  {
    title: "Fabrication",
    text: "Fabrication at our Ambattur works.",
    icon: Factory,
    image: MEDIA.manufacturing.fabrication,
  },
  {
    title: "Hydraulic Assembly",
    text: "Assembly of hydraulic equipment in-house.",
    icon: Settings2,
    image: MEDIA.manufacturing.assembly,
  },
  {
    title: "Testing",
    text: "Checks before equipment is dispatched.",
    icon: Wrench,
    image: MEDIA.manufacturing.testing,
  },
  {
    title: "Dispatch",
    text: "Dispatch from Ambattur.",
    icon: PackageCheck,
    image: MEDIA.manufacturing.dispatch,
  },
];

export function Manufacturing() {
  return (
    <Section tone="white">
      <FadeUp>
        <p className="label">Our process</p>
        <h2 className="mt-2 font-heading text-[26px] font-bold md:text-4xl">
          Our Manufacturing
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          From fabrication to dispatch, PJ Industries controls the build at our
          Ambattur facility.
        </p>
      </FadeUp>

      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <FadeUp key={step.title} delay={i * 80} className="h-full">
              <article className="card-lift flex h-full flex-col overflow-hidden bg-white">
                <SiteImage
                  src={step.image}
                  alt={`${step.title} at PJ Industries Ambattur works`}
                  aspect="4/3"
                  className="shrink-0 rounded-none"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="flex min-h-[9.5rem] flex-1 flex-col p-5">
                  <div className="mb-3 inline-flex size-10 items-center justify-center rounded bg-light text-blue">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-heading line-clamp-2 min-h-[3.25rem] text-xl font-semibold leading-snug text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-steel">
                    {step.text}
                  </p>
                </div>
              </article>
            </FadeUp>
          );
        })}
      </div>
    </Section>
  );
}
