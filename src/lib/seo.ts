import type { Metadata } from "next";
import type { Brand } from "@/data/brands";
import { SITE_URL } from "@/data/site";

export function pageMeta(opts: {
  brand: Brand;
  title: string; // page title without brand suffix
  description: string;
  path: string; // e.g. "/lab/about/"
  noindex?: boolean;
}): Metadata {
  const { brand, title, description, path, noindex } = opts;
  const fullTitle = title === brand.name ? brand.name : `${title} | ${brand.name}`;
  const image = `/og/${brand.id}.png`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "Coding Moves",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: brand.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export const absolute = (path: string) => new URL(path, SITE_URL).toString();
