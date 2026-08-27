import PageHeader from "../components/PageHeader";

const services = [
  { title: "Brand Identity", desc: "Logo systems, color, and type foundations for new and growing brands." },
  { title: "UI/UX Design", desc: "Interfaces designed around what real users do, tested before they ship." },
  { title: "Web Design", desc: "Marketing sites and product front-ends built for clarity and speed." },
  { title: "Motion & Illustration", desc: "Custom illustration and lightweight motion for product and brand work." },
];

export default function Design() {
  return (
    <div>
      <PageHeader
        eyebrow="Design"
        title="Design that does its job quietly"
        description="We design brand identities and interfaces that get out of the user's way — distinctive without being decorative."
      />

      <section className="section container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.title} className="card p-6">
            <h3 className="font-display font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-paper/70 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
