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
            <ContactFormBehavior formId={formName} brandShort={brand.short} />
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
                  <label htmlFor="phone">WhatsApp / phone</label>
                  <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+92 3xx xxxxxxx" aria-describedby={`${formName}-phone-hint ${formName}-phone-error`} />
                  <p id={`${formName}-phone-hint`} className="field-hint" hidden>Please add your number so we can reach you</p>
                  <p id={`${formName}-phone-error`} className="field-error" aria-live="polite" aria-atomic="true" />
                </div>
                <fieldset className="field contact-method">
                  <legend>Best way to reach you <span aria-hidden="true">*</span></legend>
                  <div className="contact-method-options">
                    <label><input type="radio" name="contact_method" value="Email" defaultChecked required /> Email</label>
                    <label><input type="radio" name="contact_method" value="WhatsApp" /> WhatsApp</label>
                    <label><input type="radio" name="contact_method" value="Call" /> Call</label>
                  </div>
                </fieldset>
              </>
            )}
            <div className="field">
              <label htmlFor="topic">What do you need? <span aria-hidden="true">*</span></label>
              <select id="topic" name="topic" defaultValue="" required aria-describedby={`${formName}-topic-error`}>
                <option value="" disabled>Choose a topic</option>
                {c.topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <p id={`${formName}-topic-error`} className="field-error" aria-live="polite" aria-atomic="true" />
            </div>
            <div className="field">
              <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" required minLength={10} aria-describedby={`${formName}-message-error`} placeholder="Tell us what you need help with…" />
              <p id={`${formName}-message-error`} className="field-error" aria-live="polite" aria-atomic="true" />
            </div>
            <button type="submit" className="btn btn-primary">
              Send message →
            </button>
            <p className="fineprint">We&apos;ll reply by email (or WhatsApp if you choose it), usually within 1–2 working days.</p>
          </form>
        </div>
      </section>
    </BrandShell>
  );
}
