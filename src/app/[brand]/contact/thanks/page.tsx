import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ThanksView from "@/views/ThanksView";
import { brandParams, resolveBrand, type BrandParams } from "../../params";

export const dynamicParams = false;
export const generateStaticParams = brandParams;

export async function generateMetadata({ params }: BrandParams): Promise<Metadata> {
  const b = await resolveBrand(params);
  return pageMeta({ brand: b, title: "Thanks", description: "Message sent.", path: `${b.path}/contact/thanks/`, noindex: true });
}

export default async function Page({ params }: BrandParams) {
  return <ThanksView brand={await resolveBrand(params)} />;
}
