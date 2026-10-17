import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import LegalView from "@/views/LegalView";
import { brandParams, resolveBrand, type BrandParams } from "../params";

export const dynamicParams = false;
export const generateStaticParams = brandParams;

export async function generateMetadata({ params }: BrandParams): Promise<Metadata> {
  const brand = await resolveBrand(params);
  return pageMeta({ brand, title: "Terms", description: `Draft terms for ${brand.name}.`, path: `${brand.path}/terms/` });
}

export default async function Page({ params }: BrandParams) {
  return <LegalView brand={await resolveBrand(params)} kind="terms" />;
}
