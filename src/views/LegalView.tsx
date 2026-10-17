import Link from "next/link";
import { href, type Brand } from "@/data/brands";
import BrandShell from "@/components/BrandShell";

export default function LegalView({ brand, kind }: { brand: Brand; kind: "terms" | "privacy" }) {
  const title = kind === "terms" ? "Terms" : "Privacy";
  return (
    <BrandShell brand={brand} page="legal">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">{brand.name}</p>
          <h1>{title}</h1>
          <p className="notice" role="note"><strong>Draft, not legal advice. Last updated: [TODO]</strong></p>
          <div className="prose legal-copy">
            {brand[kind].map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((body) => <p key={body}>{body}</p>)}
              </section>
            ))}
            {kind === "privacy" && <p><Link href={href(brand, "/contact/")}>Contact {brand.short}</Link> to request deletion of your message.</p>}
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
