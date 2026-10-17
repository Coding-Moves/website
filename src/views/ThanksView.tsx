import Link from "next/link";
import { href, type Brand } from "@/data/brands";
import BrandShell from "@/components/BrandShell";

export default function ThanksView({ brand }: { brand: Brand }) {
  return (
    <BrandShell brand={brand} page="contact">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Message sent</p>
          <h1>Thanks, we got it.</h1>
          <p className="lead">We&apos;ll read your message and reply by email. Meanwhile, feel free to look around.</p>
          <div className="hero-actions">
            <Link href={href(brand, "/")} className="btn btn-primary">
              Back to {brand.short} →
            </Link>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
