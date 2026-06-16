import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { Mail, Linkedin, Github, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

// ─── Easing ──────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT  = [0.42, 0, 0.58, 1] as const;

// ─── Animation Variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
            transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.65, ease: 'easeOut' } },
};

const slideRight = {
  hidden: { opacity: 0, x: 48, filter: 'blur(6px)' },
  show:   { opacity: 1, x: 0,  filter: 'blur(0px)',
            transition: { duration: 0.95, ease: EASE_OUT_EXPO } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, y: 6 },
  show:   { opacity: 1, scale: 1,   y: 0,
            transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

const stagger     = { hidden: {}, show: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } } };
const staggerFast = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const staggerSlow = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };

// ─── Reduced-motion safe variants ────────────────────────────
function makeReduced() {
  const simple = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { duration: 0.3 } },
  };
  return { fadeUp: simple, fadeIn: simple, slideRight: simple, scaleIn: simple };
}

// ─── SectionReveal ───────────────────────────────────────────
function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  return (
    <motion.div
      ref={ref}
      variants={{ ...stagger, show: { transition: { staggerChildren: 0.10, delayChildren: delay } } }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────
function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <motion.div
      variants={fadeIn}
      className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}
    >
      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.65, ease: EASE_OUT_EXPO } } }}
        style={{ originX: 0 }}
        className="h-px w-10 bg-gradient-to-r from-[#7B337E] to-[#6667AB] flex-shrink-0"
      />
      <span className="font-body text-[10.5px] uppercase tracking-[0.24em] text-[#6667AB] font-medium">
        {children}
      </span>
      {center && (
        <motion.div
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.65, ease: EASE_OUT_EXPO } } }}
          style={{ originX: 1 }}
          className="h-px w-10 bg-gradient-to-l from-[#7B337E] to-[#6667AB] flex-shrink-0"
        />
      )}
    </motion.div>
  );
}

// ─── Static Data ──────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'About',     id: 'about' },
  { label: 'Projects',  id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact',   id: 'get-in-touch' },
];

const SKILL_GROUPS = [
  {
    label: 'AI & GenAI Systems',
    skills: [
      'Stable Diffusion', 'ControlNet', 'CLIP', 'SAM', 'OpenCV',
      'Temporal RAG', 'LLM Integration', 'Vector Databases', 'Streamlit',
    ],
    pill: 'border-[#7B337E]/22 bg-[#7B337E]/8 hover:bg-[#7B337E]/16 hover:border-[#7B337E]/45',
  },
  {
    label: 'Frontend & Product',
    skills: ['React', 'Next.js', 'TypeScript', 'SaaS Development', 'Product Development'],
    pill: 'border-[#6667AB]/24 bg-[#6667AB]/8 hover:bg-[#6667AB]/16 hover:border-[#6667AB]/45',
  },
  {
    label: 'Backend & Infrastructure',
    skills: ['Supabase', 'PostgreSQL', 'REST APIs', 'Workflow Automation', 'Notification Systems', 'Real-time Systems'],
    pill: 'border-[#9B6EAB]/24 bg-[#9B6EAB]/8 hover:bg-[#9B6EAB]/16 hover:border-[#9B6EAB]/48',
  },
] as const;

