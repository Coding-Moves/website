import { href, type Brand } from "@/data/brands";
import { SERVICES_CONTACT } from "@/data/site";
import BrandShell from "@/components/BrandShell";
import ContactFormBehavior from "@/components/ContactFormBehavior";
import SubBrandLink from "@/components/SubBrandLink";

// Netlify Forms: Netlify finds this form in the built HTML and collects
// submissions for you (Site → Forms in the Netlify dashboard). No backend needed.
export default function ContactView({ brand }: { brand: Brand }) {
  const c = brand.contact;
  const formName = `contact-${brand.id}`;
  const replyNote = c.variant === "detailed"
    ? "We'll reply by email, usually within 1–2 working days. If you prefer a call or WhatsApp, include your number and say so in your message."
    : "We'll reply by email, usually within 1–2 working days.";
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
            id={formName}
            className="card form"
            name={formName}
            method="POST"
            action={href(brand, "/contact/thanks/")}
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value={formName} />
            <ContactFormBehavior formId={formName} queryTopics={c.queryTopics} />
            <p className="hidden">
              <label>
                Don&apos;t fill this in: <input name="bot-field" />
              </label>
            </p>
            <div className="field">
              <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
              <input id="name" name="name" autoComplete="name" placeholder="Your full name" required minLength={2} maxLength={60} aria-describedby={`${formName}-name-error`} />
              <p id={`${formName}-name-error`} className="field-error" aria-live="polite" aria-atomic="true" />
            </div>
            <div className="field">
              <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required aria-describedby={`${formName}-email-error ${formName}-email-typo`} />
              <p id={`${formName}-email-error`} className="field-error" aria-live="polite" aria-atomic="true" />
              <p id={`${formName}-email-typo`} className="field-hint" hidden>
                Did you mean <button id={`${formName}-email-fix`} type="button" className="field-suggestion" />?
              </p>
            </div>
            {c.variant === "detailed" && (
              <>
                <div className="field">
                  <label htmlFor="phone">Phone or WhatsApp (optional)</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Add a number if you prefer a call or WhatsApp" maxLength={30} aria-describedby={`${formName}-phone-error`} />
                  <p id={`${formName}-phone-error`} className="field-error" aria-live="polite" aria-atomic="true" />
                </div>
              </>
            )}
            <div className="field">
              <label htmlFor="topic">{c.variant === "detailed" ? "Project type" : "Topic"} (optional)</label>
              <select id="topic" name="topic" defaultValue="">
                <option value="">Choose if you know</option>
                {c.topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">{c.variant === "detailed" ? "Tell us about your project" : "Your message"} <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" required minLength={10} aria-describedby={`${formName}-message-error`} placeholder={c.variant === "detailed" ? "What does your business do, and what would you like to make easier?" : "Tell us what you need help with…"} />
              <p id={`${formName}-message-error`} className="field-error" aria-live="polite" aria-atomic="true" />
            </div>
            <button type="submit" className="btn btn-primary">
              Send message →
            </button>
            <p className="fineprint">{replyNote}</p>
          </form>
        </div>
      </section>
    </BrandShell>
  );
}
