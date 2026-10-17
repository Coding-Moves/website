import { href, type Brand } from "@/data/brands";
import { SERVICES_CONTACT } from "@/data/site";
import BrandShell from "@/components/BrandShell";
import SubBrandLink from "@/components/SubBrandLink";

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
            {c.variant === "detailed" && (
              <section className="direct-contact" aria-labelledby="direct-contact-title">
                <h2 id="direct-contact-title">Talk to us directly</h2>
                <div className="direct-contact-cards">
                  <div className="card">
                    <h3>WhatsApp or call</h3>
                    {SERVICES_CONTACT.phones.map((phone) => {
                      const digits = phone.replace(/\D/g, "");
                      return (
                        <div className="direct-contact-option" key={phone}>
                          <p>{phone}</p>
                          <div className="direct-contact-actions">
                            <SubBrandLink href={`https://wa.me/${digits}`} className="btn btn-ghost">WhatsApp</SubBrandLink>
                            <a href={`tel:+${digits}`} className="btn btn-ghost">Call</a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="card">
                    <h3>Email</h3>
                    {SERVICES_CONTACT.emails.map((email) => (
                      <p className="direct-contact-email" key={email}>
                        <a href={`mailto:${email}?subject=${encodeURIComponent("Project inquiry: Coding Moves Services")}`}>{email}</a>
                      </p>
                    ))}
                  </div>
                </div>
              </section>
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
