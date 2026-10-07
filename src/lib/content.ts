import type { Article, Product, Project } from "@/types/content";

export const PRODUCT_CATEGORIES = [
  "Chillers",
  "VRF / VRV",
  "Air handling units",
  "Fan coil units",
  "Split & cassette",
  "Ventilation fans",
  "Ducting & diffusers",
  "Controls & BMS",
] as const;

export const BRANDS = ["Daikin", "LG", "Trane", "Kruger", "DP"] as const;

export const APPLICATIONS = [
  "Commercial",
  "Industrial",
  "Healthcare",
  "Hospitality",
  "Residential",
] as const;

export const SECTORS = [
  "Commercial",
  "Healthcare",
  "Retail",
  "Hospitality",
  "Industrial",
  "Data centres",
] as const;

const productRows: Array<
  [string, string, string, string, number, string, string, string[]]
> = [
  ["Water-cooled screw chiller", "Trane", "Chillers", "RTWD-250", 880, "kW", "R134a", ["Commercial", "Industrial"]],
  ["Centrifugal chiller", "Trane", "Chillers", "CVHH-1500", 5275, "kW", "R1233zd", ["Industrial", "Healthcare"]],
  ["Air-cooled scroll chiller", "Daikin", "Chillers", "EWAT-B", 420, "kW", "R32", ["Commercial"]],
  ["VRV 5 heat pump", "Daikin", "VRF / VRV", "RXYA-A", 56, "kW", "R32", ["Commercial", "Hospitality"]],
  ["Multi V i outdoor unit", "LG", "VRF / VRV", "ARUM-LTE6", 67, "kW", "R410A", ["Commercial", "Hospitality"]],
  ["Modular AHU", "Kruger", "Air handling units", "KAD-12", 12000, "m³/h", "—", ["Healthcare", "Industrial"]],
  ["Packaged rooftop unit", "Trane", "Air handling units", "Voyager-3", 105, "kW", "R410A", ["Commercial"]],
  ["Ducted fan coil unit", "Daikin", "Fan coil units", "FWD-AT", 8, "kW", "—", ["Hospitality", "Commercial"]],
  ["4-way ceiling cassette", "LG", "Split & cassette", "ARNU-TQ", 7, "kW", "R32", ["Commercial", "Hospitality"]],
  ["Wall-mounted split", "Daikin", "Split & cassette", "FTXM-R", 3.5, "kW", "R32", ["Residential"]],
  ["Centrifugal inline fan", "Kruger", "Ventilation fans", "KDK-400", 4200, "m³/h", "—", ["Industrial", "Commercial"]],
  ["Axial wall fan", "Kruger", "Ventilation fans", "KAF-630", 9800, "m³/h", "—", ["Industrial"]],
  ["Pre-insulated ducting", "DP", "Ducting & diffusers", "PI-20", 0, "", "—", ["Commercial", "Healthcare"]],
  ["Linear slot diffuser", "DP", "Ducting & diffusers", "LSD-2", 0, "", "—", ["Commercial", "Hospitality"]],
  ["Central controller", "LG", "Controls & BMS", "AC Smart 5", 0, "", "—", ["Commercial", "Hospitality"]],
  ["Intelligent Touch Manager", "Daikin", "Controls & BMS", "DCM601", 0, "", "—", ["Commercial"]],
];

export const products: Product[] = productRows.map(
  ([name, brand, category, model, capacity, unit, refrigerant, applications], index) => ({
    id: `p${index}`,
    name,
    brand,
    category,
    model,
    capacity,
    unit,
    refrigerant,
    applications,
  }),
);

const projectRows: Array<[string, string, string, string, number, string, string]> = [
  ["City Business Tower", "Skyline Developments", "Commercial", "City Centre", 2026, "Daikin VRV", "VRV system across 42 floors with central controls"],
  ["General Hospital Wing B", "Ministry of Health", "Healthcare", "North District", 2026, "Trane · Kruger", "Chiller plant and theatre air handling units"],
  ["Riverside Mall", "Riverside Retail Group", "Retail", "Riverside", 2025, "LG Multi V", "Ducted systems and car park ventilation"],
  ["Grand Hotel", "Grand Hospitality", "Hospitality", "Old Town", 2025, "Daikin · DP", "320 fan coil units with building management"],
  ["Logistics Park", "Prime Logistics", "Industrial", "Free Zone", 2025, "Kruger", "Industrial ventilation for 60,000 m² warehouse"],
  ["Data Centre Phase 2", "Cloud Infra Co.", "Data centres", "Tech Park", 2024, "Trane", "Precision cooling with N+1 chiller redundancy"],
  ["Harbour Offices", "Harbour Holdings", "Commercial", "Waterfront", 2024, "LG Multi V", "Inverter VRF for 12-storey office block"],
  ["Children's Clinic", "Private Health Group", "Healthcare", "West End", 2024, "Daikin", "Split and ducted systems with fresh air units"],
  ["Central Showroom", "Auto Gallery", "Retail", "Ring Road", 2023, "Daikin VRV", "Showroom and workshop climate control"],
  ["Beach Resort", "Coastline Resorts", "Hospitality", "Coast", 2023, "Trane · DP", "Central plant and villa fan coils"],
  ["Food Processing Plant", "Fresh Foods Ltd.", "Industrial", "Industrial Area", 2023, "Kruger · Trane", "Process cooling and extract ventilation"],
  ["University Library", "State University", "Commercial", "Campus", 2022, "LG · DP", "Low-noise ducted systems and diffusers"],
  ["Dental Hospital", "Smile Health", "Healthcare", "East District", 2022, "Daikin", "Clean-air ventilation for treatment rooms"],
  ["Edge Data Hub", "Telecom Co.", "Data centres", "Airport Road", 2022, "Daikin", "Close-control cooling units"],
];

