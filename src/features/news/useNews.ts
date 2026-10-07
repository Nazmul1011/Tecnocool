"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { NewsTab } from "@/types/content";
import { articleMatches, listArticles } from "./news.service";

const tabs: NewsTab[] = ["All", "News", "Awards", "Events"];
const perPage = 6;

export function useNews() {
  const params = useSearchParams();
  const tabParam = params.get("tab");
  const articles = useMemo(() => listArticles(), []);
  const [tab, setTab] = useState<NewsTab>(tabs.includes(tabParam as NewsTab) ? (tabParam as NewsTab) : "All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTab(tabs.includes(tabParam as NewsTab) ? (tabParam as NewsTab) : "All");
    setPage(1);
  }, [tabParam]);

  const filtered = articles.filter(
    (article) => articleMatches(article, tab) && article.title.toLowerCase().includes(query.toLowerCase()),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, pages);
  const counts = {
    All: articles.length,
    News: articles.filter((article) => article.type === "News").length,
    Awards: articles.filter((article) => article.type === "Award").length,
    Events: articles.filter((article) => article.type === "Event").length,
  };

  return {
    tabs,
    counts,
    tab,
    setTab: (next: NewsTab) => {
      setTab(next);
      setPage(1);
    },
    query,
    setQuery: (next: string) => {
      setQuery(next);
      setPage(1);
    },
    page: safePage,
    pages,
    setPage,
    filtered,
    visible: filtered.slice((safePage - 1) * perPage, safePage * perPage),
    showFeatured: tab === "All" && !query,
    featured: articles[0],
  };
}

export function useArticle(id: string) {
  return useMemo(() => listArticles().find((article) => article.id === id) ?? null, [id]);
}
