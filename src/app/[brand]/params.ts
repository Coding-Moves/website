import { notFound } from "next/navigation";
import { SUB_BRANDS, getBrand, type Brand } from "@/data/brands";

export type BrandParams = { params: Promise<{ brand: string }> };

export function brandParams() {
  return SUB_BRANDS.map((b) => ({ brand: b.id }));
}

export async function resolveBrand(params: BrandParams["params"]): Promise<Brand> {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b || b.id === "main") notFound();
  return b;
}
