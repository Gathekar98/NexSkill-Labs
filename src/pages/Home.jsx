import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SkillGraph from "../components/SkillGraph";
import Testimonials from "../components/Testimonials";
import { site } from "../data/site";
import { programs } from "../data/programs";

const categories = [
  { title: "Student Training", desc: "Internships and workshops led by industry practitioners, run in step with a structured curriculum.", points: ["Cohort-based bootcamps", "Data Science, ML & full-stack tracks", "Certification on completion"], to: "/internship", icon: "✦" },
  { title: "Research & Dev", desc: "Applied R&D work across emerging technology areas, done alongside our internal engineering team.", points: ["Machine learning & AI", "Applied data engineering", "Emerging tech prototyping"], to: "/research", icon: "⌘" },
  { title: "Promotions", desc: "Marketing execution for brands who want campaigns measured by outcomes, not vanity metrics.", points: ["Email & SMS campaigns", "Ad creative & media buying", "Social media management"], to: "/promotions", icon: "↗" },
];

const courseArt = [
  { image: "photo-1516321318423-f06f85e504b3", tone: "lavender", icon: "</>" },
  { image: "photo-1555949963-ff9fe0c870eb", tone: "peach", icon: "AI" },
  { image: "photo-1518770660439-4636190af475", tone: "mint", icon: "⌘" },
  { image: "photo-1519389950473-47ba0277781c", tone: "blue", icon: "◎" },
  { image: "photo-1558494949-ef010cbdcc31", tone: "peach", icon: "☁" },
  { image: "photo-1550751827-4bd374c3f58b", tone: "lavender", icon: "⌑" },
  { image: "photo-1551288049-bebda4e38f71", tone: "mint", icon: "▥" },
  { image: "photo-1555066931-4365d14bab8c", tone: "blue", icon: "{ }" },
];

