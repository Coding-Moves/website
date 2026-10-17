import type { Brand } from "@/data/brands";
import BrandShell from "@/components/BrandShell";
import { CtaBand, InProgressNotice } from "@/components/Bits";

export default function AboutView({ brand }: { brand: Brand }) {
  const a = brand.about;
  return (
    <BrandShell brand={brand} page="about">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>{a.title}</h1>
          <p className="lead">{a.intro}</p>
          <InProgressNotice brand={brand} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="label">Our vision</p>
          <p className="vision">{a.vision}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="label">The story</p>
          <div className="prose">
            {a.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What we stand by</h2>
          </div>
          <div className="grid">
            {a.principles.map((p) => (
              <div key={p.title} className="card">
                <div className="dot" aria-hidden="true" />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand brand={brand} title="Want to work with us?" />
    </BrandShell>
  );
}