export const projects: Project[] = projectRows.map(
  ([name, client, sector, city, year, brands, scope], index) => ({
    id: `pr${index}`,
    name,
    client,
    sector,
    city,
    year,
    brands,
    scope,
  }),
);

function article(
  id: string,
  type: Article["type"],
  date: string,
  title: string,
  excerpt: string,
  extra: Partial<Pick<Article, "blocks" | "tags" | "readMinutes">> = {},
): Article {
  return {
    id,
    type,
    date,
    title,
    excerpt,
    blocks: extra.blocks ?? [
      { kind: "p", text: excerpt },
      {
        kind: "p",
        text: "Our engineers will publish drawings, programme notes and handover details as this work moves forward.",
      },
    ],
    tags: extra.tags ?? [type === "Award" ? "Awards" : type],
    readMinutes: extra.readMinutes ?? 3,
  };
}

export const articles: Article[] = [
  article(
    "best-hvac-contractor",
    "Award",
    "2026-09-18",
    "Company HVAC named Best HVAC Contractor at the Regional Building Awards",
    "The award recognises our delivery of the General Hospital Wing B chiller plant and the City Business Tower VRV installation.",
    {
      readMinutes: 4,
      tags: ["Awards", "Healthcare", "Chillers"],
      blocks: [
        { kind: "p", text: "Company HVAC has been named Best HVAC Contractor of the Year at the 2026 Regional Building Awards, held at the Grand Hotel on 18 September. The judging panel of consultants, developers and engineers highlighted the company's delivery record on complex, occupied buildings." },
        { kind: "p", text: "Two projects were singled out: the central chiller plant at General Hospital Wing B, completed without interrupting clinical services, and the 42-floor VRV installation at City Business Tower, delivered floor by floor alongside fit-out contractors." },
        { kind: "quote", text: "This award belongs to our site teams — the engineers and technicians who keep hospitals running while we rebuild their plant rooms.", by: "Name Surname, Chief Executive Officer" },
        { kind: "h2", text: "Delivering in a live hospital" },
        { kind: "p", text: "At General Hospital Wing B, the team replaced two ageing chillers with high-efficiency Trane units and new air handling units for operating theatres. Work was phased over night shifts, with temporary cooling maintained throughout." },
        { kind: "facts", items: [{ value: "2 × 1,500 kW", label: "Chiller capacity" }, { value: "0 hours", label: "Clinical downtime" }, { value: "-28%", label: "Plant energy use" }] },
        { kind: "h2", text: "A tower delivered floor by floor" },
        { kind: "p", text: "At City Business Tower, Daikin VRV systems were installed in coordination with tenant fit-outs, allowing floors to be handed over as soon as they were ready rather than waiting for whole-building completion." },
        { kind: "figures", labels: ["Hospital plant room", "Tower VRV installation"], caption: "Left: Wing B chiller plant. Right: VRV outdoor units at City Business Tower." },
        { kind: "p", text: "The award follows our recognition as a Daikin Platinum Partner earlier this year. We thank our clients, consultants and brand partners for their trust." },
      ],
    },
  ),
  article("hvac-expo-2026", "Event", "2026-11-14", "Meet us at HVAC Expo 2026 — Exhibition Centre, Booth B12", "Book a meeting with our engineers at Booth B12 to review VRV, chiller and ventilation options for your next building."),
  article("tower-level-30", "News", "2026-10-02", "City Business Tower VRV installation reaches level 30", "Daikin VRV systems are being handed over floor by floor alongside tenant fit-out at City Business Tower."),
  article("service-hotline", "News", "2026-09-12", "New 24/7 service hotline for maintenance contract clients", "Contract clients can now reach the service desk any hour for breakdowns, planned visits and spare parts."),
  article("daikin-platinum", "Award", "2026-08-20", "Recognised as Daikin Platinum Partner for the second year", "Daikin renewed our Platinum Partner status after another year of VRV design, installation and documented handover."),
  article("hospital-handover", "News", "2026-08-02", "Chiller plant handover completed at General Hospital Wing B", "The Trane chiller plant and theatre air handling units were handed over with no clinical downtime."),
  article("chiller-seminar", "Event", "2026-06-05", "Chiller efficiency seminar with the Engineers Association", "We presented plant-room measurements and part-load strategies from recent healthcare projects."),
  article("energy-award", "Award", "2025-11-30", "Energy Efficiency Project of the Year — Green Building Council", "The council recognised a chiller and controls upgrade that cut plant energy use without reducing comfort."),
  article("logistics-park-news", "News", "2025-10-14", "Kruger ventilation package delivered for Logistics Park", "Industrial fans and air handling for the 60,000 m² warehouse were delivered and commissioned on programme."),
  article("big5-recap", "Event", "2025-03-21", "Big 5 HVAC & Building Show — highlights and recap", "Consultants and developers visited the stand to review VRV zoning, chillers and ductwork."),
  article("training-centre", "News", "2025-02-10", "Opening of our new training centre for technicians", "The centre trains installation and service teams on VRV commissioning, chillers and safe refrigerant handling."),
];

export const clientNames = [
  "Skyline Developments",
  "Ministry of Health",
  "Riverside Retail Group",
  "Grand Hospitality",
  "Prime Logistics",
  "Cloud Infra Co.",
  "Harbour Holdings",
  "Private Health Group",
  "Auto Gallery",
  "Coastline Resorts",
  "Fresh Foods Ltd.",
  "State University",
];