export default function Home() {
  const [activeTrack, setActiveTrack] = useState("All courses");
  const courses = useMemo(() => Object.entries(programs).map(([slug, program], index) => ({ slug, program, ...courseArt[index % courseArt.length], category: /marketing/i.test(program.title) ? "Business" : "Technology" })), []);
  const visibleCourses = activeTrack === "All courses" ? courses : courses.filter((course) => course.category === activeTrack);

  return (
    <div>
      <section className="hero-section relative overflow-hidden">
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="container-px relative grid items-center gap-10 py-12 md:py-14 lg:grid-cols-[.96fr_1.04fr] lg:gap-14 lg:py-14">
          <motion.div className="hero-copy relative z-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}>
            <p className="hero-kicker"><span className="kicker-dot" /> PRACTICAL SKILLS • REAL PROJECTS</p>
            <h1 className="font-display hero-title">Learn skills.<br />Build <span className="title-highlight">what&apos;s next.</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">Practical courses, real-world projects and internship opportunities designed to turn your potential into progress.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/internship" className="btn-primary">Explore programs <span aria-hidden="true">↗</span></Link>
              <Link to="/about" className="btn-ghost">Discover NexSkill</Link>
            </div>
            <div className="hero-benefits mt-9 grid grid-cols-3 gap-3">
              {[['▣','Industry-ready','curriculum'],['✦','Hands-on','projects'],['✓','Internship','opportunities']].map(([icon,title,label]) => <div className="hero-benefit" key={title}><span>{icon}</span><p><b>{title}</b><small>{label}</small></p></div>)}
            </div>
          </motion.div>

          <motion.div className="hero-visual relative mx-auto w-full max-w-[550px]" initial={{ opacity: 0, scale: .94, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .8, delay: .1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="hero-photo-wrap"><img src="/nexskill-hero-learners-v2.png" alt="Four NexSkill learners collaborating around a laptop" className="hero-photo" /><div className="photo-wash" /></div>
            <div className="hero-sticker sticker-bottom"><span className="sticker-icon">⌂</span><span><b>Learn • Build • Grow</b><small>One connected learning journey</small></span></div>
            <div className="hero-sparkle sparkle-one">✦</div>
          </motion.div>
        </div>
        <div className="container-px pb-12"><div className="stats-ribbon mx-auto grid grid-cols-3 gap-3 md:gap-0">{site.stats.map((stat) => <div key={stat.label} className="stat-item"><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div>
      </section>

      <section className="section container-px courses-section" id="courses">
        <div className="section-heading flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow mb-3">Find your direction</p><h2 className="font-display text-3xl font-bold md:text-4xl">Skills that move you forward<span className="heading-period">.</span></h2><p className="mt-3 max-w-xl text-muted">Explore hands-on programs taught by people who do the work every day.</p></div><div className="course-filters" role="group" aria-label="Filter courses">{["All courses", "Technology", "Business"].map((track) => <button type="button" key={track} onClick={() => setActiveTrack(track)} className={`filter-chip ${activeTrack === track ? "active" : ""}`} aria-pressed={activeTrack === track}>{track}</button>)}</div></div>
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><AnimatePresence mode="popLayout">{visibleCourses.map(({ slug, program, image, tone, icon, category }) => <motion.div layout initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .25 }} key={slug}><Link to={`/programs/${slug}`} className="course-card group h-full"><div className={`course-image ${tone}`}><img src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=720&q=78`} alt="" loading="lazy" /><span className="course-mark">{icon}</span><span className="course-category">{category}</span></div><div className="course-body"><p className="course-duration">{program.duration}</p><h3>{program.title}</h3><p className="course-summary">{program.description}</p><span className="course-link">Explore course <span aria-hidden="true">↗</span></span></div></Link></motion.div>)}</AnimatePresence></motion.div>
        <div className="mt-9 text-center"><Link to="/internship" className="btn-ghost">Browse all programs <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="section container-px category-section"><div className="text-center"><p className="eyebrow mb-3">More than a classroom</p><h2 className="font-display text-3xl font-bold md:text-4xl">A place to grow your way<span className="heading-period">.</span></h2><p className="mx-auto mt-3 max-w-xl text-muted">Learn, experiment and put your ideas to work with NexSkill Labs.</p></div><div className="mt-11 grid gap-5 md:grid-cols-3">{categories.map((category) => <div key={category.title} className="category-card"><div className="category-icon">{category.icon}</div><h3>{category.title}</h3><p className="text-sm leading-relaxed text-muted">{category.desc}</p><ul>{category.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul><Link to={category.to} className="category-link">Discover more <span aria-hidden="true">↗</span></Link></div>)}</div></section>

      <section className="journey-section container-px pb-20"><div className="journey-panel"><div><p className="eyebrow mb-3">The NexSkill ecosystem</p><h2 className="font-display text-3xl font-bold md:text-4xl">A connected learning journey.</h2><p className="mt-3 max-w-lg text-muted">Courses, projects, mentors and internships work together—so every new skill moves you closer to the work you want to do.</p><Link to="/internship" className="btn-primary mt-7">Start your journey <span aria-hidden="true">↗</span></Link></div><div className="journey-graph"><SkillGraph className="w-full" /></div></div></section>

      <section className="section container-px about-section"><div className="about-panel grid items-center gap-10 lg:grid-cols-2"><div className="about-images"><img className="about-photo about-photo-main" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=82" alt="A team of learners working together" loading="lazy" /><img className="about-photo about-photo-small" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=82" alt="Student studying with a laptop" loading="lazy" /><span className="about-scribble">ideas<br />into impact <b>↗</b></span></div><div className="about-copy"><p className="eyebrow mb-3">About NexSkill Labs</p><h2 className="font-display text-3xl font-bold md:text-4xl">Real projects. Real mentors. A more confident you.</h2><p className="mt-5 leading-relaxed text-muted">{site.name} works on real business problems — automation, data pipelines, applied machine learning — and brings learners into that work directly. Our mentors help people identify problems, prototype solutions, and ship things that work, using a people-first approach rather than a purely technology-led one.</p><Link to="/about" className="btn-primary mt-7">Read our story <span aria-hidden="true">↗</span></Link></div></div></section>

      <Testimonials />
      <section className="container-px pb-20"><div className="cta-banner"><div><p className="eyebrow mb-3">Let&apos;s find your fit</p><h2 className="font-display text-3xl font-bold md:text-4xl">Your future is a skill away.</h2><p className="mt-3 text-muted">Talk with our team and find the program that feels right.</p></div><Link to="/contact" className="btn-primary">Talk to a mentor <span aria-hidden="true">↗</span></Link><span className="cta-decoration" aria-hidden="true">✳</span></div></section>
    </div>
  );
}
