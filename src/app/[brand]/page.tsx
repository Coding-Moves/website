import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import HomeView from "@/views/HomeView";
import { brandParams, resolveBrand, type BrandParams } from "./params";

export const dynamicParams = false;
export const generateStaticParams = brandParams;

export async function generateMetadata({ params }: BrandParams): Promise<Metadata> {
  const b = await resolveBrand(params);
  return pageMeta({ brand: b, title: b.name, description: b.seoDescription, path: `${b.path}/` });
}

export default async function Page({ params }: BrandParams) {
  return <HomeView brand={await resolveBrand(params)} />;
}
