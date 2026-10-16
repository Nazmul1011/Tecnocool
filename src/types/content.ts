export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  summary: string;
  specs: [ProductSpec, ProductSpec];
  applications: string[];
};

export type Project = {
  id: string;
  name: string;
  client: string;
  sector: string;
  city: string;
  year: number;
  brands: string;
  scope: string;
};

export type ArticleType = "News" | "Award" | "Event";

export type ArticleFact = { value: string; label: string };

export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: string; by: string }
  | { kind: "facts"; items: ArticleFact[] }
  | { kind: "figures"; labels: string[]; caption: string };

export type Article = {
  id: string;
  type: ArticleType;
  date: string;
  title: string;
  excerpt: string;
  blocks: ArticleBlock[];
  tags: string[];
  readMinutes: number;
};

export type NewsTab = "All" | "News" | "Awards" | "Events";
