"use client";

import { usePathname } from "next/navigation";
import { getBrand, MAIN } from "@/data/brands";
import BrandNotFoundView from "@/views/BrandNotFoundView";

export default function BrandNotFound() {
  const segment = usePathname().split("/")[1];
  const candidate = getBrand(segment);
  const brand = candidate && candidate.id !== "main" ? candidate : MAIN;

  return <BrandNotFoundView brand={brand} />;
}
