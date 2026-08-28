import PageHeader from "../components/PageHeader";
import ApplicationForm from "../components/ApplicationForm";

const openings = [
  { role: "Data Science Intern", type: "Internship · Remote" },
  { role: "Full Stack Developer Intern", type: "Internship · Remote / Bengaluru" },
  { role: "Digital Marketing Intern", type: "Internship · Remote" },
  { role: "UI/UX Design Intern", type: "Internship · Remote" },
];

export default function Careers() {
  return (
    <div>
      <PageHeader
        eyebrow="Careers"
        title="Build your experience with us"
        description="We're always looking for curious, self-driven people to join our internship cohorts. Apply below and tell us what you want to work on."
      />

      <section className="section container-px grid gap-10 lg:grid-cols-2">
        <div className="min-w-0 space-y-4">
          {openings.map((o) => (
            <div key={o.role} className="card flex items-center justify-between p-6">
              <div>
                <p className="font-display font-semibold">{o.role}</p>
                <p className="text-sm text-muted">{o.type}</p>
              </div>
              <a href="#apply" className="btn-ghost text-sm py-2">
                Apply
              </a>
            </div>
          ))}
        </div>

        <div id="apply" className="min-w-0">
          <h2 className="font-display text-2xl font-semibold mb-4">Apply now</h2>
          <ApplicationForm />
        </div>
      </section>
    </div>
  );
}
