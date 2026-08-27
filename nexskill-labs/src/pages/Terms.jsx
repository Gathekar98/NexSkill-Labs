import PageHeader from "../components/PageHeader";
import { site } from "../data/site";

export default function Terms() {
  return (
    <div>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="section container-px max-w-3xl space-y-6 text-paper/75 leading-relaxed">
        <p>
          These terms govern your use of the {site.name} website and
          programs. By using this site or enrolling in a program, you agree
          to the terms below.
        </p>
        <h2 className="font-display text-xl font-semibold text-paper">Use of the site</h2>
        <p>
          Content on this site is provided for informational purposes. You
          agree not to misuse the site, attempt unauthorized access, or
          reproduce our content without permission.
        </p>
        <h2 className="font-display text-xl font-semibold text-paper">Programs & enrollment</h2>
        <p>
          Enrollment in any internship or training program is subject to
          separate program terms shared at the time of registration,
          including schedule, fees (if any), and completion requirements.
        </p>
        <h2 className="font-display text-xl font-semibold text-paper">Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${site.contact.email}`} className="text-cyan">
            {site.contact.email}
          </a>
          .
        </p>
        <p className="text-sm text-muted">
          Placeholder terms — replace with counsel-reviewed terms before
          launch.
        </p>
      </section>
    </div>
  );
}
