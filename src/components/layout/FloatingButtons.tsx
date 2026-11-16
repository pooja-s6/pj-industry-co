"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";

/**
 * Lazy WhatsApp FAB. Skips mobile phone FAB (sticky bar already has Call).
 * Deferred until scroll / timeout so it does not fight LCP on mobile.
 */
export function FloatingButtons() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const onEnquiry = pathname === "/enquiry";

  useEffect(() => {
    // On enquiry, sticky bar already has Call + WhatsApp — no FAB
    if (onEnquiry) {
      setReady(false);
      return;
    }

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setReady(true);
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (window.scrollY > 160) show();
    };
    const timer = window.setTimeout(show, 1600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      setReady(false);
    };
  }, [pathname, onEnquiry]);

  if (!ready || onEnquiry) return null;

  const wa = whatsappUrl(
    "Hello PJ Industries, I would like to enquire about your hydraulic equipment.",
  );
  if (!wa) return null;

  return (
    <div className="pointer-events-none fixed right-4 bottom-24 z-40 flex flex-col items-end gap-3 md:bottom-6">
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.84 9.84 0 0 1-1.5-5.25c0-5.44 4.43-9.86 9.88-9.86 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.9 6.97c0 5.44-4.43 9.85-9.89 9.85Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