const PROJECTS = [
  {
    title: 'AI Interior Designer',
    subtitle: 'AR + GenAI',
    role: 'Lead Developer',
    status: 'Ongoing',
    featured: true,
    description:
      'Developing an AI-powered AR interior design app using CLIP, Stable Diffusion + ControlNet, SAM, and Supabase to generate intelligent room layouts and interactive design visualizations.',
    tech: ['CLIP', 'Stable Diffusion', 'ControlNet', 'SAM', 'Supabase'],
    iconGrad: 'from-[#7B337E] to-[#6667AB]',
    glowColor: 'rgba(123,51,126,0.18)',
  },
  {
    title: 'Project Flow',
    subtitle: 'Project Management App',
    role: 'Developer',
    status: 'Ongoing',
    description:
      'Built a SaaS project management platform for small teams using Next.js, React, and Supabase, with workflow automation plus WhatsApp/email notifications for smarter team coordination.',
    tech: ['Next.js', 'React', 'Supabase', 'WhatsApp API'],
    iconGrad: 'from-[#6667AB] to-[#7B337E]',
    glowColor: 'rgba(102,103,171,0.18)',
  },
  {
    title: 'News Story Tracker',
    subtitle: 'Temporal RAG',
    role: 'Developer | 2026',
    description:
      'Built a Temporal RAG system that tracks how news narratives evolve over time, combining ChromaDB and sentence-transformer embeddings with Groq Llama 3.3 to generate grounded, citation-backed analyses, deployed with Streamlit.',
    tech: ['ChromaDB', 'Sentence Transformers', 'Groq API', 'RAG', 'Streamlit'],
    iconGrad: 'from-[#6667AB] to-[#9B6EAB]',
    glowColor: 'rgba(102,103,171,0.16)',
  },
  {
    title: 'Travel Planner',
    role: 'Developer',
    description:
      'Developed a Python-based travel planner using graph algorithms (Dijkstra) to find shortest routes and visualize location networks.',
    tech: ['Python', 'Dijkstra', 'Graph Algorithms'],
    iconGrad: 'from-[#7B337E] to-[#420D4B]',
    glowColor: 'rgba(123,51,126,0.14)',
  },
  {
    title: 'Budget Tracker',
    role: 'Developer',
    description:
      'A budget tracker enabling users to monitor expenses with data persistence, eliminating redundancy and loss through JSON-based storage.',
    tech: ['Python', 'JSON'],
    iconGrad: 'from-[#9B6EAB] to-[#6667AB]',
    glowColor: 'rgba(155,110,171,0.15)',
  },
  {
    title: 'Meetrix',
    role: 'Lead Developer',
    description:
      'Intelligent meetup coordination platform using geospatial algorithms and mapping APIs to compute fair central meeting points and suggest venues in real time.',
    tech: ['Geospatial', 'Mapping APIs', 'Algorithms'],
    iconGrad: 'from-[#420D4B] to-[#7B337E]',
    glowColor: 'rgba(66,13,75,0.22)',
  },
  {
    title: 'Controlled Interface',
    role: 'Developer',
    description:
      'Real-time hand-gesture recognition system using a neural network to control on-screen UI elements via webcam.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow'],
    iconGrad: 'from-[#7B337E] to-[#6667AB]',
    glowColor: 'rgba(102,103,171,0.14)',
  },
] as const;

const EDUCATION = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering (AI & ML)',
    school: 'RNS Institute of Technology, Bengaluru',
    year: 'Expected Graduation: 2027',
    cgpa: '9.06 CGPA',
  },
  {
    degree: 'State Board Pre-University',
    school: 'Base PU Integrated College',
    year: 'Graduation: 2023',
  },
  {
    degree: 'ICSE Board School',
    school: 'Clarence Public School',
    year: 'Graduation: 2021',
  },
];

const CONTACTS = [
  { icon: Mail,     label: 'Email',    href: 'mailto:mr.anagha2004@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anagha-m-r-70b969276' },
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/Anagha-mr' },
];

