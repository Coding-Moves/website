import Link from "next/link";
import { href, type Brand } from "@/data/brands";
import BrandShell from "@/components/BrandShell";

export default function BrandNotFoundView({ brand }: { brand: Brand }) {
  return (
    <BrandShell brand={brand} page="project">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Page not found</p>
          <h1>That page isn&apos;t here.</h1>
          <p className="lead">The address may have changed, or the page may still be on its way.</p>
          <div className="hero-actions">
            <Link href={href(brand, "/")} className="btn btn-primary">Back to {brand.short} home →</Link>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
