import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Testimonials from "../components/Testimonials";
import { programs } from "../data/programs";

const courseArt=["photo-1551288049-bebda4e38f71","photo-1517180102446-f3ece451e9d8","photo-1460925895917-afdab827c52f","photo-1550751827-4bd374c3f58b","photo-1558494949-ef010cbdcc31","photo-1518770660439-4636190af475","photo-1561070791-2526d30994b5","photo-1512941937669-90a1b58e7e9c"];
const steps=[
  {n:"01",title:"Master the essentials",text:"Clear, mentor-led lessons connected to useful industry problems.",tone:"violet"},
  {n:"02",title:"Create work that proves it",text:"Turn concepts into projects you can confidently demonstrate and explain.",tone:"cyan"},
  {n:"03",title:"Take your next step",text:"Prepare your portfolio, applications, and the conversations that move you forward.",tone:"apricot"},
];

function StepIcon({index}){
  const paths=[
    <><path d="M5 7.5 12 4l7 3.5-7 3.5-7-3.5Z"/><path d="M7.5 9.1v4.2c0 1.3 2 2.7 4.5 2.7s4.5-1.4 4.5-2.7V9.1"/><path d="M19 8v5"/></>,
    <><path d="M4.5 7.5h15v10h-15z"/><path d="M8 7.5V5h8v2.5M8 12h8M12 9v6"/></>,
    <><path d="M5 18.5c2.1-4.8 5.5-8.5 10.7-11.4"/><path d="m12.5 5.5 4.1.7.7 4.1"/><path d="M5 14v4.5h4.5"/></>,
  ];
  return <svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</g></svg>;
}

export default function Home(){
  const [active,setActive]=useState("All");
  const courses=useMemo(()=>Object.entries(programs).map(([slug,program],index)=>({slug,program,image:courseArt[index%courseArt.length],category:/marketing/i.test(program.title)?"Business":"Technology"})),[]);
  const visible=active==="All"?courses.slice(0,8):courses.filter(item=>item.category===active);
  return <div className="light-home">
    <section className="light-hero">
      <img className="light-hero-bg" src="/brand/nexskill-students-hero.png" alt="Four college students discussing a project outside a modern technology campus"/>
      <div className="light-hero-overlay"/>
      <div className="container-px light-hero-inner"><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7,ease:[.22,1,.36,1]}}>
        <span className="light-kicker"><i/> Admissions open for upcoming cohorts</span>
        <h1>Build skills.<br/><em>Become more confident.</em></h1>
        <p>Practical learning, real projects, and internship experiences designed for ambitious college students.</p>
        <div className="light-hero-actions"><Link to="/internship" className="btn-primary">Explore programs <span>↗</span></Link><Link to="/about" className="light-link">How NexSkill works <span>→</span></Link></div>
      </motion.div></div>
      <div className="container-px light-proof"><div className="light-proof-card"><div><strong>2,000+</strong><span>Learners trained</span></div><div><strong>15+</strong><span>Skilled mentors</span></div><div><strong>9</strong><span>Career-focused tracks</span></div><p><b>Learn · Build · Intern · Grow</b><span>One connected journey from college to career.</span></p></div></div>
    </section>

    <section className="section container-px light-story"><div className="light-heading"><p className="eyebrow">A practical path forward</p><h2>Learning that leads<br/>to something real.</h2><p>We combine focused teaching, thoughtful feedback, and hands-on work so each new skill becomes evidence of what you can do.</p></div><div className="light-steps">{steps.map((step,index)=><article className={`light-step-card ${step.tone}`} key={step.n}><div className="light-step-top"><span>{step.n}</span></div><div className="light-step-icon"><StepIcon index={index}/></div><div className="light-step-copy"><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div></section>

    <section className="section light-programs" id="courses"><div className="container-px"><div className="light-section-row"><div><p className="eyebrow">Explore learning paths</p><h2>Choose what you want<br/>to become better at.</h2></div><div className="hm-filter" role="group" aria-label="Filter programs">{["All","Technology","Business"].map(item=><button type="button" className={active===item?"active":""} onClick={()=>setActive(item)} key={item}>{item}</button>)}</div></div><motion.div layout className="light-course-grid"><AnimatePresence mode="popLayout">{visible.map(({slug,program,image,category})=><motion.div layout initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.97}} key={slug}><Link className="light-course" to={`/programs/${slug}`}><div><img src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=82`} alt="" loading="lazy"/><span>{category}</span></div><section><small>{program.duration}</small><h3>{program.title}</h3><footer><span>{program.mode}</span><b>↗</b></footer></section></Link></motion.div>)}</AnimatePresence></motion.div><div className="light-center"><Link className="btn-ghost" to="/internship">View every program <span>→</span></Link></div></div></section>

    <section className="section container-px"><div className="light-feature"><div className="light-feature-image"><img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=84" alt="College students collaborating" loading="lazy"/><span>Real people.<br/>Useful feedback.</span></div><div className="light-feature-copy"><p className="eyebrow">More than online lessons</p><h2>Build alongside people<br/>who want you to succeed.</h2><p>Mentors help you move through uncertainty, improve your work, and understand how professionals approach real problems.</p><ul><li><span>✓</span>Weekly mentor guidance</li><li><span>✓</span>Practical project briefs</li><li><span>✓</span>Portfolio and interview support</li></ul><Link to="/about" className="light-link dark">Meet NexSkill Labs <span>→</span></Link></div></div></section>

    <Testimonials/>
    <section className="container-px light-cta-wrap"><div className="light-cta"><div><p className="eyebrow">Not sure where to begin?</p><h2>Let&apos;s find your next step.</h2><p>Tell us what interests you and we&apos;ll help you choose a suitable learning path.</p></div><Link to="/contact" className="btn-primary">Talk to a mentor <span>↗</span></Link><svg viewBox="0 0 240 100" aria-hidden="true"><path d="M8 78C38 8 70 17 98 50l20 24c17 18 35 5 57-42" fill="none" stroke="url(#cta-ribbon)" strokeWidth="13" strokeLinecap="round"/><circle cx="182" cy="21" r="10" fill="#F3A36F"/><defs><linearGradient id="cta-ribbon" x1="8" y1="78" x2="185" y2="17"><stop stopColor="#6554E8"/><stop offset=".55" stopColor="#22B8CF"/><stop offset="1" stopColor="#F3A36F"/></linearGradient></defs></svg></div></section>
  </div>;
}
