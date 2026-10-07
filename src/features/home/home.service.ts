import { articles, PRODUCT_CATEGORIES } from "@/lib/content";

const categoryBrands: Record<string, string> = {
  Chillers: "Trane · Daikin",
  "VRF / VRV": "Daikin · LG",
  "Air handling units": "Kruger · Trane",
  "Fan coil units": "Daikin · Trane",
  "Split & cassette": "Daikin · LG",
  "Ventilation fans": "Kruger",
  "Ducting & diffusers": "DP",
  "Controls & BMS": "LG · Trane",
};

export function getHomeContent() {
  const previewIds = ["best-hvac-contractor", "hvac-expo-2026", "hospital-handover"];
  return {
    slides: [
      { image: "Company — wide banner image (1920×720)", eyebrow: "Company HVAC — About us", title: "Turnkey climate systems, designed to installed.", body: "Design consultancy, supply, installation and maintenance for commercial, industrial and residential projects.", href: "/about", cta: "About the company" },
      { image: "Daikin — wide banner image", eyebrow: "Daikin — VRV / VRF systems", title: "VRV systems for large-scale comfort.", body: "Variable refrigerant flow with precise zoning and high seasonal efficiency for offices, towers and hotels.", href: "/products?cat=VRF%20%2F%20VRV", cta: "View Daikin range" },
      { image: "LG — wide banner image", eyebrow: "LG — Inverter systems", title: "Multi V inverter technology.", body: "Energy-saving inverter systems and smart controls for retail, hospitality and commercial buildings.", href: "/products", cta: "View LG range" },
      { image: "Kruger — wide banner image", eyebrow: "Kruger — Ventilation", title: "Ventilation that moves air, quietly.", body: "Centrifugal and axial fans and air handling units engineered for demanding environments.", href: "/products?cat=Ventilation%20fans", cta: "View Kruger range" },
      { image: "Trane — wide banner image", eyebrow: "Trane — Chillers", title: "Chillers built for critical loads.", body: "Central plant chillers and controls for hospitals, data centres and towers.", href: "/products?cat=Chillers", cta: "View Trane range" },
    ],
    brands: [
      { name: "Daikin", image: "Daikin image", body: "Split, VRV and ducted systems for residential and commercial buildings.", href: "/products" },
      { name: "LG", image: "LG image", body: "Multi V VRF and commercial air conditioning with smart controls.", href: "/products" },
      { name: "Trane", image: "Trane image", body: "Chillers, rooftop units and building management systems.", href: "/products" },
      { name: "Kruger", image: "Kruger image", body: "Centrifugal and axial fans, and air handling units.", href: "/products" },
      { name: "DP", image: "DP image", body: "Ducting, grilles, diffusers and dampers.", href: "/products" },
      { name: "Company services", image: "Services image", body: "Design consultancy, installation and annual maintenance contracts.", href: "/about" },
    ],
    stats: [
      { value: "1,200+", label: "Projects delivered" },
      { value: "85,000", label: "Tons of refrigeration installed" },
      { value: "350", label: "Engineers & technicians" },
    ],
    categories: PRODUCT_CATEGORIES.map((name, index) => ({
      name,
      brands: categoryBrands[name],
      index: String(index + 1).padStart(2, "0"),
      href: `/products?cat=${encodeURIComponent(name)}`,
    })),
    references: [
      { name: "City Business Tower", summary: "Commercial · VRV system, 42 floors", image: "City Business Tower photo" },
      { name: "General Hospital Wing B", summary: "Healthcare · Chiller plant & AHUs", image: "General Hospital Wing B photo" },
      { name: "Riverside Mall", summary: "Retail · Ducted systems & ventilation", image: "Riverside Mall photo" },
      { name: "Grand Hotel", summary: "Hospitality · Fan coils & BMS", image: "Grand Hotel photo" },
      { name: "Logistics Park", summary: "Industrial · Industrial ventilation", image: "Logistics Park photo" },
      { name: "Data Centre Phase 2", summary: "Industrial · Precision cooling", image: "Data Centre Phase 2 photo" },
    ],
    clients: ["Client 01", "Client 02", "Client 03", "Client 04", "Client 05", "Client 06", "Client 07", "Client 08"],
    news: articles.filter((article) => previewIds.includes(article.id)),
    stages: ["Design", "Supply", "Installation", "Commissioning", "Handover"],
    liveSites: [
      { name: "City Business Tower", system: "Daikin VRV · 42 floors", stage: "Installation", progress: 62 },
      { name: "General Hospital Wing B", system: "Trane chillers · Central plant", stage: "Commissioning", progress: 88 },
      { name: "Riverside Mall", system: "LG Multi V · Retail", stage: "Supply", progress: 41, review: true },
      { name: "Logistics Park", system: "Kruger fans", stage: "Handover", progress: 100 },
    ],
    awards: [
      { year: "2026", title: "Best HVAC Contractor of the Year", source: "Regional Building Awards" },
      { year: "2025", title: "Platinum Dealer Partner", source: "Daikin" },
      { year: "2025", title: "Energy Efficiency Project of the Year", source: "Green Building Council" },
      { year: "2024", title: "Excellence in MEP Delivery", source: "Construction Week Awards" },
    ],
    events: {
      Upcoming: [
        { day: "14", month: "Nov 2026", title: "HVAC Expo 2026", place: "Exhibition Centre · Booth B12", type: "Exhibition", cta: "Book a meeting", href: "/news/hvac-expo-2026" },
        { day: "03", month: "Dec 2026", title: "VRV system design workshop", place: "Head office training room", type: "Workshop", cta: "Register", href: "/news/hvac-expo-2026" },
        { day: "22", month: "Jan 2027", title: "Cooling Technology Summit", place: "Convention Hall", type: "Conference", cta: "Details", href: "/news/hvac-expo-2026" },
        { day: "10", month: "Mar 2027", title: "Daikin partner product launch", place: "City showroom", type: "Launch", cta: "Register", href: "/news/hvac-expo-2026" },
      ],
      Past: [
        { day: "18", month: "Sep 2026", title: "Regional Building Awards night", place: "Grand Hotel ballroom", type: "Award", cta: "Photos", href: "/news/best-hvac-contractor" },
        { day: "05", month: "Jun 2026", title: "Chiller efficiency seminar", place: "Engineers Association", type: "Seminar", cta: "Slides", href: "/news/chiller-seminar" },
        { day: "21", month: "Mar 2026", title: "Big 5 HVAC & Building Show", place: "Exhibition Centre", type: "Exhibition", cta: "Recap", href: "/news/big5-recap" },
      ],
    },
  };
}

export type HomeContent = ReturnType<typeof getHomeContent>;
