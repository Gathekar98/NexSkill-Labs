import { team } from "../data/team";

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export default function Team() {
  return (
    <section className="section container-px border-t border-line">
      <p className="eyebrow mb-3">Our mentors</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-12 max-w-xl">
        The people behind the programs
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {team.map((member) => (
          <div key={member.name} className="card p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-violet/20 border border-violet-soft font-display font-semibold text-lilac">
              {initials(member.name)}
            </div>
            <h3 className="font-display text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-cyan mb-4">{member.role}</p>
            <p className="text-sm text-paper/70 leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
