import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import RegistrationForm from "../components/RegistrationForm";
import ApplicationForm from "../components/ApplicationForm";
import { fees } from "../data/fees";
import { programs } from "../data/programs";

const programImages = {
  "data-science":"photo-1551288049-bebda4e38f71", "web-development":"photo-1517180102446-f3ece451e9d8",
  "digital-marketing":"photo-1460925895917-afdab827c52f", cybersecurity:"photo-1550751827-4bd374c3f58b",
  "cloud-computing":"photo-1558494949-ef010cbdcc31", devops:"photo-1618401471353-b98afee0b2eb",
  "ui-ux-design":"photo-1561070791-2526d30994b5", "mobile-development":"photo-1512941937669-90a1b58e7e9c",
  "java-backend":"photo-1515879218367-8466d910aaa4",
};

export default function ProgramPage(){
  const {slug}=useParams(); const program=programs[slug];
  if(!program) return <Navigate to="/internship" replace/>;
  const image=programImages[slug]||programImages["web-development"];
  return <div className="hm-program-page">
    <section className="hm-program-hero"><div className="hm-program-orb"/><div className="container-px hm-program-hero-grid">
      <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}}><p className="eyebrow">{program.eyebrow}</p><h1>{program.title}</h1><p>{program.description}</p><div className="hm-program-meta"><span><small>Duration</small>{program.duration}</span><span><small>Format</small>{program.mode}</span></div><a href="#register" className="btn-primary">Apply for this program <span>↗</span></a></motion.div>
      <motion.div className="hm-program-hero-image" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.85,delay:.1}}><img src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=1200&q=86`} alt=""/><div className="hm-program-badge"><strong>Project-led</strong><span>mentor supported</span></div></motion.div>
    </div></section>
    <section className="section container-px hm-program-content"><div><p className="eyebrow">Your learning toolkit</p><h2>Skills you&apos;ll use,<br/>not just study.</h2><div className="hm-skill-grid">{program.skills.map((skill,index)=><motion.div whileHover={{y:-6}} key={skill}><span>{String(index+1).padStart(2,"0")}</span><p>{skill}</p></motion.div>)}</div></div>
      <aside className="hm-outcome-panel"><p className="eyebrow">What you leave with</p><h3>Proof of progress.</h3><ul>{program.outcomes.map(item=><li key={item}><span>✓</span>{item}</li>)}</ul><div className="hm-outcome-quote">“Build something you&apos;ll be proud to explain in your next interview.”</div></aside>
    </section>
    <section id="register" className="container-px hm-register-section"><div className="hm-register-copy"><p className="eyebrow">Take the next step</p><h2>Curious today.<br/><em>More confident tomorrow.</em></h2><p>Share your details and our team will contact you with the program schedule, payment process, and answers to your questions.</p></div><div>{fees[slug]?<RegistrationForm context={slug}/>:<ApplicationForm defaultProgram={program.title}/>}</div></section>
  </div>;
}
