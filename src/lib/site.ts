/** Site-wide constants. Marked placeholders must not be invented. */

export const SITE = {
  name: "PJ Industries",
  tagline: "One Stop Solution for All Your Hydraulic Needs",
  foundedYear: 2011,
  experienceYears: 15,
  phoneDisplay: "91767 88482",
  phoneTel: "+919176788482",
  email: "pjindustries2011@gmail.com",
  whatsapp: "919840809366",
  /** From machine nameplate — confirm check digit if needed */
  gstin: "33DLWPS4551N1ZS",
  /** [PLACEHOLDER] Working hours — confirm before go-live */
  workingHours: null as string | null,
  locations: {
    registeredOffice: {
      label: "Registered Office",
      area: "Mannurpet, Chennai",
      address:
        "33/47, Malayathamman Koil Street, Mannurpet, Chennai - 600 050",
      mapQuery:
        "33/47, Malayathamman Koil Street, Mannurpet, Chennai - 600 050",
    },
    works: {
      label: "Works",
      area: "Ambattur, Chennai",
      /** [PLACEHOLDER] Full works address */
      address: null as string | null,
      mapQuery: "Ambattur, Chennai",
    },
  },
  leadership: [
    {
      name: "Mrs. Sarala",
      role: "Proprietor",
      /** [PLACEHOLDER] Team photo */
      photo: null as string | null,
    },
    {
      name: "Rajan",
      role: "Company Representative",
      /** [PLACEHOLDER] Team photo */
      photo: null as string | null,
    },
  ],
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/infrastructure", label: "Infrastructure" },
    { href: "/clients", label: "Clients" },
    { href: "/contact", label: "Contact" },
  ],
  url: "https://pjindustries.in",
} as const;

export function whatsappUrl(message?: string) {
  if (!SITE.whatsapp) return null;
  const base = `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
