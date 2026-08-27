import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { programs } from "../data/programs";

export default function Internship() {
  return (
    <div>
      <PageHeader
        eyebrow="Internship"
        title="Internships & training programs"
        description="Structured, mentor-led programs that put you on real project work from week one — not simulations."
      />

      <section className="section container-px grid gap-6 md:grid-cols-3">
        {Object.entries(programs).map(([slug, p]) => (
          <Link
            key={slug}
            to={`/programs/${slug}#register`}
            className="card flex flex-col p-8 hover:border-violet-soft transition"
          >
            <h3 className="font-display text-xl font-semibold mb-3">{p.title}</h3>
            <p className="text-sm text-paper/70 leading-relaxed mb-6 flex-1">
              {p.description}
            </p>
            <p className="text-sm text-muted mb-1">Duration: {p.duration}</p>
            <p className="text-sm text-cyan font-semibold mt-4">View program →</p>
          </Link>
        ))}
      </section>

      <section className="container-px pb-20 md:pb-28">
        <div className="card p-10 md:p-14 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            Not sure which track fits you?
          </h2>
          <p className="text-paper/70 max-w-xl mx-auto mb-8">
            Tell us where you're starting from and where you want to go —
            we'll point you at the right program.
          </p>
          <Link to="/contact" className="btn-primary">
            Talk to a mentor
          </Link>
        </div>
      </section>
    </div>
  );
}
