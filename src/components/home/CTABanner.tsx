import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/FadeUp";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/lib/site";

export function CTABanner() {
  return (
    <Section tone="light" className="border-t border-steel/10">
      <FadeUp>
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-navy px-6 py-10 md:flex-row md:items-center md:px-10 md:py-12">
          <div>
            <h2 className="font-heading text-[26px] font-bold text-white md:text-4xl">
              Need a custom hydraulic solution?
            </h2>
            <p className="mt-3 max-w-xl text-white/80">
              Share your requirement. We manufacture hydraulic equipment at our
              Ambattur works.
            </p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-4 inline-flex items-center gap-2 text-white hover:text-teal"
            >
              <Phone className="size-4" aria-hidden />
              {SITE.phoneDisplay}
            </a>
          </div>
          <ButtonLink href="/enquiry" variant="quote" className="shrink-0">
            Request a Quote
          </ButtonLink>
        </div>
      </FadeUp>
    </Section>
  );
}
