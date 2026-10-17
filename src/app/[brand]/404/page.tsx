import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import BrandNotFoundView from "@/views/BrandNotFoundView";
import { brandParams, resolveBrand, type BrandParams } from "../params";

export const dynamicParams = false;
export const generateStaticParams = brandParams;

export async function generateMetadata({ params }: BrandParams): Promise<Metadata> {
  const brand = await resolveBrand(params);
  return pageMeta({ brand, title: "Page not found", description: `Page not found on ${brand.name}.`, path: `${brand.path}/404/`, noindex: true });
}

export default async function Page({ params }: BrandParams) {
  return <BrandNotFoundView brand={await resolveBrand(params)} />;
}
