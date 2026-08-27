// ─────────────────────────────────────────────────────────────
// SITE CONFIG — edit this file to rebrand the entire site.
// Replace the placeholder contact details below when ready.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "NexSkill Labs",
  shortName: "NexSkill",
  tagline: "Learn Skills. Build Experience. Shape Your Future.",
  description:
    "Explore internships, training programs, live projects, and career-focused learning designed to help you become industry-ready.",
  foundedYear: 2020,

  // TODO: replace with real contact details
  contact: {
    email: "ashwini.gathekar2704@gmail.com",
    phone: "+91 96576 677950",
    phoneHref: "tel:+919657677950",
    whatsappHref: "https://wa.me/919657677950",
    addressLines: ["Pune,", "Maharashtra, India"],
    mapEmbedUrl:
      "https://www.google.com/maps?q=The%20Alchemists%20Ark%20Pvt.%20Ltd.%2C%20B-101%2C%20Signet%20Corner%20Building%2C%20Balewadi%20Phata%2C%20Baner%2C%20Pune%2C%20Maharashtra%20411045&output=embed",
  },

  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://www.linkedin.com/in/ashwini-gathekar-85050b194/",
    youtube: "https://youtube.com/",
  },

  stats: [
    { value: "15+", label: "Skilled Mentors" },
    { value: "12+", label: "Partner Cities" },
    { value: "2000+", label: "Learners Trained" },
  ],
};

export const navigation = [
  { label: "Home", to: "/" },
  { label: "NQT", to: "/nqt" },
  {
    label: "Programs",
    children: [
      { label: "Data Science", to: "/programs/data-science" },
      { label: "Full Stack Web Development", to: "/programs/web-development" },
      { label: "Digital Marketing", to: "/programs/digital-marketing" },
    ],
  },
  { label: "Internship", to: "/internship" },
  { label: "Research", to: "/research" },
  { label: "Promotions", to: "/promotions" },
  { label: "Design", to: "/design" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Careers", to: "/careers" },
];

export const footerLinks = [
  { label: "Training Programs", to: "/internship" },
  { label: "Research & Dev", to: "/research" },
  { label: "Promotions", to: "/promotions" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const testimonials = [
  {
    quote:
      "The internship gave me hands-on exposure to real problems, not just theory. My mentor pushed me to actually ship working code every week.",
    name: "Ananya R.",
    role: "Web Development Intern",
  },
  {
    quote:
      "Working on a customer segmentation project as a Data Science intern taught me more in eight weeks than a semester of lectures. Great mentorship throughout.",
    name: "Rohit S.",
    role: "Data Science Intern",
  },
  {
    quote:
      "I came in knowing the basics of Android development and left having shipped a full app. The feedback loop with mentors was fast and honest.",
    name: "Priya M.",
    role: "Android Development Intern",
  },
  {
    quote:
      "The digital marketing program was very practical — we ran actual campaigns and read actual analytics instead of just studying case studies.",
    name: "Karan V.",
    role: "Digital Marketing Intern",
  },
];
