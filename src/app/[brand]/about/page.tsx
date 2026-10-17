import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import AboutView from "@/views/AboutView";
import { brandParams, resolveBrand, type BrandParams } from "../params";

export const dynamicParams = false;
export const generateStaticParams = brandParams;

export async function generateMetadata({ params }: BrandParams): Promise<Metadata> {
  const b = await resolveBrand(params);
  return pageMeta({ brand: b, title: "About", description: b.about.intro, path: `${b.path}/about/` });
}

export default async function Page({ params }: BrandParams) {
  return <AboutView brand={await resolveBrand(params)} />;
}
