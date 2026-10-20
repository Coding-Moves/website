import Link from "next/link";
import { href, logoSrc, type Brand } from "@/data/brands";
import type { Project } from "@/data/projects";
import { repositoryByName } from "@/data/repositories";
import BrandShell from "@/components/BrandShell";
import SubBrandLink from "@/components/SubBrandLink";
import { CtaBand, PlatformBadges, SampleBadge, StatusBadge } from "@/components/Bits";

export default function ProjectView({ brand, project: p }: { brand: Brand; project: Project }) {
  const isService = p.brand === "services" && p.status === "available";
  const isPrivate = p.brand === "products" && p.platforms?.includes("private");
  const repository = p.repositoryName ? repositoryByName(p.repositoryName) : undefined;
  const contactPath = href(brand, "/contact/");
  const contactHref = p.contactTopic ? `${contactPath}?topic=${encodeURIComponent(p.contactTopic)}` : contactPath;
  return (
    <BrandShell brand={brand} page="project">
      <section className="hero">
        <div className={`container${p.brand === "services" ? " hero-grid" : ""}`}>
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={href(brand, "/")}>{brand.name}</Link> / {p.name}
            </nav>
            <div className="badges">
              <StatusBadge status={p.status} />
              {p.brand === "products" && <PlatformBadges platforms={p.platforms} />}
              {p.sample && <SampleBadge />}
            </div>
            <h1>{p.name}</h1>
            <p className="lead">{p.summary}</p>
            {isPrivate && <p className="notice" role="note">Private app: invite only</p>}
            <div className="hero-actions">
              {p.brand === "products" && p.playStoreUrl && (
                <SubBrandLink href={p.playStoreUrl} className="btn btn-primary">Get it on Google Play</SubBrandLink>
              )}
              {p.brand === "products" && p.appStoreUrl && (
                <SubBrandLink href={p.appStoreUrl} className="btn btn-primary">Get it on the App Store</SubBrandLink>
              )}
              {p.brand === "products" && p.webUrl && (
                <SubBrandLink href={p.webUrl} className="btn btn-primary">Open web app</SubBrandLink>
              )}
              {p.brand === "products" && p.downloadUrl && (
                <SubBrandLink href={p.downloadUrl} className="btn btn-primary">Download</SubBrandLink>
              )}
              {isPrivate && (
                <Link href={href(brand, "/contact/")} className="btn btn-primary">Request access →</Link>
              )}
              {p.demoUrl && (
                <a href={p.demoUrl} className="btn btn-primary">
                  Try it →
                </a>
              )}
              {repository?.visibility === "public" && (
                <a href={repository.url} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  View the code
                </a>
              )}
              {isService && (
                <Link href={contactHref} className="btn btn-primary">
                  Ask about this →
                </Link>
              )}
            </div>
            {repository?.visibility === "private" && <p className="notice" role="note">Only the owner can see this repository.</p>}
          </div>
          {p.brand === "services" && (
            <div className="hero-art">
              <img src={logoSrc(brand)} alt={`${brand.name} logo`} width={360} height={360} />
            </div>
          )}
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

      {p.steps && (
        <section className="section" aria-labelledby="project-steps">
          <div className="container">
            <div className="section-head">
              <h2 id="project-steps">How it works</h2>
            </div>
            <ol className="steps">
              {p.steps.map((step) => (
                <li key={step}><h3>{step}</h3></li>
              ))}
            </ol>
          </div>
        </section>
      )}

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
