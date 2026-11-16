import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { listedProducts } from "@/lib/products";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-white/75">{SITE.tagline}</p>
          <p className="mt-3 label text-teal">Since {SITE.foundedYear}</p>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-white">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-teal">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/enquiry" className="hover:text-teal">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-white">
            Products
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {listedProducts().map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="hover:text-teal"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-white">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <p className="text-white/50">Registered Office</p>
              {SITE.locations.registeredOffice.address ? (
                <p>{SITE.locations.registeredOffice.address}</p>
              ) : (
                <p>{SITE.locations.registeredOffice.area}</p>
              )}
            </li>
            <li>
              <p className="text-white/50">Works</p>
              {SITE.locations.works.address ? (
                <p>{SITE.locations.works.address}</p>
              ) : (
                <p>{SITE.locations.works.area}</p>
              )}
            </li>
            <li>
              <a href={`tel:${SITE.phoneTel}`} className="hover:text-teal">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-teal">
                {SITE.email}
              </a>
            </li>
            {SITE.gstin ? <li>GSTIN: {SITE.gstin}</li> : null}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-4 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PJ Industries. All rights reserved.</p>
          <p>Hydraulic equipment manufacturer, Chennai</p>
        </Container>
      </div>
    </footer>
  );
}
