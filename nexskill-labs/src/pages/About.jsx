import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import Team from "../components/Team";
import { site } from "../data/site";

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow="About us"
        title={`We are ${site.name}`}
        description="We help people turn skills into experience, and businesses turn ideas into working solutions."
      />

      <section className="section container-px grid gap-6 sm:grid-cols-3">
        {site.stats.map((s) => (
          <div key={s.label} className="card p-8 text-center">
            <p className="font-mono text-4xl font-semibold text-cyan">{s.value}</p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="container-px pb-20 md:pb-28 grid gap-12 lg:grid-cols-2 items-start">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">
            Based in Pune, working everywhere
          </h2>
          <p className="text-paper/70 leading-relaxed mb-6">
            {site.name} aims to solve real business problems — automation,
            data pipelines, and applied data science — for the companies we
            work with. Our core team helps businesses identify problems,
            find opportunities, and prototype solutions using current tools
            like AI, machine learning, and deep learning. We take a
            people-first approach rather than a purely technology-led one,
            because the best solutions are the ones people actually use.
          </p>
          <blockquote className="border-l-2 border-violet pl-5 text-lilac font-display text-lg leading-snug">
            "Our discoveries are only worth something if they change how
            someone thinks. That's the standard we hold our work to."
          </blockquote>
          <h3 className="font-display text-xl font-semibold mt-10 mb-2">Our mission</h3>
          <p className="text-paper/70 leading-relaxed">
            To train the best available talent to solve real challenges —
            not simulated ones — and to give businesses a partner that
            understands both the technology and the people using it.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">Send us a message</h2>
          <ContactForm />
        </div>
      </section>

      <Team />
    </div>
  );
}
