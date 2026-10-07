export type NavKey = "about" | "products" | "projects" | "news";

export type MenuItem = { name: string; summary: string; href: string };

export type Menu = {
  label: string;
  intro: string;
  href: string;
  all: string;
  items: MenuItem[];
  feature: [string, string, string];
};

const productCategories = [
  ["Chillers", "Trane · Daikin"],
  ["VRF / VRV", "Daikin · LG"],
  ["Air handling units", "Kruger · Trane"],
  ["Fan coil units", "Daikin · Trane"],
  ["Split & cassette", "Daikin · LG"],
  ["Ventilation fans", "Kruger"],
  ["Ducting & diffusers", "DP"],
  ["Controls & BMS", "LG · Trane"],
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
    intro: "Engineering better air for every building since 1998.",
    href: "/about",
    all: "About the company",
    items: [
      { name: "Company profile", summary: "Who we are and what we do", href: "/about#overview" },
      { name: "Mission & values", summary: "What drives our work", href: "/about#values" },
      { name: "History", summary: "Milestones since 1998", href: "/about#history" },
      { name: "Leadership", summary: "The team behind every project", href: "/about#team" },
      { name: "Partners & certifications", summary: "Daikin, LG, Trane, Kruger, DP", href: "/about#partners" },
      { name: "Careers", summary: "Join our engineering team", href: "/about" },
    ],
    feature: ["Company profile", "Download our company profile and capability statement", "/about"],
  },
  products: {
    label: "Products",
    intro: "Complete HVAC systems from leading brands.",
    href: "/products",
    all: "All products",
    items: productCategories.map(([name, summary]) => ({
      name,
      summary,
      href: `/products?cat=${encodeURIComponent(name)}`,
    })),
    feature: ["New product", "Daikin VRV 5 heat pump with R32 refrigerant", "/products"],
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
    feature: ["Featured project", "General Hospital Wing B — chiller plant & AHUs", "/projects"],
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
      "Award · 2026-09-18",
      "Named Best HVAC Contractor at the Regional Building Awards",
      "/news/best-hvac-contractor",
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
