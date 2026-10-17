import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrand } from "@/data/brands";
import { PROJECTS, getProject } from "@/data/projects";
import { pageMeta } from "@/lib/seo";
import ProjectView from "@/views/ProjectView";

type Props = { params: Promise<{ brand: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.brand !== "main").map((p) => ({ brand: p.brand, slug: p.slug }));
}

async function load(params: Props["params"]) {
  const { brand, slug } = await params;
  const b = getBrand(brand);
  const p = b ? getProject(b.id, slug) : undefined;
  if (!b || !p) notFound();
  return { b, p };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { b, p } = await load(params);
  return pageMeta({ brand: b, title: p.name, description: p.summary, path: `${b.path}/${p.slug}/`, noindex: p.sample });
}

export default async function Page({ params }: Props) {
  const { b, p } = await load(params);
  return <ProjectView brand={b} project={p} />;
}
