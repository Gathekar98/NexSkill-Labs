import { useParams, Link, Navigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import RegistrationForm from "../components/RegistrationForm";
import { programs } from "../data/programs";

export default function ProgramPage() {
  const { slug } = useParams();
  const program = programs[slug];

  if (!program) return <Navigate to="/internship" replace />;

  return (
    <div>
      <PageHeader
        eyebrow={program.eyebrow}
        title={program.title}
        description={program.description}
      />

      <section className="section container-px grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">
              What you'll learn
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {program.skills.map((s) => (
                <li key={s} className="card flex items-start gap-3 p-4 text-sm text-paper/85">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold mb-4">
              What you'll walk away with
            </h2>
            <ul className="space-y-3">
              {program.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-paper/85">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
                    <circle cx="10" cy="10" r="10" fill="#7C3AED" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="#fff" strokeWidth="1.6" />
                  </svg>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="card sticky top-24 h-fit p-6 space-y-5">
          <div>
            <p className="eyebrow mb-1">Duration</p>
            <p className="text-paper/85">{program.duration}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">Format</p>
            <p className="text-paper/85">{program.mode}</p>
          </div>
          <a href="#register" className="btn-primary w-full justify-center">
            Apply for this program
          </a>
          <Link to="/contact" className="btn-ghost w-full justify-center">
            Ask a question
          </Link>
        </aside>
      </section>

      <section id="register" className="container-px pb-20 md:pb-28 max-w-xl">
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
          Register for this program
        </h2>
        <RegistrationForm context={slug} />
      </section>
    </div>
  );
}
