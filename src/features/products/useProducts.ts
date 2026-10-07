"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { APPLICATIONS, BRANDS, PRODUCT_CATEGORIES } from "@/lib/content";
import { listProducts } from "./product.service";

export type ProductSort = "name" | "capAsc" | "capDesc";

const categories = ["All", ...PRODUCT_CATEGORIES];

function toggle(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function useProducts() {
  const params = useSearchParams();
  const catParam = params.get("cat");
  const queryParam = params.get("q") ?? "";
  const products = useMemo(() => listProducts(), []);
  const [category, setCategory] = useState(catParam && categories.includes(catParam) ? catParam : "All");
  const [brands, setBrands] = useState<string[]>([]);
  const [applications, setApplications] = useState<string[]>([]);
  const [query, setQuery] = useState(queryParam);
  const [sort, setSort] = useState<ProductSort>("name");
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    setCategory(catParam && categories.includes(catParam) ? catParam : "All");
    setQuery(queryParam);
  }, [catParam, queryParam]);

  const inCategory = products.filter((product) => category === "All" || product.category === category);
  const list = inCategory
    .filter((product) => !brands.length || brands.includes(product.brand))
    .filter((product) => !applications.length || product.applications.some((item) => applications.includes(item)))
    .filter((product) => `${product.name} ${product.model}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "capAsc") return a.capacity - b.capacity;
      if (sort === "capDesc") return b.capacity - a.capacity;
      return a.name.localeCompare(b.name);
    });

  const clearFilters = () => {
    setCategory("All");
    setBrands([]);
    setApplications([]);
    setQuery("");
  };

  return {
    products,
    categories,
    brands: BRANDS,
    applications: APPLICATIONS,
    category,
    setCategory,
    selectedBrands: brands,
    toggleBrand: (brand: string) => setBrands((current) => toggle(current, brand)),
    selectedApplications: applications,
    toggleApplication: (application: string) => setApplications((current) => toggle(current, application)),
    query,
    setQuery,
    sort,
    setSort,
    compare,
    toggleCompare: (id: string) =>
      setCompare((current) => {
        if (current.includes(id)) return current.filter((item) => item !== id);
        return current.length < 3 ? [...current, id] : current;
      }),
    removeCompare: (id: string) => setCompare((current) => current.filter((item) => item !== id)),
    clearCompare: () => setCompare([]),
    clearFilters,
    inCategory,
    list,
  };
}
