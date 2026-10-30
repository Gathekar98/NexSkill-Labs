import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { programs } from "../data/programs";

const images=["photo-1555949963-ff9fe0c870eb","photo-1551288049-bebda4e38f71","photo-1460925895917-afdab827c52f","photo-1550751827-4bd374c3f58b","photo-1558494949-ef010cbdcc31","photo-1518770660439-4636190af475"];
export default function Internship(){return <div><PageHeader eyebrow="Internships & programs" title="Build the skills. Prove the work." description="Mentor-led learning paths that move beyond tutorials and into real projects, useful feedback, and portfolio-ready outcomes."/>
  <section className="section container-px"><div className="hm-path-intro"><p className="eyebrow">Choose a direction</p><h2>Nine ways to move<br/>your career forward.</h2><p>Each path combines structured learning, project work, mentor feedback, and career preparation. Start with your curiosity—we&apos;ll help with the rest.</p></div>
  <div className="hm-path-grid">{Object.entries(programs).map(([slug,p],index)=><motion.div key={slug} whileHover={{y:-9}}><Link to={`/programs/${slug}`} className="hm-path-card"><div className="hm-path-photo"><img src={`https://images.unsplash.com/${images[index%images.length]}?auto=format&fit=crop&w=900&q=82`} alt="" loading="lazy"/><span>0{index+1}</span></div><div><p>{p.duration}</p><h3>{p.title}</h3><span>Explore the path <b>↗</b></span></div></Link></motion.div>)}</div></section>
  <section className="container-px hm-final-wrap"><div className="hm-final"><div className="hm-final-glow"/><p className="eyebrow">Need a human recommendation?</p><h2>Let&apos;s find your<br/><em>best next step.</em></h2><p>Tell us what interests you and what you&apos;ve tried—we&apos;ll suggest the path that fits.</p><div><Link to="/contact" className="btn-primary">Talk to a mentor <span>↗</span></Link></div></div></section>
  </div>}
