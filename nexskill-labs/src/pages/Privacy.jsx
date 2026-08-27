import PageHeader from "../components/PageHeader";
import { site } from "../data/site";

export default function Privacy() {
  return (
    <div>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="section container-px max-w-3xl space-y-6 text-paper/75 leading-relaxed">
        <p>
          {site.name} collects the information you submit through our
          contact and registration forms — such as your name, email, and
          phone number — solely to respond to your enquiry or process your
          application.
        </p>
        <h2 className="font-display text-xl font-semibold text-paper">What we collect</h2>
        <p>
          Form submissions (name, email, phone, message) and standard
          website analytics (pages visited, general location, device type).
        </p>
        <h2 className="font-display text-xl font-semibold text-paper">How we use it</h2>
        <p>
          To respond to enquiries, process applications, and — only if you
          opt in — send occasional updates about programs and openings.
        </p>
        <h2 className="font-display text-xl font-semibold text-paper">Your choices</h2>
        <p>
          You can request access to, correction of, or deletion of your data
          at any time by emailing{" "}
          <a href={`mailto:${site.contact.email}`} className="text-cyan">
            {site.contact.email}
          </a>
          .
        </p>
        <p className="text-sm text-muted">
          Placeholder policy — replace with counsel-reviewed policy before
          launch.
        </p>
      </section>
    </div>
  );
}
