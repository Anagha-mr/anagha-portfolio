import { useEffect, useState } from 'react';
import { Mail, Linkedin, Github, ChevronDown, ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'projects', 'education', 'get-in-touch'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: 'Travel Planner',
      description: 'Developed a Python-based travel planner using graph algorithms (Dijkstra) to find shortest routes and visualize location networks.',
      accent: 'from-purple-600/20 to-pink-600/20',
    },
    {
      title: 'Budget Tracker',
      description: 'A budget tracker app enables users to efficiently monitor expenses and remaining budget for better financial control. Its advanced version ensures data persistence by storing entries in a JSON file, eliminating redundancy and loss',
      accent: 'from-pink-600/20 to-red-600/20',
    },
    {
      title: 'Meetrix',
      description: 'Built an intelligent meetup coordination platform (Meetrix) using geospatial algorithms and mapping APIs to compute fair central meeting points and suggest venues in real time.',
      accent: 'from-red-600/20 to-purple-600/20',
    },
    {
      title: 'Controlled Interface',
      description: 'Built a real-time hand-gesture recognition system using a neural network to control on-screen UI elements via webcam using Python, OpenCV, MediaPipe, and TensorFlow.',
      accent: 'from-purple-600/20 to-pink-600/20',
    },
  ];

  return (
    <div className="w-full bg-[#111111] text-white overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Navigation Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#720C6B] to-[#E01A9E] rounded-lg flex items-center justify-center">
                <span className="font-jacques text-lg font-bold">A</span>
              </div>
              <div className="font-jacques text-xl font-bold">Anagha MR</div>
            </div>
            <div className="hidden md:flex gap-8">
              {[
                { label: 'About', id: 'about' },
                { label: 'Projects', id: 'projects' },
                { label: 'Education', id: 'education' },
                { label: 'Get in touch', id: 'get-in-touch' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-inter text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-[#E01A9E]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#720C6B]/5 via-transparent to-[#3A0C0C]/5 pointer-events-none" />
          
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="space-y-6">
                <h1 className="font-jacques text-6xl md:text-7xl font-bold leading-tight">
                  Portfolio
                </h1>
                <p className="font-inter text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                  AI & ML-focused Computer Science student building intelligent, user-centric applications using generative AI and computer vision. Interested in designing efficient systems that solve real-world problems.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 bg-gradient-to-r from-[#720C6B] to-[#E01A9E] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-slideInRight">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#720C6B] to-[#3A0C0C] rounded-2xl opacity-20 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border border-[#720C6B]/30 shadow-2xl">
                  <img
                    src="/2-21.webp"
                    alt="Anagha MR"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-[#720C6B]" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#720C6B]/10 via-transparent to-[#3A0C0C]/10 pointer-events-none" />
          
          <div className="max-w-4xl w-full relative z-10 space-y-12">
            <div className="space-y-6 animate-fadeInUp">
              <h2 className="font-jacques text-5xl md:text-6xl font-bold">About</h2>
              <p className="font-inter text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
                Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning, with experience building scalable, data-driven applications. Skilled in developing end-to-end systems using generative AI, computer vision, and optimization techniques to solve real-world problems.
Proficient in Python, TensorFlow, OpenCV, and modern generative AI frameworks such as Stable Diffusion, CLIP, and ControlNet, with a strong focus on system design, automation, and enhancing user experience.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3A0C0C]/5 via-transparent to-[#720C6B]/5 pointer-events-none" />
          
          <div className="max-w-7xl w-full relative z-10 space-y-12">
            <div className="space-y-4 animate-fadeInUp">
              <h2 className="font-jacques text-5xl md:text-6xl font-bold">Projects</h2>
            </div>

            {/* Horizontal Scrolling Projects */}
            <div className="animate-fadeInUp stagger-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
                {projects.map((project, i) => (
                  <div
                    key={i}
                    className={`group flex-shrink-0 bg-gradient-to-br ${project.accent} backdrop-blur-sm border border-[#720C6B]/30 rounded-xl p-8 min-w-[280px] hover:border-[#E01A9E]/60 hover-lift hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#720C6B] to-[#E01A9E] rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-jacques text-2xl font-bold mb-4 group-hover:text-[#E01A9E] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-inter text-gray-300 leading-relaxed text-sm">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#720C6B]/5 via-transparent to-[#3A0C0C]/5 pointer-events-none" />
          
          <div className="max-w-4xl w-full relative z-10 space-y-12">
            <div className="space-y-4 animate-fadeInUp">
              <h2 className="font-jacques text-5xl md:text-6xl font-bold">Education</h2>
            </div>

            <div className="space-y-6 animate-fadeInUp stagger-1">
              {[
                {
                  degree: 'Bachelor of Technology in Computer Science & Engineering (AI & ML)',
                  school: 'RNS Institute of Technology, Bengaluru',
                  year: 'Expected Graduation: 2027',
                  cgpa: 'CGPA: 9.06',
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
              ].map((edu, i) => (
                <div
                  key={i}
                  className="bg-[#1e1e1e]/50 backdrop-blur-sm p-8 rounded-xl border border-[#720C6B]/20 hover:border-[#E01A9E]/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <h3 className="font-jacques text-2xl font-bold mb-2 text-white">
                    {edu.degree}
                  </h3>
                  <p className="font-inter text-[#777777] mb-3">
                    {edu.school}
                  </p>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 font-inter text-sm text-gray-400">
                    <span>{edu.year}</span>
                    {edu.cgpa && <span className="text-[#E01A9E] font-semibold">{edu.cgpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="get-in-touch" className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#720C6B]/20 via-transparent to-[#3A0C0C]/20 pointer-events-none" />
          
          <div className="max-w-4xl w-full relative z-10 space-y-12 text-center">
            <div className="space-y-4 animate-fadeInUp">
              <h2 className="font-jacques text-5xl md:text-6xl font-bold">Get in touch</h2>
              <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">
                I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeInUp stagger-1">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  href: 'mailto:mr.anagha2004@gmail.com',
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/anagha-m-r-70b969276',
                },
                {
                  icon: Github,
                  label: 'GitHub',
                  href: 'https://github.com/Anagha-mr',
                },
              ].map((contact, i) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={i}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-6 rounded-xl border-2 border-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-2"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#720C6B] to-[#E01A9E] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div className="relative flex flex-col items-center gap-3">
                      <Icon className="w-8 h-8 group-hover:text-[#E01A9E] transition-colors duration-300" />
                      <span className="font-jacques text-xl font-bold group-hover:text-[#E01A9E] transition-colors duration-300">
                        {contact.label}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-[#2a2a2a] bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-inter text-sm text-gray-400">
              copyright 2026 Anagha MR.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
