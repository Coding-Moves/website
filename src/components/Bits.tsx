import Link from "next/link";
import type { Brand } from "@/data/brands";
import { href } from "@/data/brands";
import { STATUS_LABEL, type ProductPlatform, type Project } from "@/data/projects";

const PLATFORM_LABEL: Record<ProductPlatform, string> = {
  android: "Android",
  ios: "iOS",
  web: "Web",
  desktop: "Desktop",
  private: "Private",
};

export function PlatformBadges({ platforms }: { platforms?: ProductPlatform[] }) {
  if (!platforms?.length) return null;
  return <>{platforms.map((platform) => <span className="platform-badge" key={platform}>{PLATFORM_LABEL[platform]}</span>)}</>;
}

export function StatusBadge({ status }: { status: Project["status"] }) {
  return <span className={`status status-${status}`}>{STATUS_LABEL[status]}</span>;
}

export function SampleBadge() {
  return <span className="status status-sample">Sample, replace me</span>;
}

export function InProgressNotice({ brand }: { brand: Brand }) {
  if (brand.status !== "in-progress") return null;
  return (
    <div className="notice" role="note">
      <strong>In progress:</strong>
      <span>{brand.name} is still being built. This page will grow as it gets ready.</span>
    </div>
  );
}

export function ProjectCard({ brand, project }: { brand: Brand; project: Project }) {
  return (
    <Link href={href(brand, `/${project.slug}/`)} className="card">
      <div className="badges">
        <StatusBadge status={project.status} />
        {project.brand === "products" && <PlatformBadges platforms={project.platforms} />}
        {project.sample && <SampleBadge />}
      </div>
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
      {project.tech && (
        <div className="tags">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
      <span className="card-more">Read more →</span>
    </Link>
  );
}

export function CtaBand({ brand, title, text }: { brand: Brand; title?: string; text?: string }) {
  return (
    <div className="container">
      <section className="cta" aria-label="Get in touch">
        <div>
          <h2>{title ?? "Have something in mind?"}</h2>
          <p>{text ?? "Send a short message. We will reply in plain words, no sales pitch."}</p>
        </div>
        <Link href={href(brand, "/contact/")} className="btn btn-primary">
          Contact {brand.id === "main" ? "us" : brand.short} →
        </Link>
      </section>
    </div>
  );
}
