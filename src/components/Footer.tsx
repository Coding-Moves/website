import Link from "next/link";
import { BRANDS, href, logoSrc, type Brand } from "@/data/brands";
import { SITE } from "@/data/site";
import SubBrandLink from "./SubBrandLink";

export default function Footer({ brand }: { brand: Brand }) {
  const year = new Date().getFullYear();
  const main = brand.id === "main";
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href={href(brand, "/")} className="logo-link">
              <img src={logoSrc(brand)} alt="" width={38} height={38} />
              <span className="logo-text">{brand.name}</span>
            </Link>
            <p>{brand.oneLiner}{main && ` ${SITE.slogan}`}</p>
          </div>
          <nav className="footer-links" aria-label={`${brand.name} footer links`}>
            {main ? BRANDS.map((b) => (
              b.id === "main" ? (
                <Link key={b.id} href={href(b, "/")}>
                  <img src={logoSrc(b)} alt="" width={24} height={24} />
                  <span>{b.short}</span>
                </Link>
              ) : (
                <SubBrandLink key={b.id} href={href(b, "/")}>
                  <img src={logoSrc(b)} alt="" width={24} height={24} />
                  <span>{b.short} {b.status === "in-progress" && <em>· soon</em>}</span>
                </SubBrandLink>
              )
            )) : (
              <>
                <Link href={href(brand, "/")}>Home</Link>
                <Link href={href(brand, "/about/")}>About</Link>
                <Link href={href(brand, "/contact/")}>Contact</Link>
              </>
            )}
            {main && SITE.githubUrl && <a href={SITE.githubUrl}>GitHub</a>}
            {main && SITE.youtubeUrl && <a href={SITE.youtubeUrl}>YouTube</a>}
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
