import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Download,
  Copy,
  Check,
  ChevronDown,
  Code2,
  Brain,
  Sparkles,
  Layers,
  Database,
  Terminal,
  ExternalLink,
  X,
  Send,
  GraduationCap,
} from "lucide-react";

import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { MagneticButton } from "@/components/portfolio/MagneticButton";
import { Reveal, stagger, staggerItem } from "@/components/portfolio/Reveal";
import profileImg from "@/assets/profile.png";

import lumenImg from "@/assets/lumen.png";

import fraudImg from "@/assets/fraud-detection.png";

const resumeUrl = "/Sujay_Suresh_Resume.pdf";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sujay Suresh — AI & Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Sujay Suresh — AI & Full Stack Developer building intelligent software that solves real-world problems.",
      },
      { property: "og:title", content: "Sujay Suresh — AI & Full Stack Developer" },
      {
        property: "og:description",
        content: "Building intelligent software for the future.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const GITHUB = "https://github.com/sujaysuresh-tech";
const LINKEDIN = "https://www.linkedin.com/in/sujay--suresh/";
const EMAIL = "sujaysuresh365@gmail.com";

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white antialiased">
      <AnimatedBackground />


      <Nav />

      <main className="relative">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

/* ---------------- NAV ---------------- */

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];
  const sectionIds = ["top", "about", "skills", "projects", "contact"];
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allLinks = [{ href: "#top", label: "Home" }, ...links];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed left-1/2 top-4 z-40 -translate-x-1/2"
    >
      <motion.nav
        animate={{
          paddingLeft: scrolled ? 10 : 12,
          paddingRight: scrolled ? 10 : 12,
          paddingTop: scrolled ? 6 : 8,
          paddingBottom: scrolled ? 6 : 8,
          boxShadow: scrolled
            ? "0 12px 50px -12px rgba(124,58,237,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 8px 40px -12px rgba(124,58,237,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="glass-strong flex w-max items-center justify-center gap-1 rounded-full"
      >
        {allLinks.map((l, i) => {
          const id = l.href.slice(1);
          const isActive = active === id;
          return (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.35 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className={`relative rounded-full px-3 py-1.5 text-sm font-medium tracking-tight transition-colors ${
                isActive ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15 shadow-[0_0_20px_-4px_rgba(124,58,237,0.5)]"
                />
              )}
              <span className="relative">{l.label}</span>
            </motion.a>
          );
        })}
      </motion.nav>
    </motion.header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center px-6 pt-32 pb-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.35fr_1fr]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="flex flex-col items-start"
        >
          <motion.div
            variants={staggerItem}
            className="mb-6 inline-flex items-center gap-2 whitespace-nowrap rounded-full glass px-3 py-1 text-xs text-white/70"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities
          </motion.div>


          <motion.h1
            variants={staggerItem}
            className="text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-gradient"
          >
            Building intelligent
            <br />
            software for the
            <br />
            <span className="text-gradient-accent">future.</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
          >
            I'm <span className="text-white">Sujay Suresh</span> — an AI & Full Stack
            Developer building intelligent software that solves real-world problems.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" variant="primary">
              View Projects <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href={resumeUrl} download="Sujay-Suresh-Resume.pdf" target="_blank" rel="noopener" variant="ghost">
              <Download className="h-4 w-4" /> Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-10 flex items-center gap-2">
            <SocialIcon href={GITHUB} label="GitHub">
              <Github className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={LINKEDIN} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={`mailto:${EMAIL}`} label="Email">
              <Mail className="h-4 w-4" />
            </SocialIcon>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,#7c3aed_0%,transparent_60%)] opacity-40 blur-2xl" />
            
            <div className="glass-strong relative h-[280px] w-[280px] overflow-hidden rounded-full sm:h-[340px] sm:w-[340px]">
              <img
                src={profileImg}
                alt="Sujay Suresh"
                width={800}
                height={800}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </div>
          </div>


        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em]"
        >
          Scroll
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      aria-label={label}
      className="glass grid h-10 w-10 place-items-center rounded-full text-white/70 transition-all hover:-translate-y-0.5 hover:text-white hover:shadow-[0_8px_24px_-8px_rgba(124,58,237,0.5)]"
    >
      {children}
    </a>
  );
}

/* ---------------- SECTION HEADER ---------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50">
      <span className="h-px w-8 bg-white/30" />
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-gradient">
      {children}
    </h2>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  const highlights = [
    { icon: Sparkles, label: "Curious learner" },
    { icon: Brain, label: "AI enthusiast" },
    { icon: Code2, label: "Problem solver" },
    { icon: Layers, label: "Product mindset" },
    { icon: Terminal, label: "Continuous improvement" },
  ];

  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <SectionTitle>A developer who cares about the craft.</SectionTitle>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70">
            I'm an AI & Full Stack Developer passionate about building intelligent software,
            solving real-world problems, and creating modern digital experiences through
            clean engineering and thoughtful design.
          </p>
        </Reveal>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {highlights.map((h) => (
            <motion.li key={h.label} variants={staggerItem}>
              <div className="glass group flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80 transition-all hover:-translate-y-0.5 hover:bg-white/[0.08]">
                <h.icon className="h-3.5 w-3.5 text-violet-300" />
                {h.label}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------- EDUCATION ---------------- */

function Education() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionLabel>Education</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="glass mt-6 flex flex-col justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center">
            <div className="flex items-start gap-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <GraduationCap className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-tight">
                  B.Tech in Artificial Intelligence & Data Science
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  Dhanalakshmi Srinivasan College of Engineering (Anna University)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 pl-17 md:pl-0">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">CGPA</div>
                <div className="mt-1 text-2xl font-semibold">8.1</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">Years</div>
                <div className="mt-1 text-2xl font-semibold">2022–26</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */

const SKILL_GROUPS = [
  { icon: Code2, title: "Programming", items: ["Python", "Java", "JavaScript"] },
  { icon: Layers, title: "Frontend", items: ["HTML", "CSS"] },
  { icon: Terminal, title: "Backend", items: ["FastAPI", "Node.js"] },
  { icon: Database, title: "Database", items: ["MySQL"] },
  { icon: Brain, title: "AI", items: ["OpenAI API", "Gemini API"] },
  { icon: Sparkles, title: "Tools", items: ["Git", "GitHub", "VS Code", "Vercel", "Unity"] },
];

function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Skills</SectionLabel>
          <SectionTitle>The stack I build with.</SectionTitle>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_GROUPS.map((g) => (
            <motion.div key={g.title} variants={staggerItem}>
              <SkillCard icon={<g.icon className="h-4 w-4" />} title={g.title} items={g.items} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl">
      <div className="glass relative h-full rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06]">
        {/* hover glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_60%)]" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-violet-300 ring-1 ring-white/10">
              {icon}
            </div>
            <h3 className="text-sm font-medium tracking-tight text-white/90">{title}</h3>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/75"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PROJECTS ---------------- */

type Project = {
  name: string;
  category: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  caseStudy: string[];
  accent: string;
  image?: string;
};


const PROJECTS: Project[] = [
  {
    name: "Lumen",
    category: "AI Chatbot",
    description:
      "A conversational AI assistant designed for natural, context-aware interactions with a focused product surface.",
    stack: ["HTML", "CSS", "JavaScript", "Gemini API"],
    github: "https://github.com/sujaysuresh-tech/Ai-Chatbot-Lumen-",
    demo: "https://lumen-ai-chatbot.vercel.app/",
    caseStudy: [
      "Lumen is a deployed AI chatbot built end-to-end in vanilla JavaScript, powered by the Gemini 2.5 Flash API.",
      "It features a dark, glassmorphic UI with animated orbs, typing indicators, and markdown-rendered responses — all built framework-free.",
      "\n",
      "Deployed on Vercel, with documentation grounded in the live repo structure.",
    ],
    accent: "from-violet-500/20 to-fuchsia-500/10",
    image: lumenImg,

  },
  {
    name: "Insurance Fraud Detection",
    category: "Blockchain + ML",
    description:
      "A tamper-evident claims pipeline that combines classical ML for fraud signals with blockchain-anchored audit trails.",
    stack: ["Python", "Solidity", "Web3.py", "Ganache"],
    github: "https://github.com/sujaysuresh-tech/Blockchain-Based-Insurance-Verification-System",
    demo: undefined,
    caseStudy: [
      "A final-year project using blockchain to verify insurance certificate authenticity and prevent forgery.",
      "Built with Solidity smart contracts on Ethereum, tested locally via Ganache, with a Python + Web3.py backend connecting to the chain.",
      "Certificates are recorded and validated on-chain, removing reliance on a single trusted authority for verification.",
    ],
    accent: "from-blue-500/20 to-cyan-500/10",
    image: fraudImg,
  },
];

function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Selected Work</SectionLabel>
          <SectionTitle>Projects.</SectionTitle>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <ProjectCard project={p} onOpen={() => setOpen(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <CaseStudyModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group relative h-full">
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.05]">
        {/* image placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.name} preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
              <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-6xl font-semibold tracking-[-0.05em] text-white/10">
                  {project.name[0]}
                </div>
              </div>
            </>
          )}
          <div className="absolute left-4 top-4 rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-white/70">
            {project.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{project.description}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-white/70"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-2 pt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/[0.06]"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-white/90 transition hover:bg-red-500/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Live Demo
              </a>
            )}
            <button
              onClick={onOpen}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-black transition hover:bg-white/90"
            >
              Case Study <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8 shadow-[0_20px_80px_-20px_rgba(124,58,237,0.4)]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.06]"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          {project.category}
        </div>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-gradient">
          {project.name}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-white/70"
            >
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/70">
          {project.caseStudy.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/80 hover:bg-white/[0.06]"
            >
              <Github className="h-3.5 w-3.5" /> View on GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}


/* ---------------- CONTACT ---------------- */

function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

const [sending, setSending] = useState(false);
const [error, setError] = useState(false);

const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSending(true);
  setError(false);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "df06fa71-34f7-4537-b5fe-c4eada956d00",
        name: form.name,
        email: form.email,
        message: form.message,
        subject: `Portfolio contact — ${form.name || "Hello"}`,
      }),
    });
    const result = await res.json();
    if (result.success) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } else {
      setError(true);
    }
  } catch {
    setError(true);
  } finally {
    setSending(false);
  }
};

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Let's build something together.</SectionTitle>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            I'm currently open to Software Engineer, AI, ML, Full Stack, Backend, and GenAI
            roles. The fastest way to reach me is email.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div className="glass flex h-full flex-col gap-4 rounded-2xl p-6">
              <ContactRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
              />
              <ContactRow
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                value="linkedin.com/in/sujay--suresh"
                href={LINKEDIN}
              />
              <ContactRow
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                value="github.com/sujaysuresh-tech"
                href={GITHUB}
              />

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={copy}
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80 hover:bg-white/[0.08]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy email
                    </>
                  )}
                </button>
                <a
                  href={resumeUrl}
                  download="Sujay-Suresh-Resume.pdf"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
                >
                  <Download className="h-4 w-4" /> Resume
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="glass flex h-full flex-col gap-3 rounded-2xl p-6"
            >
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <div>
                <label className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-400/50 focus:bg-white/[0.04]"
                  placeholder="What are you working on?"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-60"
              >
                {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {sending ? "Sending..." : sent ? "Message sent" : error ? "Failed — try again" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-white/40">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-400/50 focus:bg-white/[0.04]"
      />
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-violet-300 ring-1 ring-white/10">
          {icon}
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</div>
          <div className="text-sm text-white/85">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
    </a>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-white/40 md:flex-row">
        <div>© {new Date().getFullYear()} Sujay Suresh. Crafted with care.</div>
        <div className="flex items-center gap-4">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-white">
            LinkedIn
          </a>
          <a href={`mailto:${EMAIL}`} className="hover:text-white">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
