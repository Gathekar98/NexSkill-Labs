import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";

const services = [
  {
    title: "Email Marketing",
    desc: "Segmented campaigns and automated sequences built around real customer behaviour.",
  },
  {
    title: "Automated SMS",
    desc: "Timely, permission-based SMS flows for updates, offers, and re-engagement.",
  },
  {
    title: "Ad Creative & Buying",
    desc: "Creative production and media buying across search and social platforms.",
  },
  {
    title: "Social Media Marketing",
    desc: "Content strategy, scheduling, and community management that ties back to goals.",
  },
];

export default function Promotions() {
  return (
    <div>
      <PageHeader
        eyebrow="Promotions"
        title="Marketing that's measured by outcomes"
        description="We plan, run, and report on campaigns the same way — with clear numbers behind every decision."
      />

      <section className="section container-px grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="card p-8">
            <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-paper/70 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

      <section className="container-px pb-20 md:pb-28">
        <h2 className="font-display text-2xl font-semibold mb-6">
          Get a campaign plan
        </h2>
        <ContactForm />
      </section>
    </div>
  );
}
