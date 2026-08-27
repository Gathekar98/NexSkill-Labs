import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import { site } from "../data/site";

export default function Contact() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Have something on your mind? Reach out via the form below or through any of our channels — we'll get back to you shortly."
      />

      <section className="section container-px grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="eyebrow mb-3">Get in touch</p>
            <ul className="space-y-3 text-paper/85">
              <li>{site.contact.addressLines.join(" ")}</li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-cyan transition">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="hover:text-cyan transition">
                  {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl2 border border-line">
            <iframe
              title="Location map"
              src={site.contact.mapEmbedUrl}
              width="100%"
              height="260"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex gap-3">
            {Object.entries(site.social).map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-2 text-sm text-paper/75 hover:text-cyan hover:border-cyan transition capitalize"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
