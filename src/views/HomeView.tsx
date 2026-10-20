import Link from "next/link";
import type { CSSProperties } from "react";
import { SUB_BRANDS, getBrand, href, isSubBrandHref, logoSrc, type Brand } from "@/data/brands";
import { projectForRepository, projectsFor } from "@/data/projects";
import { repositoriesFor } from "@/data/repositories";
import { SITE, SITE_URL } from "@/data/site";
import BrandShell from "@/components/BrandShell";
import SubBrandLink, { NewTabIndicator } from "@/components/SubBrandLink";
import { CtaBand, InProgressNotice, ProjectCard } from "@/components/Bits";

function HeroAction({ brand, action, className }: { brand: Brand; action: { href: string; label: string }; className: string }) {
  if (brand.id === "main" && isSubBrandHref(action.href)) {
    return <SubBrandLink href={action.href} className={className}>{action.label}</SubBrandLink>;
  }
  return <Link href={action.href} className={className}>{action.label}</Link>;
}

export default function HomeView({ brand }: { brand: Brand }) {
  const h = brand.home;
  const items = projectsFor(brand.id);
  const repositories = repositoriesFor(brand.id);
  const isMain = brand.id === "main";
  const repositoryHeading = {
    main: "Explore our repositories",
    services: "Repositories",
    lab: "Lab repositories",
    "open-source": "Public repositories",
    products: "Product source",
    research: "Research repositories",
    academy: "Learning repositories",
  }[brand.id];

  return (
    <BrandShell brand={brand} page="home">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{h.eyebrow}</p>
            <h1>{h.title}</h1>
            <p className="lead">{h.intro}</p>
            <div className="hero-actions">
              <HeroAction brand={brand} action={h.primaryCta} className="btn btn-primary" />
              {h.secondaryCta && (
                <HeroAction brand={brand} action={h.secondaryCta} className="btn btn-ghost" />
              )}
              {brand.id === "academy" && SITE.youtubeUrl && (
                <SubBrandLink href={SITE.youtubeUrl} className="btn btn-ghost">Watch on YouTube</SubBrandLink>
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
                <SubBrandLink
                  key={b.id}
                  href={href(b, "/")}
                  className="card brand-card"
                  style={{ "--c": b.accent, "--ct": b.accentSoft, "--cd": b.accentDeep } as CSSProperties}
                  showIndicator={false}
                >
                  <div className="brand-card-top">
                    <img src={logoSrc(b)} alt="" width={56} height={56} />
                    <div>
                      <small>{b.status === "in-progress" ? "In progress" : "Open now"}</small>
                      <h3>{b.short}</h3>
                    </div>
                  </div>
                  <p>{b.oneLiner}</p>
                  <span className="card-more"><span>Visit {b.name}</span><NewTabIndicator /></span>
                </SubBrandLink>
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

      {h.itemsTitle && (items.length > 0 || repositories.length === 0) && (
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

      {repositories.length > 0 && (
        <section
          className="section"
          id={h.itemsTitle && items.length === 0 ? "work" : "repositories"}
          aria-labelledby="repositories-heading"
        >
          <div className="container">
            <div className="section-head">
              <h2 id="repositories-heading">{repositoryHeading}</h2>
              <p>Public source has a GitHub link. Private source is marked clearly without a link.</p>
            </div>
            <div className="grid">
              {repositories.map((repository) => {
                const project = projectForRepository(repository.name);
                return <div className="card repository-card" key={repository.name}>
                  <span className="repository-area">
                    {repository.areas.map((area) => area === "main" ? "Organization" : getBrand(area)?.short).join(" · ")}
                  </span>
                  <h3>{repository.title}</h3>
                  <p>{repository.summary}</p>
                  {project && <Link className="card-more" href={href(getBrand(project.brand)!, `/${project.slug}/`)}>Read overview →</Link>}
                  {repository.visibility === "public" ? (
                    <a className="card-more" href={repository.url} target="_blank" rel="noopener noreferrer">
                      View repository ↗
                    </a>
                  ) : (
                    <p className="repository-private" role="note">Only the owner can see this repository.</p>
                  )}
                </div>;
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBand brand={brand} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": brand.id === "services" ? "Service" : "Organization",
            name: brand.name,
            url: new URL(href(brand, "/"), SITE_URL).toString(),
            logo: new URL(logoSrc(brand), SITE_URL).toString(),
            description: brand.seoDescription,
            ...(isMain ? { slogan: SITE.slogan } : {}),
            ...(isMain && SITE.githubUrl ? { sameAs: [SITE.githubUrl] } : {}),
          }),
        }}
      />
    </BrandShell>
  );
}