// ─── Project Card ─────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: typeof PROJECTS[number];
  index: number;
  reduceMotion: boolean;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top)  / rect.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={reduceMotion
        ? { duration: 0.2 }
        : { duration: 0.65, delay: index * 0.08, ease: EASE_OUT_EXPO }}
      whileHover={reduceMotion ? {} : { y: -6, transition: { duration: 0.35, ease: EASE_OUT_EXPO } }}
      whileTap={{ scale: 0.99 }}
      onMouseMove={handleMouseMove}
      className="card-spotlight group relative flex flex-col gap-5
        glass border border-[#7B337E]/16 rounded-2xl p-7 overflow-hidden cursor-default
        hover:border-[#6667AB]/28 hover:shadow-2xl hover:shadow-[#210635]/70
        transition-[border-color,box-shadow] duration-300"
    >
      {/* always-on subtle top tint */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none rounded-t-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-400"
        style={{ background: `linear-gradient(180deg, ${project.glowColor}, transparent)` }}
      />

      {/* mouse-tracking radial glow (full-card) */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% -10%, ${project.glowColor}, transparent 65%)` }}
      />

      {/* top row: icon + badges */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.iconGrad} flex-shrink-0
            shadow-lg shadow-[#210635]/60 group-hover:scale-105 transition-transform duration-300`}
        />
        <div className="flex gap-1.5 flex-wrap justify-end">
          {project.featured && (
            <span className="font-body text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full
              bg-[#6667AB]/10 border border-[#6667AB]/28 text-[#6667AB] font-semibold">
              Featured
            </span>
          )}
          {project.status && (
            <span className="font-body text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full
              bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
          )}
        </div>
      </div>

      {/* title block */}
      <div className="relative z-10">
        <h3 className="font-heading text-[1.25rem] font-bold leading-snug text-[#F5D5E0]/90 group-hover:text-[#F5D5E0] transition-colors duration-300">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="font-body text-[11px] text-[#6667AB] mt-1 font-medium tracking-wide">{project.subtitle}</p>
        )}
        <p className="font-body text-[10.5px] text-[#F5D5E0]/40 mt-1.5 uppercase tracking-[0.12em]">{project.role}</p>
      </div>

      {/* description */}
      <p className="relative z-10 font-body text-[0.82rem] text-[#F5D5E0]/60 leading-[1.75] flex-1">
        {project.description}
      </p>

      {/* tech tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {project.tech.map((tag, i) => (
          <span
            key={i}
            className="font-body text-[10px] font-medium px-2.5 py-1.5 rounded-full
              bg-[#F5D5E0]/4 border border-[#F5D5E0]/8 text-[#F5D5E0]/45
              group-hover:border-[#F5D5E0]/14 group-hover:text-[#F5D5E0]/62
              transition-all duration-350"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-px
        bg-gradient-to-r from-transparent via-[#6667AB]/22 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function Home() {
  const reduceMotion = useReducedMotion() ?? false;

  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      const ids = ['home', 'about', 'projects', 'education', 'get-in-touch'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 130) setActiveSection(id);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const rv = reduceMotion ? makeReduced() : { fadeUp, fadeIn, slideRight, scaleIn };

  return (
    <div className="w-full bg-[#210635] text-[#F5D5E0] overflow-x-hidden">
      <AnimatedBackground />

      {/* grain overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10">

        {/* ══════════════════ NAVIGATION ═══════════════════════ */}
        <nav aria-label="Site navigation" className="fixed top-0 left-0 right-0 z-50 px-4 pt-3.5">
          <motion.div
            initial={false}
            animate={scrolled
              ? {
                  backgroundColor: 'rgba(20,3,38,0.88)',
                  backdropFilter:  'blur(28px) saturate(160%)',
                  borderColor:     'rgba(123,51,126,0.20)',
                  boxShadow:       '0 20px 40px -12px rgba(33,6,53,0.80)',
                }
              : {
                  backgroundColor: 'rgba(0,0,0,0)',
                  backdropFilter:  'blur(0px)',
                  borderColor:     'rgba(123,51,126,0)',
                  boxShadow:       '0 0px 0px 0px rgba(33,6,53,0)',
                }}
            transition={{ duration: 0.45, ease: EASE_IN_OUT }}
            className="max-w-6xl mx-auto rounded-2xl border"
          >
            <div className="px-5 py-3.5 flex justify-between items-center">
              {/* Logo */}
              <motion.button
                onClick={() => scrollTo('home')}
                aria-label="Go to top"
                className="flex items-center gap-3 group"
                whileTap={{ scale: 0.97 }}
              >
                <div className="relative w-9 h-9 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7B337E] to-[#6667AB] rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-350" />
                  <div className="relative w-9 h-9 bg-gradient-to-br from-[#7B337E] to-[#6667AB] rounded-xl flex items-center justify-center">
                    <span className="font-heading text-[15px] font-bold text-[#F5D5E0]">A</span>
                  </div>
                </div>
                <span className="font-heading text-[1.05rem] font-semibold tracking-wide hidden sm:block text-[#F5D5E0]/75 group-hover:text-[#F5D5E0] transition-colors duration-250">
                  Anagha MR
                </span>
              </motion.button>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="relative font-body text-[13px] font-medium group py-1"
                  >
                    <span className={`transition-colors duration-300 ${
                      activeSection === item.id
                        ? 'text-[#F5D5E0]'
                        : 'text-[#F5D5E0]/45 group-hover:text-[#F5D5E0]/82'
                    }`}>
                      {item.label}
                    </span>
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r from-[#7B337E] to-[#6667AB]"
                      style={{ originX: 0 }}
                      animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                    />
                  </button>
                ))}
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center text-[#F5D5E0]/48 hover:text-[#F5D5E0] transition-colors duration-250"
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <X className="w-[18px] h-[18px]" />
                    </motion.span>
                  ) : (
                    <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <Menu className="w-[18px] h-[18px]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden md:hidden border-t border-[#7B337E]/14"
                >
                  <div className="px-5 py-5 flex flex-col gap-5">
                    {NAV_ITEMS.map(item => (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`font-body text-sm font-medium text-left transition-colors duration-250 ${
                          activeSection === item.id ? 'text-[#6667AB]' : 'text-[#F5D5E0]/48 hover:text-[#F5D5E0]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* ══════════════════ HERO ═════════════════════════════ */}
        <section
          id="home"
          ref={heroRef}
          className="min-h-screen flex items-center justify-center pt-28 pb-24 px-6 relative overflow-hidden"
        >
          {/* ambient radial bg */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-[520px] h-[520px] bg-[#7B337E]/8 rounded-full blur-[140px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[380px] h-[380px] bg-[#6667AB]/7 rounded-full blur-[110px]" />
          </div>

          <motion.div
            style={reduceMotion ? {} : { y: heroY, opacity: heroOp }}
            className="max-w-6xl w-full relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* ─ Left: Text ─ */}
              <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">
                <motion.div variants={rv.fadeIn} className="flex items-center gap-3.5">
                  <div className="h-px w-10 bg-gradient-to-r from-[#7B337E] to-[#6667AB]" />
                  <span className="font-body text-[10.5px] uppercase tracking-[0.28em] text-[#6667AB]">
                    AI &amp; ML Engineer
                  </span>
                </motion.div>

                <div className="space-y-6">
                  <motion.h1
                    variants={rv.fadeUp}
                    className="font-heading font-bold leading-[0.88] tracking-tight
                      text-[3.4rem] xs:text-[4rem] sm:text-[5.5rem] lg:text-[7.5rem]"
                  >
                    Port<span className="gradient-text">folio</span>
                  </motion.h1>
                  <motion.p
                    variants={rv.fadeUp}
                    className="font-body text-[0.95rem] sm:text-[1rem] text-[#F5D5E0]/62 leading-[1.78] max-w-[400px]"
                  >
                    AI &amp; ML-focused Computer Science student building intelligent, user-centric
                    applications using generative AI and computer vision.
                  </motion.p>
                </div>

                <motion.div variants={rv.fadeUp} className="flex flex-wrap gap-3">
                  {/* Primary CTA */}
                  <motion.button
                    onClick={() => scrollTo('projects')}
                    whileTap={{ scale: 0.97 }}
                    className="btn-sweep group relative px-7 py-3.5 bg-gradient-to-r from-[#7B337E] to-[#6667AB]
                      rounded-xl font-body font-semibold text-sm text-[#F5D5E0] overflow-hidden
                      shadow-lg shadow-[#210635]/60 hover:shadow-[#7B337E]/35 transition-shadow duration-400"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      View My Work
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6667AB] to-[#7B337E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  </motion.button>

                  {/* Ghost CTA */}
                  <motion.button
                    onClick={() => scrollTo('get-in-touch')}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3.5 rounded-xl font-body font-medium text-sm
                      border border-[#F5D5E0]/10 text-[#F5D5E0]/52
                      hover:text-[#F5D5E0]/90 hover:border-[#F5D5E0]/20 hover:bg-[#F5D5E0]/[0.04]
                      transition-all duration-300"
                  >
                    Get in touch
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* ─ Right: Image ─ */}
              <motion.div
                variants={rv.slideRight}
                initial="hidden"
                animate="show"
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[310px] sm:max-w-[350px]">
                  {/* ambient glow behind image */}
                  <div aria-hidden="true" className="absolute -inset-10 bg-gradient-to-br from-[#7B337E]/18 to-[#6667AB]/12 rounded-3xl blur-3xl" />

                  {/* animated gradient border */}
                  <div className="relative p-px rounded-2xl animated-border shadow-2xl shadow-[#210635]/70">
                    <div className="rounded-[15px] overflow-hidden bg-[#210635]">
                      <img
                        src="/2-21.webp"
                        alt="Anagha MR"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#210635]/55 to-transparent" />
                    </div>
                  </div>

                  {/* floating badge — top-right */}
                  <motion.div
                    animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                    className="absolute -top-5 -right-4 sm:-right-6 glass border border-[#F5D5E0]/10 rounded-xl px-3.5 py-2.5 shadow-xl shadow-[#210635]/50"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#6667AB] flex-shrink-0"
                        style={{ boxShadow: '0 0 6px rgba(102,103,171,0.8)' }} />
                      <span className="font-body text-[11px] font-medium text-[#F5D5E0]/80">AI &amp; ML</span>
                    </div>
                  </motion.div>

                  {/* floating badge — bottom-left */}
                  <motion.div
                    animate={reduceMotion ? {} : { y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut', delay: 0.9 }}
                    className="absolute -bottom-5 -left-4 sm:-left-6 glass border border-[#F5D5E0]/10 rounded-xl px-3.5 py-2.5 shadow-xl shadow-[#210635]/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-body text-[11px] text-[#F5D5E0]/42">Projects</span>
                      <span className="font-heading text-sm font-bold gradient-text">7+</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* scroll cue */}
          <motion.button
            aria-label="Scroll to About section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.9 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
            onClick={() => scrollTo('about')}
          >
            <span className="font-body text-[9px] uppercase tracking-[0.28em] text-[#F5D5E0]/28 group-hover:text-[#F5D5E0]/52 transition-colors duration-350">
              Scroll
            </span>
            <motion.div
              animate={reduceMotion ? {} : { y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-[#7B337E]/60 group-hover:text-[#6667AB] transition-colors duration-350" />
            </motion.div>
          </motion.button>

          <div className="section-divider" />
        </section>

        {/* ══════════════════ ABOUT ════════════════════════════ */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-[#7B337E]/6 to-transparent" />
          </div>

          <SectionReveal className="max-w-4xl w-full relative z-10">
            <SectionLabel>About Me</SectionLabel>

            <motion.h2
              variants={rv.fadeUp}
              className="font-heading text-[3.6rem] sm:text-[4.4rem] lg:text-[5rem] font-bold mb-10 leading-[0.92] text-[#F5D5E0]"
            >
              About
            </motion.h2>

            <motion.div variants={rv.fadeUp} className="max-w-[680px] space-y-5 mb-12">
              <p className="font-body text-[1rem] text-[#F5D5E0]/72 leading-[1.82]">
                Computer Science undergraduate specialising in Artificial Intelligence and Machine Learning,
                with experience building scalable, data-driven applications. Skilled in developing end-to-end
                systems using generative AI, computer vision, and optimisation techniques to solve real-world problems.
              </p>
              <p className="font-body text-[1rem] text-[#F5D5E0]/52 leading-[1.82]">
                Proficient in Python, TensorFlow, OpenCV, and modern generative AI frameworks such as
                Stable Diffusion, CLIP, and ControlNet, with a strong focus on system design, automation,
                and enhancing user experience.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div variants={stagger} className="space-y-7">
              {SKILL_GROUPS.map((group, gi) => (
                <motion.div key={gi} variants={staggerFast}>
                  <motion.h4
                    variants={rv.fadeIn}
                    className="font-body text-[10.5px] uppercase tracking-[0.2em] text-[#F5D5E0]/35 font-medium mb-3"
                  >
                    {group.label}
                  </motion.h4>
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        variants={rv.scaleIn}
                        className={`font-body text-[11px] font-medium px-3.5 py-1.5 rounded-full border
                          text-[#F5D5E0]/50 hover:text-[#F5D5E0]/82
                          transition-all duration-350 cursor-default select-none ${group.pill}`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </SectionReveal>

          <div className="section-divider" />
        </section>

        {/* ══════════════════ PROJECTS ═════════════════════════ */}
        <section id="projects" className="py-32 px-6 relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#420D4B]/6 to-transparent" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <SectionReveal className="mb-16">
              <SectionLabel>Work</SectionLabel>
              <motion.h2
                variants={rv.fadeUp}
                className="font-heading text-[3.6rem] sm:text-[4.4rem] lg:text-[5rem] font-bold leading-[0.92] text-[#F5D5E0]"
              >
                Projects
              </motion.h2>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>

          <div className="section-divider" />
        </section>

        {/* ══════════════════ EDUCATION ════════════════════════ */}
        <section
          id="education"
          className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-[#7B337E]/6 to-transparent" />
          </div>

          <div className="max-w-4xl w-full relative z-10">
            <SectionReveal className="mb-16">
              <SectionLabel>Academic</SectionLabel>
              <motion.h2
                variants={rv.fadeUp}
                className="font-heading text-[3.6rem] sm:text-[4.4rem] lg:text-[5rem] font-bold leading-[0.92] text-[#F5D5E0]"
              >
                Education
              </motion.h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="relative pl-9">
                {/* timeline spine */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-4 bottom-4 w-px"
                  style={{ background: 'linear-gradient(to bottom, #7B337E, rgba(102,103,171,0.28) 65%, transparent)' }}
                />

                <div className="space-y-4">
                  {EDUCATION.map((edu, i) => (
                    <motion.div key={i} variants={rv.fadeUp} className="relative group">
                      {/* timeline dot */}
                      <div
                        className="absolute -left-[34px] top-7 w-2.5 h-2.5 rounded-full ring-2 ring-[#210635] group-hover:ring-[#7B337E]/22 transition-all duration-350"
                        style={{ background: 'linear-gradient(135deg, #7B337E, #6667AB)' }}
                      />

                      <motion.div
                        whileHover={reduceMotion ? {} : { y: -3, transition: { duration: 0.3, ease: EASE_OUT_EXPO } }}
                        className="glass border border-[#7B337E]/16 rounded-2xl p-6
                          hover:border-[#6667AB]/30 hover:shadow-lg hover:shadow-[#210635]/50
                          transition-[border-color,box-shadow] duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-heading text-[1.1rem] font-bold text-[#F5D5E0]/90 leading-snug">
                              {edu.degree}
                            </h3>
                            {edu.field && (
                              <p className="font-body text-[13px] text-[#6667AB] mt-1 font-medium">{edu.field}</p>
                            )}
                          </div>
                          {edu.cgpa && (
                            <span
                              className="shrink-0 self-start font-body text-[11px] font-semibold px-3 py-1.5 rounded-full border text-[#6667AB]"
                              style={{ background: 'rgba(102,103,171,0.09)', borderColor: 'rgba(102,103,171,0.26)' }}
                            >
                              {edu.cgpa}
                            </span>
                          )}
                        </div>
                        <p className="font-body text-[12.5px] text-[#F5D5E0]/48 mb-1">{edu.school}</p>
                        <p className="font-body text-[11px] text-[#F5D5E0]/35">{edu.year}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="section-divider" />
        </section>

        {/* ══════════════════ CONTACT ══════════════════════════ */}
        <section
          id="get-in-touch"
          className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[280px] bg-[#7B337E]/8 rounded-full blur-[110px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B337E]/6 via-transparent to-[#420D4B]/6" />
          </div>

          <div className="max-w-2xl w-full relative z-10 text-center">
            <SectionReveal>
              <SectionLabel center>Let's Connect</SectionLabel>

              <motion.h2
                variants={rv.fadeUp}
                className="font-heading text-[3.6rem] sm:text-[4.4rem] lg:text-[5rem] font-bold mb-5 leading-[0.92] text-[#F5D5E0]"
              >
                Get in touch
              </motion.h2>

              <motion.p
                variants={rv.fadeUp}
                className="font-body text-[0.95rem] text-[#F5D5E0]/58 leading-[1.78] max-w-[340px] mx-auto mb-16"
              >
                I'm always open to hearing about new projects and opportunities.
                Feel free to reach out!
              </motion.p>

              <motion.div variants={staggerSlow} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CONTACTS.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.a
                      key={i}
                      variants={rv.scaleIn}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={reduceMotion ? {} : { y: -6, transition: { duration: 0.32, ease: EASE_OUT_EXPO } }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex flex-col items-center gap-4 px-8 py-9 rounded-2xl
                        border border-[#F5D5E0]/8 glass overflow-hidden
                        hover:border-[#6667AB]/30 hover:shadow-xl hover:shadow-[#210635]/65
                        transition-[border-color,box-shadow] duration-300"
                    >
                      {/* hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#7B337E]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                      {/* icon container */}
                      <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center
                        bg-gradient-to-br from-[#7B337E]/14 to-[#6667AB]/14 border border-[#7B337E]/20
                        group-hover:border-[#6667AB]/35 group-hover:from-[#7B337E]/22 group-hover:to-[#6667AB]/22
                        transition-all duration-350"
                      >
                        <Icon className="w-5 h-5 text-[#F5D5E0]/48 group-hover:text-[#F5D5E0] transition-colors duration-300" />
                      </div>

                      <span className="relative font-heading text-[1.05rem] font-semibold text-[#F5D5E0]/75 group-hover:text-[#6667AB] transition-colors duration-300">
                        {c.label}
                      </span>
                    </motion.a>
                  );
                })}
              </motion.div>
            </SectionReveal>
          </div>
        </section>

        {/* ══════════════════ FOOTER ═══════════════════════════ */}
        <footer className="py-8 px-6 border-t border-[#7B337E]/12">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-[11px] text-[#F5D5E0]/22">
              © 2026 Anagha MR. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#7B337E] to-[#6667AB]"
                style={{ boxShadow: '0 0 5px rgba(102,103,171,0.45)' }}
              />
              <span className="font-body text-[11px] text-[#F5D5E0]/22">Portfolio</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
