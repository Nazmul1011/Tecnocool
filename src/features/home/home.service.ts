import { articles, products } from "@/lib/content";

const productsHref = (category: string) => `/products?cat=${encodeURIComponent(category)}`;
const CHILLERS_HREF = productsHref("Chillers");
const INDOOR_HREF = productsHref("VRV / VRF indoor units");

function productGroup(category: string, shape: "tall" | "wide") {
  return {
    title: category,
    shape,
    href: productsHref(category),
    items: products
      .filter((product) => product.category === category)
      .map((product, index) => ({
        name: product.name,
        image: product.image,
        index: String(index + 1).padStart(2, "0"),
      })),
  };
}

export function getHomeContent() {
  const previewIds = ["best-hvac-contractor", "hvac-expo-2026", "hospital-handover"];
  return {
    slides: [
      { image: "/images/dealers/daikin-japan.png", fit: "contain", alt: "Daikin, Japan", eyebrow: "Daikin — Japan", title: "A pioneer in climate control since 1924.", body: "Founded in Osaka, Japan in 1924, Daikin became a pioneer in climate control solutions, especially air conditioning technology.", href: INDOOR_HREF, cta: "View Daikin range" },
      { image: "/images/dealers/lg-south-korea.png", fit: "contain", alt: "LG, South Korea", eyebrow: "LG — South Korea", title: "Life's Good since 1958.", body: "Starting out as GoldStar in 1958, LG air conditioners are known for their energy efficiency, innovative features and reliable performance.", href: "/products", cta: "View LG range" },
      { image: "/images/dealers/db-usa.png", fit: "contain", alt: "Dunham-Bush, USA", eyebrow: "Dunham-Bush — USA", title: "HVAC innovation since 1894.", body: "Dunham-Bush introduced screw compressors to the HVAC industry in 1964 and now manufactures from its plant in Malaysia.", href: CHILLERS_HREF, cta: "View Dunham-Bush range" },
    ],
    brands: [
      { name: "Daikin", image: "/images/dealers/daikin-japan.png", fit: "contain", alt: "Daikin, Japan", body: "Founded in Osaka, Japan in 1924, Daikin is a pioneer in climate control solutions, especially air conditioning technology.", href: INDOOR_HREF, cta: "View range" },
      { name: "LG", image: "/images/dealers/lg-south-korea.png", fit: "contain", alt: "LG, South Korea", body: "Starting out as GoldStar in South Korea in 1958, LG air conditioners are known for energy efficiency, innovative features and reliable performance.", href: "/products", cta: "View range" },
      { name: "Dunham-Bush", image: "/images/dealers/db-usa.png", fit: "contain", alt: "Dunham-Bush, USA", body: "Formed in the USA in 1894, Dunham-Bush introduced screw compressors to the HVAC industry in 1964 and now manufactures in Malaysia.", href: CHILLERS_HREF, cta: "View range" },
    ],
    stats: [
      { value: "20+", label: "Years of HVAC experience" },
      { value: "25+", label: "Featured projects across Bangladesh" },
      { value: "6", label: "Dealer sales & project awards" },
      { value: "3", label: "Authorised brands — Daikin, LG, Dunham-Bush" },
    ],
    productRange: [productGroup("Chillers", "tall"), productGroup("VRV / VRF indoor units", "wide")],
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
