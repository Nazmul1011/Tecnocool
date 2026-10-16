export type NavKey = "about" | "products" | "projects" | "news";

export type MenuItem = { name: string; summary: string; href: string };

export type Menu = {
  label: string;
  intro: string;
  href: string;
  all: string;
  items: MenuItem[];
  feature: [label: string, title: string, href: string, image?: string];
};

// [label, summary, products page query] — cat must match PRODUCT_CATEGORIES in lib/content.
const productLinks = [
  ["Chillers", "Dunham-Bush · 9 models", "cat=Chillers"],
  ["VRV / VRF indoor units", "Daikin · 7 models", `cat=${encodeURIComponent("VRV / VRF indoor units")}`],
  ["Centrifugal chillers", "Water-cooled & magnetic bearing", "q=centrifugal"],
  ["Screw chillers", "Air-cooled & water-cooled", "q=screw"],
  ["Ceiling cassettes", "Round flow & double flow", "q=cassette"],
  ["Ducted units", "Ceiling duct & slim duct", "q=duct"],
] as const;

const projectSectors = [
  ["Commercial", "Offices and business towers"],
  ["Healthcare", "Hospitals and clinics"],
  ["Retail", "Malls and showrooms"],
  ["Hospitality", "Hotels and resorts"],
  ["Industrial", "Factories and logistics"],
  ["Data centres", "Precision cooling"],
] as const;

export const menus: Record<NavKey, Menu> = {
  about: {
    label: "About us",
    intro: "The art of air — 20+ years of HVAC experience in Bangladesh.",
    href: "/about",
    all: "About the company",
    items: [
      { name: "Company profile", summary: "Who we are and what we do", href: "/about#overview" },
      { name: "Mission & values", summary: "What drives our work", href: "/about#values" },
      { name: "History", summary: "20+ years of HVAC systems", href: "/about#history" },
      { name: "Leadership", summary: "The team behind every project", href: "/about#team" },
      { name: "Partners & certifications", summary: "Daikin, LG, Dunham-Bush", href: "/about#partners" },
      { name: "Careers", summary: "Join our engineering team", href: "/about" },
    ],
    feature: ["Company profile", "Download our company profile and capability statement", "/about"],
  },
  products: {
    label: "Products",
    intro: "Authorised dealer for Daikin, LG and Dunham-Bush.",
    href: "/products",
    all: "All products",
    items: productLinks.map(([name, summary, query]) => ({ name, summary, href: `/products?${query}` })),
    feature: [
      "Featured product",
      "Magnetic bearing centrifugal chiller",
      "/products?q=magnetic",
      "/images/products/chillers/magnetic-bearing-centrifugal-chiller.png",
    ],
  },
  projects: {
    label: "Projects",
    intro: "Trusted on landmark sites across every sector.",
    href: "/projects",
    all: "All projects",
    items: projectSectors.map(([name, summary]) => ({
      name,
      summary,
      href: `/projects?sector=${encodeURIComponent(name)}`,
    })),
    feature: ["Featured project", "QA Tower, Banani — 417 TR Daikin VRV system", "/projects"],
  },
  news: {
    label: "News & events",
    intro: "Project news, awards and where to meet us.",
    href: "/news",
    all: "All news & events",
    items: [
      { name: "Latest news", summary: "Project updates and announcements", href: "/news?tab=News" },
      { name: "Awards", summary: "Recognition for our work", href: "/news?tab=Awards" },
      { name: "Upcoming events", summary: "Exhibitions, workshops, seminars", href: "/news?tab=Events" },
      { name: "Press & media", summary: "Media kit and contacts", href: "/news" },
      { name: "Newsletter", summary: "Get updates by email", href: "/news#newsletter" },
    ],
    feature: [
      "Award · 2024",
      "Best Project Award 2024",
      "/news?tab=Awards",
      "/images/certificates/daikin-dealer-certificates.png",
    ],
  },
};

export const navItems: Array<{ key: NavKey | "live"; label: string; href: string }> = [
  { key: "about", label: "About us", href: "/about" },
  { key: "products", label: "Products", href: "/products" },
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "news", label: "News & events", href: "/news" },
  { key: "live", label: "Live sites", href: "/#live" },
];
