export type ProductCategory =
  | "power-packs"
  | "presses"
  | "cylinders"
  | "cooling-systems"
  | "stackers"
  | "special-machines";

export type SpecRow = {
  label: string;
  value: string;
  placeholder?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /** Short line under the product name on cards / catalogue */
  tagline: string;
  summary: string;
  about: string;
  applications: string[];
  keyPoints: string[];
  features: string[];
  specs: SpecRow[];
  image: string;
  gallery: string[];
  listed?: boolean;
};

export const PRODUCT_FILTERS: { id: "all" | ProductCategory; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "power-packs", label: "Power Packs" },
    { id: "presses", label: "Presses" },
    { id: "cylinders", label: "Cylinders" },
    { id: "cooling-systems", label: "Cooling Systems" },
    { id: "stackers", label: "Stackers" },
    { id: "special-machines", label: "Special Machines" },
  ];

/**
 * Copy kept to confirmed facts only.
 * No invented specs, applications, or feature lists — customers enquire for details.
 */
export const products: Product[] = [
  {
    slug: "hydraulic-power-packs",
    name: "Hydraulic Power Packs",
    category: "power-packs",
    tagline: "Custom hydraulic power units for industrial use",
    summary: "Hydraulic power packs manufactured in-house at our Ambattur works.",
    about:
      "PJ Industries manufactures hydraulic power packs at Ambattur. Share your requirement and we will advise on a suitable build.",
    applications: [],
    keyPoints: [
      "In-house manufacturing, Ambattur",
      "Built to your requirement",
      "Enquire for configuration and quote",
    ],
    features: [],
    specs: [],
    image: "/images/products/hydraulic-power-packs.jpg",
    gallery: [
      "/images/products/hydraulic-power-packs-2.jpg",
      "/images/products/hydraulic-power-packs-3.jpg",
    ],
  },
  {
    slug: "hydraulic-presses",
    name: "Hydraulic Presses",
    category: "presses",
    tagline: "Industrial hydraulic presses, built to requirement",
    summary: "Hydraulic presses manufactured for industrial use.",
    about:
      "PJ Industries manufactures hydraulic presses at our Ambattur works. Contact us with tonnage and size needs for a quote.",
    applications: [],
    keyPoints: [
      "Manufactured at Ambattur works",
      "Built to your requirement",
      "Enquire for a quote",
    ],
    features: [],
    specs: [],
    image: "/images/products/hydraulic-presses.jpg",
    gallery: [],
  },
  {
    slug: "hydraulic-cylinders",
    name: "Hydraulic Cylinders",
    category: "cylinders",
    tagline: "Hydraulic cylinders for industrial applications",
    summary: "Hydraulic cylinders manufactured at our Ambattur works.",
    about:
      "PJ Industries manufactures hydraulic cylinders in Chennai. Share bore, stroke, and mounting needs when you enquire.",
    applications: [],
    keyPoints: [
      "In-house manufacturing",
      "Built to your requirement",
      "Enquire for a quote",
    ],
    features: [],
    specs: [],
    image: "/images/products/hydraulic-cylinders.jpg",
    gallery: [
      "/images/products/hydraulic-cylinders-2.jpg",
      "/images/products/hydraulic-cylinders-3.jpg",
    ],
  },
  {
    slug: "cooling-systems",
    name: "Cooling Systems",
    category: "cooling-systems",
    tagline: "Industrial cooling units from Ambattur works",
    summary: "Industrial cooling units manufactured by PJ Industries.",
    about:
      "PJ Industries manufactures cooling systems at Ambattur. Enquire with your application details for a suitable unit.",
    applications: [],
    keyPoints: [
      "Manufactured in-house",
      "Part of our hydraulic equipment range",
      "Enquire for a quote",
    ],
    features: [],
    specs: [],
    image: "/images/products/cooling-systems.jpg",
    gallery: [
      "/images/products/cooling-systems-2.jpg",
      "/images/products/cooling-systems-3.jpg",
    ],
  },
  {
    slug: "stackers",
    name: "Stackers",
    category: "stackers",
    tagline: "Hydraulic stackers for material handling",
    summary: "Hydraulic stackers for material handling.",
    about:
      "PJ Industries manufactures hydraulic stackers. Share load and lift needs when you request a quote.",
    applications: [],
    keyPoints: [
      "Manufactured by PJ Industries",
      "Built to your requirement",
      "Enquire for a quote",
    ],
    features: [],
    specs: [],
    image: "/images/products/stackers.png",
    gallery: [],
  },
  {
    slug: "pitch-systems",
    name: "Pitch Systems",
    category: "special-machines",
    tagline: "Pitch systems — available on enquiry",
    summary: "Pitch systems — available on enquiry.",
    about: "Contact PJ Industries for pitch system requirements.",
    applications: [],
    keyPoints: [],
    features: [],
    specs: [],
    image: "/images/products/pitch-systems.jpg",
    gallery: [],
    listed: false,
  },
  {
    slug: "spms-and-fixtures",
    name: "SPMs and Fixtures",
    category: "special-machines",
    tagline: "Special-purpose machines and fixtures, custom-built",
    summary: "Special-purpose machines and fixtures, built to requirement.",
    about:
      "PJ Industries builds special-purpose machines and fixtures at Ambattur. Share your process requirement when you enquire.",
    applications: [],
    keyPoints: [
      "Custom-built to requirement",
      "Manufactured at Ambattur",
      "Enquire for a quote",
    ],
    features: [],
    specs: [],
    image: "/images/products/spms-and-fixtures.jpg",
    gallery: [],
  },
];

export function listedProducts() {
  return products.filter((p) => p.listed !== false);
}

export function getProduct(slug: string) {
  return listedProducts().find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3) {
  const current = getProduct(slug);
  const pool = listedProducts();
  if (!current) return pool.slice(0, limit);
  return pool
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aSame = a.category === current.category ? 0 : 1;
      const bSame = b.category === current.category ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, limit);
}
