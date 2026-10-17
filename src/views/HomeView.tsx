import Link from "next/link";
import type { CSSProperties } from "react";
import { SUB_BRANDS, href, logoSrc, type Brand } from "@/data/brands";
import { projectsFor } from "@/data/projects";
import { SITE, SITE_URL } from "@/data/site";
import BrandShell from "@/components/BrandShell";
import { CtaBand, InProgressNotice, ProjectCard } from "@/components/Bits";

export default function HomeView({ brand }: { brand: Brand }) {
  const h = brand.home;
  const items = projectsFor(brand.id);
  const isMain = brand.id === "main";

  return (
    <BrandShell brand={brand} page="home">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{h.eyebrow}</p>
            <h1>{h.title}</h1>
            <p className="lead">{h.intro}</p>
            <div className="hero-actions">
              <Link href={h.primaryCta.href} className="btn btn-primary">
                {h.primaryCta.label} →
              </Link>
              {h.secondaryCta && (
                <Link href={h.secondaryCta.href} className="btn btn-ghost">
                  {h.secondaryCta.label}
                </Link>
              )}
            </div>
            <InProgressNotice brand={brand} />
          </div>
          <div className="hero-art">
            <img src={logoSrc(brand)} alt={`${brand.name} logo`} width={360} height={360} />
          </div>
        </div>
      </section>

      {isMain && (
        <section className="section" aria-labelledby="family">
          <div className="container">
            <div className="section-head">
              <h2 id="family">One team, a few different doors</h2>
              <p>Each part of Coding Moves has its own home. Choose the one that fits what you're looking for.</p>
            </div>
            <div className="grid grid-brands">
              {SUB_BRANDS.map((b) => (
                <Link
                  key={b.id}
                  href={href(b, "/")}
                  className="card brand-card"
                  style={{ "--c": b.accent, "--ct": b.accentSoft, "--cd": b.accentDeep } as CSSProperties}
                >
                  <div className="brand-card-top">
                    <img src={logoSrc(b)} alt="" width={56} height={56} />
                    <div>
                      <small>{b.status === "in-progress" ? "In progress" : "Open now"}</small>
                      <h3>{b.short}</h3>
                    </div>
                  </div>
                  <p>{b.oneLiner}</p>
                  <span className="card-more">Visit {b.name} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="points">
        <div className="container">
          <div className="section-head">
            <h2 id="points">{h.pointsTitle}</h2>
          </div>
          <div className="grid">
            {h.points.map((p) => (
              <div key={p.title} className="card">
                <div className="dot" aria-hidden="true" />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {h.steps && (
        <section className="section" aria-labelledby="steps">
          <div className="container">
            <div className="section-head">
              <h2 id="steps">How a project goes</h2>
              <p>Every project is a bit different, but this is the usual path.</p>
            </div>
            <ol className="steps">
              {h.steps.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {h.itemsTitle && (
        <section className="section" id="work" aria-labelledby="items">
          <div className="container">
            <div className="section-head">
              <h2 id="items">{h.itemsTitle}</h2>
              {h.itemsIntro && <p>{h.itemsIntro}</p>}
            </div>
            {items.length > 0 ? (
              <div className="grid">
                {items.map((p) => (
                  <ProjectCard key={p.slug} brand={brand} project={p} />
                ))}
              </div>
            ) : (
              <div className="card">
                <h3>Nothing here yet</h3>
                <p>The first pieces are on their way. Check back soon.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <CtaBand brand={brand} />

      {isMain && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Coding Moves",
              url: SITE_URL,
              logo: `${SITE_URL}/logos/main.svg`,
              slogan: SITE.slogan,
              description: brand.seoDescription,
              ...(SITE.githubUrl ? { sameAs: [SITE.githubUrl] } : {}),
            }),
          }}
        />
      )}
    </BrandShell>
  );
}
