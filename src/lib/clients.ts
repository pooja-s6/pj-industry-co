export type Client = {
  name: string;
  shortName: string;
  logo: string | null;
};

/** Client names only — no invented “what was supplied” lines. */
export const clients: Client[] = [
  {
    name: "Brakes India",
    shortName: "Brakes India",
    logo: "/images/clients/brakes-india.jpeg",
  },
  {
    name: "Carborundum Universal (CUMI)",
    shortName: "CUMI",
    logo: "/images/clients/cumi.jpeg",
  },
  {
    name: "Pradeep Stainless Steel",
    shortName: "Pradeep Stainless Steel",
    logo: "/images/clients/pradeep-stainless-steel.jpeg",
  },
  {
    name: "Heat Tech",
    shortName: "Heat Tech",
    logo: "/images/clients/heattech.png",
  },
  {
    name: "Impacttech",
    shortName: "Impacttech",
    logo: "/images/clients/impacttech.jpeg",
  },
  {
    name: "Pressform",
    shortName: "Pressform",
    logo: "/images/clients/pressform.png",
  },
];
