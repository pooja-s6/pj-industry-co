"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { PRODUCT_FILTERS, listedProducts } from "@/lib/products";
import { SITE } from "@/lib/site";

const productCategories = PRODUCT_FILTERS.filter((f) => f.id !== "all").filter(
  (f) => listedProducts().some((p) => p.category === f.id),
);

function SiteChromeInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Reset overlay UI when route changes; keep scroll top balanced with sticky chrome
  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Close dropdowns when category query changes (Products nav)
  useEffect(() => {
    setProductsOpen(false);
    setOpen(false);
  }, [activeCategory]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const productsActive =
    pathname === "/products" || pathname.startsWith("/products/");
  const onEnquiry = pathname === "/enquiry";

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        {/* Top bar — collapses cleanly, no black band left behind */}
        <div
          className={cn(
            "hidden overflow-hidden border-b border-white/10 bg-navy text-sm text-white/90 transition-[max-height,opacity] duration-300 ease-out lg:block",
            scrolled ? "max-h-0 opacity-0 border-transparent" : "max-h-10 opacity-100",
          )}
          aria-hidden={scrolled}
        >
          <Container className="flex h-10 items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center gap-2 hover:text-teal"
              >
                <Phone className="size-3.5 text-blue" aria-hidden />
                {SITE.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 hover:text-teal"
              >
                <Mail className="size-3.5 text-blue" aria-hidden />
                {SITE.email}
              </a>
            </div>
            <p className="inline-flex items-center gap-2 text-white/75">
              <MapPin className="size-3.5" aria-hidden />
              Mannurpet and Ambattur, Chennai
            </p>
          </Container>
        </div>

        <header
          className={cn(
            "border-b border-steel/10 bg-white transition-shadow duration-300",
            scrolled ? "shadow-md" : "shadow-none",
          )}
        >
          <Container className="flex h-16 items-center justify-between gap-4">
            <Logo />

            <nav
              className="hidden items-center gap-1 xl:flex"
              aria-label="Primary"
            >
              {SITE.nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                if (item.href === "/products") {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setProductsOpen(true)}
                      onMouseLeave={() => setProductsOpen(false)}
                    >
                      <Link
                        href="/products"
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                          productsActive || productsOpen
                            ? "text-teal"
                            : "text-navy hover:text-teal",
                        )}
                        aria-expanded={productsOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            productsOpen && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </Link>

                      <div
                        className={cn(
                          "absolute top-full left-0 z-50 min-w-[15rem] pt-1 transition duration-150",
                          productsOpen
                            ? "pointer-events-auto visible translate-y-0 opacity-100"
                            : "pointer-events-none invisible -translate-y-1 opacity-0",
                        )}
                      >
                        <div className="rounded-md border border-steel/15 bg-white py-2 shadow-[var(--shadow-card)]">
                          <Link
                            href="/products"
                            className={cn(
                              "block px-4 py-2.5 text-sm hover:bg-light hover:text-teal",
                              productsActive && !activeCategory
                                ? "font-medium text-teal"
                                : "text-navy",
                            )}
                          >
                            All products
                          </Link>
                          <div className="my-1 border-t border-steel/10" />
                          {productCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/products?category=${cat.id}`}
                              className={cn(
                                "block px-4 py-2.5 text-sm hover:bg-light hover:text-teal",
                                activeCategory === cat.id
                                  ? "font-medium text-teal"
                                  : "text-steel",
                              )}
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-teal" : "text-navy hover:text-teal",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/* Header call only when sticky bar is not the primary call CTA (md+) */}
              <a
                href={`tel:${SITE.phoneTel}`}
                className="hidden size-11 items-center justify-center text-navy hover:text-teal sm:inline-flex md:hidden"
                aria-label={`Call ${SITE.phoneDisplay}`}
              >
                <Phone className="size-5" />
              </a>
              {!onEnquiry ? (
                <ButtonLink
                  href="/enquiry"
                  variant="quote"
                  className="hidden sm:inline-flex"
                >
                  Request a Quote
                </ButtonLink>
              ) : null}
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center text-navy xl:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </Container>
        </header>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[60] bg-navy transition-transform duration-300 xl:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <Container className="flex h-full flex-col pt-20 pb-10">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center text-white"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-7" />
            </button>
          </div>
          <nav
            className="flex flex-1 flex-col gap-1 overflow-y-auto"
            aria-label="Mobile"
          >
            {SITE.nav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-white/10 py-4 font-heading text-2xl font-semibold text-white"
                >
                  {item.label}
                </Link>
                {item.href === "/products" ? (
                  <div className="mb-2 ml-2 border-l border-white/20 pl-4">
                    <Link
                      href="/products"
                      className={cn(
                        "block py-2.5 text-base hover:text-teal",
                        productsActive && !activeCategory
                          ? "text-teal"
                          : "text-white/75",
                      )}
                    >
                      All products
                    </Link>
                    {productCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.id}`}
                        className={cn(
                          "block py-2.5 text-base hover:text-teal",
                          activeCategory === cat.id
                            ? "text-teal"
                            : "text-white/75",
                        )}
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          {!onEnquiry ? (
            <ButtonLink href="/enquiry" variant="quote" className="w-full">
              Request a Quote
            </ButtonLink>
          ) : (
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-blue text-sm font-medium text-white"
            >
              <Phone className="size-4" aria-hidden />
              Call {SITE.phoneDisplay}
            </a>
          )}
        </Container>
      </div>
    </>
  );
}

export function SiteChrome() {
  return (
    <Suspense
      fallback={
        <div className="sticky top-0 z-50 h-16 border-b border-steel/10 bg-white" />
      }
    >
      <SiteChromeInner />
    </Suspense>
  );
}
