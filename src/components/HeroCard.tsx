import Link from "next/link";
import { href as brandHref, isSubBrandHref, type Brand } from "@/data/brands";
import SubBrandLink from "./SubBrandLink";

function CardLink({ brand, href, label }: { brand: Brand; href: string; label: string }) {
  if (brand.id === "main" && isSubBrandHref(href)) {
    return <SubBrandLink href={href} className="hero-index-card-link">→ {label}</SubBrandLink>;
  }
  return <Link href={href} className="hero-index-card-link">→ {label}</Link>;
}

export default function HeroCard({ brand }: { brand: Brand }) {
  const secondary = brand.home.secondaryCta;
  const action = secondary ?? { href: brandHref(brand, "/contact/"), label: "Talk to us" };
  const status = brand.status === "live" ? "Open now" : "In progress";

  return (
    <aside className="hero-index-card" aria-label={`${brand.name} index`}>
      <p className="hero-index-card-label">{brand.short} · {status}</p>
      <div className="hero-index-card-divider" aria-hidden="true" />
      <ul className="hero-index-card-list">
        {brand.home.points.slice(0, 4).map((point) => <li key={point.title}>{point.title}</li>)}
      </ul>
      <div className="hero-index-card-divider" aria-hidden="true" />
      <CardLink brand={brand} href={action.href} label={action.label} />
    </aside>
  );
}
