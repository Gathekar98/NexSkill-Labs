import { Link } from "react-router-dom";
import SkillGraph from "../components/SkillGraph";
import Testimonials from "../components/Testimonials";
import { site } from "../data/site";

const categories = [
  {
    title: "Student Training",
    desc: "Internships and workshops led by industry practitioners, run in step with a structured curriculum.",
    points: [
      "Cohort-based bootcamps",
      "Data Science, ML & full-stack tracks",
      "Certification on completion",
    ],
    to: "/internship",
  },
  {
    title: "Research & Dev",
    desc: "Applied R&D work across emerging technology areas, done alongside our internal engineering team.",
    points: ["Machine learning & AI", "Applied data engineering", "Emerging tech prototyping"],
    to: "/research",
  },
  {
    title: "Promotions",
    desc: "Marketing execution for brands who want campaigns measured by outcomes, not vanity metrics.",
    points: ["Email & SMS campaigns", "Ad creative & media buying", "Social media management"],
    to: "/promotions",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid-fade">
        <div className="container-px grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-5">{site.name}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08]">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-paper/70 leading-relaxed">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/internship" className="btn-primary">
                Explore Programs
              </Link>
              <Link to="/about" className="btn-ghost">
                More About What We Do
              </Link>
            </div>

            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6">
              {site.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-mono text-2xl font-semibold text-cyan">{s.value}</dd>
                  <p className="mt-1 text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </dl>
          </div>

          <SkillGraph className="w-full max-w-xl mx-auto" />
        </div>
      </section>

      {/* Explore by category */}
      <section className="section container-px">
        <p className="eyebrow mb-3">Explore by category</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12 max-w-xl">
          Three ways we work with people
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <div key={c.title} className="card flex flex-col p-8">
              <h3 className="font-display text-xl font-semibold mb-3">{c.title}</h3>
              <p className="text-sm text-paper/70 leading-relaxed mb-5">{c.desc}</p>
              <ul className="space-y-2 mb-8">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-paper/80">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-soft" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to={c.to}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:gap-3 transition-all"
              >
                Launch
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h11.5M8 1l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="section container-px border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="eyebrow mb-3">About us</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              We build products and professionals, one cohort at a time.
            </h2>
            <p className="text-paper/70 leading-relaxed mb-6">
              {site.name} works on real business problems — automation, data
              pipelines, applied machine learning — and brings learners into
              that work directly. Our mentors help people identify problems,
              prototype solutions, and ship things that work, using a
              people-first approach rather than a purely technology-led one.
            </p>
            <Link to="/about" className="btn-ghost">
              Read our story
            </Link>
          </div>
          <div className="card p-8">
            <p className="font-display text-xl leading-snug text-lilac">
              "Skills only become experience once you've used them on
              something real. That's the gap we exist to close."
            </p>
            <p className="mt-6 text-sm text-muted">— {site.name} Mentoring Team</p>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
