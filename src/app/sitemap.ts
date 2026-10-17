import type { MetadataRoute } from "next";
import { BRANDS } from "@/data/brands";
import { PROJECTS, getProject } from "@/data/projects";
import { getBrand } from "@/data/brands";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = BRANDS.flatMap((b) =>
    ["/", "/about/", "/contact/"].map((sub) => ({
      url: absolute(`${b.path}${sub}`),
      priority: b.id === "main" && sub === "/" ? 1 : sub === "/" ? 0.8 : 0.5,
    })),
  );
  const projects = PROJECTS.filter((p) => !p.sample).map((p) => ({
    url: absolute(`${getBrand(p.brand)!.path}/${getProject(p.brand, p.slug)!.slug}/`),
    priority: 0.7,
  }));
  return [...pages, ...projects];
}
