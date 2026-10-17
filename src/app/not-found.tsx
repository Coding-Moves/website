import Link from "next/link";
import { MAIN } from "@/data/brands";
import BrandShell from "@/components/BrandShell";

export default function NotFound() {
  return (
    <BrandShell brand={MAIN} page="project">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1>This page took a wrong move.</h1>
          <p className="lead">It may have moved, or it doesn&apos;t exist yet.</p>
          <div className="hero-actions">
            <Link href="/" className="btn btn-primary">Go home →</Link>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
