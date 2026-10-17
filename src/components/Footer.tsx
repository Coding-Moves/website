import Link from "next/link";
import { BRANDS, MAIN, href, logoSrc } from "@/data/brands";
import { SITE } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo-link">
              <img src={logoSrc(MAIN)} alt="" width={38} height={38} />
              <span className="logo-text">Coding Moves</span>
            </Link>
            <p>{MAIN.oneLiner} {SITE.slogan}</p>
          </div>
          <nav className="footer-links" aria-label="All Coding Moves sections">
            {BRANDS.map((b) => (
              <Link key={b.id} href={href(b, "/")}>
                <img src={logoSrc(b)} alt="" width={24} height={24} />
                <span>
                  {b.short} {b.status === "in-progress" && <em>· soon</em>}
                </span>
              </Link>
            ))}
            {SITE.githubUrl && <a href={SITE.githubUrl}>GitHub</a>}
            {SITE.youtubeUrl && <a href={SITE.youtubeUrl}>YouTube</a>}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {year} Coding Moves</span>
          <span className="signature">{SITE.signature}</span>
        </div>
      </div>
    </footer>
  );
}
