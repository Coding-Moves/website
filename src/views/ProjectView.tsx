import Link from "next/link";
import { href, type Brand } from "@/data/brands";
import type { Project } from "@/data/projects";
import BrandShell from "@/components/BrandShell";
import { CtaBand, SampleBadge, StatusBadge } from "@/components/Bits";

export default function ProjectView({ brand, project: p }: { brand: Brand; project: Project }) {
  const isService = p.status === "available";
  return (
    <BrandShell brand={brand} page="project">
      <section className="hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={href(brand, "/")}>{brand.name}</Link> / {p.name}
          </nav>
          <div className="badges">
            <StatusBadge status={p.status} />
            {p.sample && <SampleBadge />}
          </div>
          <h1>{p.name}</h1>
          <p className="lead">{p.summary}</p>
          <div className="hero-actions">
            {p.demoUrl && (
              <a href={p.demoUrl} className="btn btn-primary">
                Try it →
              </a>
            )}
            {p.repoUrl && (
              <a href={p.repoUrl} className="btn btn-ghost">
                View the code
              </a>
            )}
            {isService && (
              <Link href={href(brand, "/contact/")} className="btn btn-primary">
                Ask about this →
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="label">The vision</p>
          <p className="vision">{p.vision}</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="card">
            <h3>The problem</h3>
            <p>{p.problem}</p>
          </div>
          <div className="card">
            <h3>Our idea</h3>
            <p>{p.idea}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="card">
            <h3>{isService ? "What you get" : "What it does"}</h3>
            <ul className="list">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          {p.forWho ? (
            <div className="card">
              <h3>Who it&apos;s for</h3>
              <ul className="list">
                {p.forWho.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ) : (
            p.tech && (
              <div className="card">
                <h3>Built with</h3>
                <div className="tags">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <CtaBand
        brand={brand}
        title={isService ? "Is this what you need?" : "Interested in this?"}
        text={isService ? "Tell us about your business and we'll suggest where to start." : undefined}
      />
    </BrandShell>
  );
}
