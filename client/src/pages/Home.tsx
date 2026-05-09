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
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
            transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideRight = {
  hidden: { opacity: 0, x: 56, filter: 'blur(6px)' },
  show:   { opacity: 1, x: 0,  filter: 'blur(0px)',
            transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  show:   { opacity: 1, scale: 1,    y: 0,
            transition: { duration: 0.48, ease: EASE_OUT_EXPO } },
};

const stagger     = { hidden: {}, show: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } } };
const staggerFast = { hidden: {}, show: { transition: { staggerChildren: 0.055 } } };
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
      className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}
    >
      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } } }}
        style={{ originX: 0 }}
        className="h-px w-7 bg-gradient-to-r from-[#720C6B] to-[#E01A9E] flex-shrink-0"
      />
      <span className="font-body text-[10.5px] uppercase tracking-[0.24em] text-[#E01A9E] font-medium">
        {children}
      </span>
      {center && (
        <motion.div
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } } }}
          style={{ originX: 1 }}
          className="h-px w-7 bg-gradient-to-l from-[#720C6B] to-[#E01A9E] flex-shrink-0"
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

const SKILLS = [
  'Python', 'TensorFlow', 'OpenCV', 'Stable Diffusion',
  'CLIP', 'ControlNet', 'MediaPipe', 'React', 'TypeScript',
  'Supabase', 'SAM', 'Graph Algorithms',
];

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
    accent: 'from-violet-600/[0.13] to-pink-600/[0.13]',
    border: 'border-violet-500/20',
    iconGrad: 'from-violet-500 to-pink-500',
    glowColor: 'rgba(139,92,246,0.12)',
  },
  {
    title: 'Travel Planner',
    role: 'Developer',
    description:
      'Developed a Python-based travel planner using graph algorithms (Dijkstra) to find shortest routes and visualize location networks.',
    tech: ['Python', 'Dijkstra', 'Graph Algorithms'],
    accent: 'from-purple-600/[0.13] to-pink-600/[0.13]',
    border: 'border-purple-500/20',
    iconGrad: 'from-[#720C6B] to-[#E01A9E]',
    glowColor: 'rgba(114,12,107,0.12)',
  },
  {
    title: 'Budget Tracker',
    role: 'Developer',
    description:
      'A budget tracker enabling users to monitor expenses with data persistence, eliminating redundancy and loss through JSON-based storage.',
    tech: ['Python', 'JSON'],
    accent: 'from-pink-600/[0.13] to-rose-600/[0.13]',
    border: 'border-pink-500/20',
    iconGrad: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236,72,153,0.12)',
  },
  {
    title: 'Meetrix',
    role: 'Lead Developer',
    description:
      'Intelligent meetup coordination platform using geospatial algorithms and mapping APIs to compute fair central meeting points and suggest venues in real time.',
    tech: ['Geospatial', 'Mapping APIs', 'Algorithms'],
    accent: 'from-rose-600/[0.13] to-purple-600/[0.13]',
    border: 'border-rose-500/20',
    iconGrad: 'from-rose-500 to-purple-500',
    glowColor: 'rgba(244,63,94,0.12)',
  },
  {
    title: 'Controlled Interface',
    role: 'Developer',
    description:
      'Real-time hand-gesture recognition system using a neural network to control on-screen UI elements via webcam.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow'],
    accent: 'from-purple-600/[0.13] to-violet-600/[0.13]',
    border: 'border-purple-500/20',
    iconGrad: 'from-[#720C6B] to-violet-600',
    glowColor: 'rgba(114,12,107,0.12)',
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
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={reduceMotion
        ? { duration: 0.2 }
        : { duration: 0.6, delay: index * 0.07, ease: EASE_OUT_EXPO }}
      whileHover={reduceMotion ? {} : { y: -7, transition: { duration: 0.32, ease: EASE_OUT_EXPO } }}
      whileTap={{ scale: 0.99 }}
      onMouseMove={handleMouseMove}
      className={`card-spotlight group relative flex flex-col gap-5 bg-gradient-to-br ${project.accent} border ${project.border} rounded-2xl p-7 overflow-hidden cursor-default
        hover:border-[#E01A9E]/40 hover:shadow-xl hover:shadow-black/40
        transition-[border-color,box-shadow] duration-350`}
      style={{ '--glow': project.glowColor } as React.CSSProperties}
    >
      {/* inner glow that intensifies on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.glowColor}, transparent 70%)` }}
      />

      {/* top row: icon + badges */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.iconGrad} flex-shrink-0
            shadow-lg shadow-black/30 group-hover:shadow-xl group-hover:scale-105 transition-transform duration-300`}
        />
        <div className="flex gap-1.5 flex-wrap justify-end">
          {project.featured && (
            <span className="font-body text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-[#E01A9E]/12 border border-[#E01A9E]/30 text-[#E01A9E] font-semibold">
              Featured
            </span>
          )}
          {project.status && (
            <span className="font-body text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/22 text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
          )}
        </div>
      </div>

      {/* title block */}
      <div className="relative z-10">
        <h3 className="font-heading text-[1.3rem] font-bold leading-snug text-white/90 group-hover:text-white transition-colors duration-250">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="font-body text-xs text-[#E01A9E]/80 mt-0.5 font-medium tracking-wide">{project.subtitle}</p>
        )}
        <p className="font-body text-[11px] text-gray-600 mt-1.5 uppercase tracking-[0.12em]">{project.role}</p>
      </div>

      {/* description */}
      <p className="relative z-10 font-body text-[0.82rem] text-gray-400/90 leading-[1.72] flex-1">
        {project.description}
      </p>

      {/* tech tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 pt-1">
        {project.tech.map((tag, i) => (
          <span
            key={i}
            className="font-body text-[10px] font-medium px-2.5 py-[5px] rounded-full
              bg-white/[0.04] border border-white/[0.08] text-gray-500
              group-hover:border-white/[0.14] group-hover:text-gray-400 group-hover:bg-white/[0.06]
              transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* subtle bottom line accent */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#E01A9E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
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

  // Use simplified variants when motion is reduced
  const rv = reduceMotion ? makeReduced() : { fadeUp, fadeIn, slideRight, scaleIn };

  return (
    <div className="w-full bg-[#111111] text-white overflow-x-hidden">
      <AnimatedBackground />

      {/* grain overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.016]"
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
              ? { backgroundColor: 'rgba(12,12,12,0.78)', backdropFilter: 'blur(24px) saturate(180%)' }
              : { backgroundColor: 'rgba(0,0,0,0)',       backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: EASE_IN_OUT }}
            className={`max-w-6xl mx-auto ${scrolled ? 'border border-white/[0.07] rounded-2xl shadow-2xl shadow-black/60' : ''}`}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-[#720C6B] to-[#E01A9E] rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="relative w-9 h-9 bg-gradient-to-br from-[#720C6B] to-[#E01A9E] rounded-xl flex items-center justify-center shadow-lg shadow-purple-950/40">
                    <span className="font-heading text-base font-bold">A</span>
                  </div>
                </div>
                <span className="font-heading text-[1.1rem] font-semibold tracking-wide hidden sm:block text-white/90 group-hover:text-white transition-colors duration-200">
                  Anagha MR
                </span>
              </motion.button>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-7">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="relative font-body text-[13px] font-medium group py-1"
                  >
                    <span className={`transition-colors duration-250 ${
                      activeSection === item.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-200'
                    }`}>
                      {item.label}
                    </span>
                    {/* gradient underline */}
                    <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-[#720C6B] to-[#E01A9E] transition-all duration-300 ${
                      activeSection === item.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}>
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}>
                      <Menu className="w-5 h-5" />
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
                  transition={{ duration: 0.26, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden md:hidden border-t border-white/[0.06]"
                >
                  <div className="px-5 py-5 flex flex-col gap-5">
                    {NAV_ITEMS.map(item => (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`font-body text-sm font-medium text-left transition-colors duration-200 ${
                          activeSection === item.id ? 'text-[#E01A9E]' : 'text-gray-400 hover:text-white'
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
          className="min-h-screen flex items-center justify-center pt-28 pb-20 px-6 relative overflow-hidden"
        >
          {/* ambient radial bg */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#720C6B]/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#E01A9E]/5 rounded-full blur-[100px]" />
          </div>

          <motion.div
            style={reduceMotion ? {} : { y: heroY, opacity: heroOp }}
            className="max-w-6xl w-full relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* ─ Left: Text ─ */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="space-y-9"
              >
                <motion.div variants={rv.fadeIn} className="flex items-center gap-3">
                  <div className="h-px w-7 bg-gradient-to-r from-[#720C6B] to-[#E01A9E]" />
                  <span className="font-body text-[10.5px] uppercase tracking-[0.26em] text-[#E01A9E]">
                    AI &amp; ML Engineer
                  </span>
                </motion.div>

                <div className="space-y-5">
                  <motion.h1
                    variants={rv.fadeUp}
                    className="font-heading font-bold leading-[0.86] tracking-tight
                      text-[3.4rem] xs:text-[4rem] sm:text-[5.5rem] lg:text-[7.5rem]"
                  >
                    Port<span className="gradient-text">folio</span>
                  </motion.h1>
                  <motion.p
                    variants={rv.fadeUp}
                    className="font-body text-[0.95rem] sm:text-base text-gray-400 leading-[1.75] max-w-[420px]"
                  >
                    AI &amp; ML-focused Computer Science student building intelligent, user-centric
                    applications using generative AI and computer vision.
                  </motion.p>
                </div>

                <motion.div variants={rv.fadeUp} className="flex flex-wrap gap-3 pt-0.5">
                  {/* Primary CTA */}
                  <motion.button
                    onClick={() => scrollTo('projects')}
                    whileTap={{ scale: 0.97 }}
                    className="btn-sweep group relative px-7 py-3.5 bg-gradient-to-r from-[#720C6B] to-[#E01A9E] rounded-xl font-body font-semibold text-sm overflow-hidden shadow-lg shadow-purple-950/50 hover:shadow-[#720C6B]/50 transition-shadow duration-400"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      View My Work
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    {/* reverse gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#E01A9E] to-[#720C6B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                  </motion.button>

                  {/* Ghost CTA */}
                  <motion.button
                    onClick={() => scrollTo('get-in-touch')}
                    whileTap={{ scale: 0.97 }}
                    className="px-7 py-3.5 rounded-xl font-body font-medium text-sm border border-white/10 text-gray-400 hover:text-white hover:border-white/22 hover:bg-white/[0.04] transition-all duration-300"
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
                <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
                  {/* soft ambient glow behind image */}
                  <div aria-hidden="true" className="absolute -inset-8 bg-gradient-to-br from-[#720C6B]/20 to-[#E01A9E]/12 rounded-3xl blur-3xl" />

                  {/* animated gradient border */}
                  <div className="relative p-px rounded-2xl animated-border shadow-2xl shadow-purple-950/50">
                    <div className="rounded-[15px] overflow-hidden bg-[#111111]">
                      <img
                        src="/2-21.webp"
                        alt="Anagha MR"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                      {/* bottom fade */}
                      <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#111111]/60 to-transparent" />
                    </div>
                  </div>

                  {/* floating badge — top-right */}
                  <motion.div
                    animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                    className="absolute -top-5 -right-4 sm:-right-6 glass border border-white/[0.09] rounded-xl px-3.5 py-2.5 shadow-xl shadow-black/40"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-[7px] h-[7px] rounded-full bg-[#E01A9E]" style={{ boxShadow: '0 0 6px rgba(224,26,158,0.8)' }} />
                      <span className="font-body text-[11px] font-medium text-gray-200">AI &amp; ML</span>
                    </div>
                  </motion.div>

                  {/* floating badge — bottom-left */}
                  <motion.div
                    animate={reduceMotion ? {} : { y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.7 }}
                    className="absolute -bottom-5 -left-4 sm:-left-6 glass border border-white/[0.09] rounded-xl px-3.5 py-2.5 shadow-xl shadow-black/40"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-body text-[11px] text-gray-500">Projects</span>
                      <span className="font-heading text-sm font-bold gradient-text">5+</span>
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
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
            onClick={() => scrollTo('about')}
          >
            <span className="font-body text-[9.5px] uppercase tracking-[0.25em] text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
              Scroll
            </span>
            <motion.div
              animate={reduceMotion ? {} : { y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-[#720C6B]/70 group-hover:text-[#E01A9E] transition-colors duration-300" />
            </motion.div>
          </motion.button>

          <div className="section-divider" />
        </section>

        {/* ══════════════════ ABOUT ════════════════════════════ */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center py-28 px-6 relative overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#720C6B]/7 to-transparent" />
          </div>

          <SectionReveal className="max-w-4xl w-full relative z-10">
            <SectionLabel>About Me</SectionLabel>

            <motion.h2
              variants={rv.fadeUp}
              className="font-heading text-[3.4rem] sm:text-[4.2rem] lg:text-[4.8rem] font-bold mb-9 leading-[0.94]"
            >
              About
            </motion.h2>

            <motion.div variants={rv.fadeUp} className="max-w-3xl space-y-5 mb-10">
              <p className="font-body text-[1rem] text-gray-300 leading-[1.82]">
                Computer Science undergraduate specialising in Artificial Intelligence and Machine Learning,
                with experience building scalable, data-driven applications. Skilled in developing end-to-end
                systems using generative AI, computer vision, and optimisation techniques to solve real-world problems.
              </p>
              <p className="font-body text-[1rem] text-gray-400/90 leading-[1.82]">
                Proficient in Python, TensorFlow, OpenCV, and modern generative AI frameworks such as
                Stable Diffusion, CLIP, and ControlNet, with a strong focus on system design, automation,
                and enhancing user experience.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div variants={staggerFast} className="flex flex-wrap gap-2">
              {SKILLS.map((skill, i) => (
                <motion.span
                  key={i}
                  variants={rv.scaleIn}
                  className="font-body text-[11px] font-medium px-3.5 py-1.5 rounded-full
                    border border-[#720C6B]/22 text-gray-500 bg-[#720C6B]/6
                    hover:bg-[#720C6B]/15 hover:border-[#E01A9E]/40 hover:text-gray-300
                    transition-all duration-300 cursor-default select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </SectionReveal>

          <div className="section-divider" />
        </section>

        {/* ══════════════════ PROJECTS ═════════════════════════ */}
        <section id="projects" className="py-28 px-6 relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3A0C0C]/5 to-transparent" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <SectionReveal className="mb-14">
              <SectionLabel>Work</SectionLabel>
              <motion.h2
                variants={rv.fadeUp}
                className="font-heading text-[3.4rem] sm:text-[4.2rem] lg:text-[4.8rem] font-bold leading-[0.94]"
              >
                Projects
              </motion.h2>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
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
          className="min-h-screen flex items-center justify-center py-28 px-6 relative overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#720C6B]/6 to-transparent" />
          </div>

          <div className="max-w-4xl w-full relative z-10">
            <SectionReveal className="mb-14">
              <SectionLabel>Academic</SectionLabel>
              <motion.h2
                variants={rv.fadeUp}
                className="font-heading text-[3.4rem] sm:text-[4.2rem] lg:text-[4.8rem] font-bold leading-[0.94]"
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
                  style={{ background: 'linear-gradient(to bottom, #720C6B, rgba(224,26,158,0.3) 60%, transparent)' }}
                />

                <div className="space-y-4">
                  {EDUCATION.map((edu, i) => (
                    <motion.div
                      key={i}
                      variants={rv.fadeUp}
                      className="relative group"
                    >
                      {/* timeline dot */}
                      <div className="absolute -left-[34px] top-7 w-2.5 h-2.5 rounded-full ring-2 ring-[#111111] group-hover:ring-[#720C6B]/25 transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #720C6B, #E01A9E)' }}
                      />

                      <motion.div
                        whileHover={reduceMotion ? {} : { y: -3, transition: { duration: 0.28, ease: EASE_OUT_EXPO } }}
                        className="glass border border-[#720C6B]/15 rounded-2xl p-7
                          hover:border-[#E01A9E]/32 hover:shadow-lg hover:shadow-black/40
                          transition-[border-color,box-shadow] duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2.5">
                          <div>
                            <h3 className="font-heading text-[1.15rem] font-bold text-white/90 leading-snug">
                              {edu.degree}
                            </h3>
                            {edu.field && (
                              <p className="font-body text-sm text-[#E01A9E]/80 mt-1 font-medium">{edu.field}</p>
                            )}
                          </div>
                          {edu.cgpa && (
                            <span className="shrink-0 self-start font-body text-[11px] font-semibold px-3 py-1.5 rounded-full border text-[#E01A9E]"
                              style={{ background: 'rgba(224,26,158,0.08)', borderColor: 'rgba(224,26,158,0.25)' }}
                            >
                              {edu.cgpa}
                            </span>
                          )}
                        </div>
                        <p className="font-body text-[13px] text-gray-500 mb-1">{edu.school}</p>
                        <p className="font-body text-[11px] text-gray-600">{edu.year}</p>
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
          className="min-h-screen flex items-center justify-center py-28 px-6 relative overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#720C6B]/8 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#720C6B]/10 via-transparent to-[#3A0C0C]/10" />
          </div>

          <div className="max-w-2xl w-full relative z-10 text-center">
            <SectionReveal>
              <SectionLabel center>Let's Connect</SectionLabel>

              <motion.h2
                variants={rv.fadeUp}
                className="font-heading text-[3.4rem] sm:text-[4.2rem] lg:text-[4.8rem] font-bold mb-5 leading-[0.94]"
              >
                Get in touch
              </motion.h2>

              <motion.p
                variants={rv.fadeUp}
                className="font-body text-[0.95rem] text-gray-400 leading-[1.75] max-w-sm mx-auto mb-14"
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
                      whileHover={reduceMotion ? {} : { y: -6, transition: { duration: 0.3, ease: EASE_OUT_EXPO } }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex flex-col items-center gap-4 px-8 py-8 rounded-2xl
                        border border-white/[0.07] glass overflow-hidden
                        hover:border-[#E01A9E]/35 hover:shadow-xl hover:shadow-black/50
                        transition-[border-color,box-shadow] duration-300"
                    >
                      {/* hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#720C6B]/7 to-[#E01A9E]/7 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                      {/* icon container */}
                      <div className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                        bg-gradient-to-br from-[#720C6B]/15 to-[#E01A9E]/15 border border-[#720C6B]/22
                        group-hover:border-[#E01A9E]/40 group-hover:from-[#720C6B]/25 group-hover:to-[#E01A9E]/25"
                      >
                        <Icon className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-300" />
                      </div>

                      <span className="relative font-heading text-[1.15rem] font-semibold text-white/80 group-hover:text-[#E01A9E] transition-colors duration-300">
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
        <footer className="py-8 px-6 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-[11px] text-gray-700">
              © 2026 Anagha MR. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#720C6B] to-[#E01A9E]"
                style={{ boxShadow: '0 0 6px rgba(224,26,158,0.5)' }}
              />
              <span className="font-body text-[11px] text-gray-700">Portfolio</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
