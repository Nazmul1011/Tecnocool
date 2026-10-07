import { articles } from "@/lib/content";
import type { Article, NewsTab } from "@/types/content";

export function listArticles(): Article[] {
  return articles;
}

export function getArticle(id: string) {
  return articles.find((article) => article.id === id) ?? null;
}

export function articleMatches(article: Article, tab: NewsTab) {
  if (tab === "All") return true;
  if (tab === "News") return article.type === "News";
  if (tab === "Awards") return article.type === "Award";
  return article.type === "Event";
}

export function neighbours(id: string) {
  const index = articles.findIndex((article) => article.id === id);
  if (index < 0) return { previous: null, next: null };
  return {
    previous: articles[index + 1] ?? null,
    next: articles[index - 1] ?? null,
  };
}

export function relatedArticles(id: string) {
  const current = getArticle(id);
  if (!current) return [];
  return articles.filter((article) => article.id !== id && article.type === current.type).slice(0, 3);
}
