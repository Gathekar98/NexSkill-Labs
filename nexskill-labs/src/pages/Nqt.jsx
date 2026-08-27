import PageHeader from "../components/PageHeader";
import RegistrationForm from "../components/RegistrationForm";

const steps = [
  { title: "Register", desc: "Fill in your details and complete the registration fee payment." },
  { title: "Take the assessment", desc: "A timed test covering aptitude and your chosen technical track." },
  { title: "Get your score", desc: "Receive a detailed breakdown of your strengths and gaps." },
  { title: "Get matched", desc: "Qualifying scores unlock fast-tracked entry into our internship programs." },
];

export default function Nqt() {
  return (
    <div>
      <PageHeader
        eyebrow="NQT"
        title="National Qualifier Test"
        description="A standardized assessment that benchmarks your aptitude and technical readiness — and fast-tracks qualifying candidates into our programs."
      />

      <section className="section container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="card p-6">
            <p className="font-mono text-cyan text-sm mb-3">0{i + 1}</p>
            <h3 className="font-display font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-paper/70 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

      <section id="register" className="container-px pb-20 md:pb-28 max-w-xl">
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
          Register for the NQT
        </h2>
        <RegistrationForm context="nqt" />
      </section>
    </div>
  );
}
