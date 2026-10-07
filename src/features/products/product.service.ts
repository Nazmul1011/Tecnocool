import { products } from "@/lib/content";
import type { Product } from "@/types/content";

export function listProducts(): Product[] {
  return products;
}

export function formatCapacity(product: Product) {
  if (!product.capacity) return "—";
  return `${product.capacity.toLocaleString()} ${product.unit}`.trim();
}
