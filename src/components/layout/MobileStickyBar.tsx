"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE, whatsappUrl } from "@/lib/site";

/**
 * Mobile-only bottom actions. Hides "Enquire" when already on /enquiry
 * so the bar matches the current page state.
 */
export function MobileStickyBar() {
  const pathname = usePathname();
  const onEnquiry = pathname === "/enquiry";
  const wa = whatsappUrl(
    "Hello PJ Industries, I would like to enquire about your hydraulic equipment.",
  );

  return (
    <div className="mobile-sticky-bar fixed inset-x-0 bottom-0 z-40 border-t border-steel/15 bg-white/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${SITE.phoneTel}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-blue text-sm font-medium text-white"
        >
          <Phone className="size-4" aria-hidden />
          Call
        </a>
        {onEnquiry ? (
          wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center bg-[#25D366] text-sm font-medium text-white"
            >
              WhatsApp
            </a>
          ) : (
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-11 items-center justify-center bg-teal text-sm font-medium text-white"
            >
              Email
            </a>
          )
        ) : (
          <a
            href="/enquiry"
            className="inline-flex min-h-11 items-center justify-center bg-teal text-sm font-medium text-white"
          >
            Enquire
          </a>
        )}
      </div>
    </div>
  );
}
