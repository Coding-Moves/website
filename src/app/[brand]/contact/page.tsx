import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ContactView from "@/views/ContactView";
import { brandParams, resolveBrand, type BrandParams } from "../params";

export const dynamicParams = false;
export const generateStaticParams = brandParams;

export async function generateMetadata({ params }: BrandParams): Promise<Metadata> {
  const b = await resolveBrand(params);
  return pageMeta({ brand: b, title: "Contact", description: b.contact.intro, path: `${b.path}/contact/` });
}

export default async function Page({ params }: BrandParams) {
  return <ContactView brand={await resolveBrand(params)} />;
}
