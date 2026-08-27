import PageHeader from "../components/PageHeader";

const areas = [
  "Machine Learning",
  "Artificial Intelligence",
  "Defence Technology",
  "Blockchain",
  "Humanoid Robotics",
  "Energy Systems",
  "Medical Technology",
  "E-Security",
];

export default function Research() {
  return (
    <div>
      <PageHeader
        eyebrow="Research & Dev"
        title="Applied research across emerging technology"
        description="Our R&D work is aimed at helping businesses increase productivity and innovation, applied across a set of focus areas."
      />

      <section className="section container-px">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <div key={a} className="card p-6 flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" />
              <p className="font-display font-medium">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px pb-20 md:pb-28 grid gap-8 md:grid-cols-2">
        <div className="card p-8">
          <h2 className="font-display text-xl font-semibold mb-3">How we work</h2>
          <p className="text-paper/70 leading-relaxed">
            We pair experienced engineers with motivated interns on
            time-boxed research sprints, prototyping solutions against a
            real business problem rather than a hypothetical one.
          </p>
        </div>
        <div className="card p-8">
          <h2 className="font-display text-xl font-semibold mb-3">Who it's for</h2>
          <p className="text-paper/70 leading-relaxed">
            Businesses looking for a technology partner on early-stage R&D,
            and learners who want exposure to applied, cutting-edge problem
            spaces beyond a standard internship.
          </p>
        </div>
      </section>
    </div>
  );
}
