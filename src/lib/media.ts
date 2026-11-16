/** Image paths under /public. */

export const MEDIA = {
  hero: "/images/hero/cooling-units.jpg",
  aboutWorkshop: "/images/about/workshop.jpg",
  manufacturing: {
    fabrication: "/images/manufacturing/fabrication.jpg",
    assembly: "/images/manufacturing/assembly.jpg",
    testing: "/images/manufacturing/testing.jpg",
    dispatch: "/images/manufacturing/dispatch.jpg",
  },
  infrastructure: [
    "/images/infrastructure/01.jpg",
    "/images/infrastructure/02.jpg",
    "/images/infrastructure/03.jpg",
    "/images/infrastructure/04.jpg",
    "/images/infrastructure/05.jpg",
    "/images/infrastructure/06.jpg",
    "/images/infrastructure/07.jpg",
    "/images/infrastructure/08.jpg",
  ],
  clients: {
    "Brakes India": "/images/clients/brakes-india.jpeg",
    "Carborundum Universal (CUMI)": "/images/clients/cumi.jpeg",
    "Pradeep Stainless Steel": "/images/clients/pradeep-stainless-steel.jpeg",
    "Heat Tech": "/images/clients/heattech.png",
    Impacttech: "/images/clients/impacttech.jpeg",
    Pressform: "/images/clients/pressform.png",
  } as Record<string, string | null>,
} as const;
