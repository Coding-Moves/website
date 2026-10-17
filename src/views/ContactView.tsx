import { href, type Brand } from "@/data/brands";
import { SITE } from "@/data/site";
import BrandShell from "@/components/BrandShell";

// Netlify Forms: Netlify finds this form in the built HTML and collects
// submissions for you (Site → Forms in the Netlify dashboard). No backend needed.
export default function ContactView({ brand }: { brand: Brand }) {
  const c = brand.contact;
  const formName = `contact-${brand.id}`;
  return (
    <BrandShell brand={brand} page="contact">
      <section className="hero">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>{c.title}</h1>
            <p className="lead">{c.intro}</p>
            <div className="card" style={{ marginTop: 28 }}>
              <h3>Helpful to include</h3>
              <ul className="checklist">
                {c.helpful.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            {SITE.email && (
              <p className="fineprint" style={{ marginTop: 16 }}>
                Prefer email? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            )}
          </div>

          <form
            className="card form"
            name={formName}
            method="POST"
            action={href(brand, "/contact/thanks/")}
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value={formName} />
            <input type="hidden" name="section" value={brand.name} />
            <p className="hidden">
              <label>
                Don&apos;t fill this in: <input name="bot-field" />
              </label>
            </p>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="topic">What is this about?</label>
              <select id="topic" name="topic" defaultValue={c.topics[0]}>
                {c.topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required placeholder="Tell us in your own words…" />
            </div>
            <button type="submit" className="btn btn-primary">
              Send message →
            </button>
            <p className="fineprint">We only use your details to reply to you.</p>
          </form>
        </div>
      </section>
    </BrandShell>
  );
}
