import Link from "next/link";
import { BRANDS, href, logoSrc, type Brand } from "@/data/brands";
import ThemeToggle from "./ThemeToggle";
import SubBrandLink from "./SubBrandLink";

type Page = "home" | "about" | "contact" | "project";

export default function Header({ brand, page }: { brand: Brand; page: Page }) {
  const sub = brand.id === "main" ? null : brand.short;
  const links: { key: Page; label: string; to: string }[] = [
    { key: "home", label: "Home", to: href(brand, "/") },
    { key: "about", label: "About", to: href(brand, "/about/") },
    { key: "contact", label: "Contact", to: href(brand, "/contact/") },
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href={href(brand, "/")} className="logo-link" aria-label={`${brand.name} home`}>
          <img src={logoSrc(brand)} alt="" width={38} height={38} />
          <span className={`logo-text${sub ? " has-sub" : ""}`}>
            <span className="logo-parent" style={{ color: "inherit" }}>Coding Moves </span>
            {sub && <span>{sub}</span>}
          </span>
        </Link>

        <nav className="nav-links" aria-label={`${brand.name} pages`}>
          {links.map((l) => (
            <Link key={l.key} href={l.to} aria-current={page === l.key ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-tools">
          <details className="switcher">
            <summary className="icon-btn" aria-label="All Coding Moves sections" title="All sections">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
              </svg>
            </summary>
            <div className="switcher-panel">
              <p>Coding Moves family</p>
              {BRANDS.map((b) => (
                b.id === "main" ? (
                  <Link key={b.id} href={href(b, "/")} className="switcher-item">
                    <img src={logoSrc(b)} alt="" width={34} height={34} />
                    <span><strong>{b.name}</strong><small>{b.oneLiner}</small></span>
                  </Link>
                ) : (
                  <SubBrandLink key={b.id} href={href(b, "/")} className="switcher-item">
                    <img src={logoSrc(b)} alt="" width={34} height={34} />
                    <span><strong>{b.name}</strong><small>{b.status === "in-progress" ? "In progress" : b.oneLiner}</small></span>
                  </SubBrandLink>
                )
              ))}
            </div>
          </details>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
