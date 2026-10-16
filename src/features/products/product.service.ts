import { products } from "@/lib/content";
import type { Product } from "@/types/content";

export function listProducts(): Product[] {
  return products;
}
