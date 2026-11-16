import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { ProductCard } from "@/components/products/ProductCard";
import {
  getProduct,
  getRelatedProducts,
  listedProducts,
} from "@/lib/products";
import { SITE } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return listedProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} Manufacturer in Chennai`,
    description: product.summary,
  };
}

function ProductDetailFallback() {
  return (
    <>
      <div className="border-b border-steel/10 bg-light">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <div className="h-4 w-40 animate-pulse rounded bg-steel/15" />
          <div className="mt-4 h-10 w-2/3 max-w-md animate-pulse rounded bg-steel/15" />
        </div>
      </div>
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse bg-light" />
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-steel/15" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-steel/15" />
            <div className="h-20 w-full animate-pulse rounded bg-steel/10" />
          </div>
        </div>
      </Section>
    </>
  );
}

async function ProductDetailContent({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const enquiryHref = `/enquiry?product=${encodeURIComponent(product.name)}`;
  const hasApps = product.applications.length > 0;
  const hasFeatures = product.features.length > 0;
  const hasSpecs = product.specs.length > 0;
  const hasDetailBlock = hasApps || hasFeatures || hasSpecs;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@type": "Organization", name: SITE.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <PageHeader
        title={product.name}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { label: product.name },
        ]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SiteImage
              src={product.image}
              alt={`${product.name} manufactured by PJ Industries`}
              aspect="4/3"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.gallery.length > 0 ? (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {product.gallery.map((src, i) => (
                  <SiteImage
                    key={src}
                    src={src}
                    alt={`${product.name} photo ${i + 2}`}
                    aspect="4/3"
                    sizes="20vw"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="label">Product</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-navy md:text-4xl">
              {product.name}
            </h2>
            <p className="mt-3 text-lg font-medium text-teal">{product.tagline}</p>
            {product.summary !== product.tagline ? (
              <p className="mt-3 text-steel">{product.summary}</p>
            ) : null}
            {product.keyPoints.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {product.keyPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-charcoal">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-blue"
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={enquiryHref} variant="quote">
                Request a Quote
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact us
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-steel">
              Manufactured at our Ambattur works. Specifications are provided on
              enquiry — we do not list unverified figures on this page.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <h3 className="font-heading text-2xl font-semibold text-navy">
          About this product
        </h3>
        <p className="mt-3 max-w-3xl text-steel">{product.about}</p>

        {hasDetailBlock ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {hasApps ? (
              <div>
                <h4 className="font-heading text-xl font-semibold text-navy">
                  Applications
                </h4>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-steel">
                  {product.applications.map((app) => (
                    <li key={app}>{app}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              {hasSpecs ? (
                <>
                  <h4 className="font-heading text-xl font-semibold text-navy">
                    Specifications
                  </h4>
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full border border-steel/15 text-left text-sm">
                      <tbody>
                        {product.specs.map((row, i) => (
                          <tr
                            key={row.label}
                            className={i % 2 === 0 ? "bg-white" : "bg-light"}
                          >
                            <th className="whitespace-nowrap border-b border-steel/10 px-4 py-3 font-medium text-navy">
                              {row.label}
                            </th>
                            <td className="border-b border-steel/10 px-4 py-3 text-steel">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : null}

              {hasFeatures ? (
                <>
                  <h4 className="mt-8 font-heading text-xl font-semibold text-navy">
                    Key features
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <CheckCircle2
                          className="mt-0.5 size-5 shrink-0 text-blue"
                          aria-hidden
                        />
                        <span className="text-steel">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="mt-6 max-w-2xl text-steel">
            For specifications, capacity, and options, please{" "}
            <Link href={enquiryHref} className="font-medium text-teal">
              request a quote
            </Link>{" "}
            or call {SITE.phoneDisplay}.
          </p>
        )}
      </Section>

      <Section tone="white">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h3 className="font-heading text-2xl font-semibold text-navy md:text-3xl">
            Related products
          </h3>
          <Link href="/products" className="text-sm font-medium text-teal">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default function ProductDetailPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<ProductDetailFallback />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
