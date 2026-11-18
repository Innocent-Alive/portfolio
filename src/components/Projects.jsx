import { useLayoutEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiGithub, FiExternalLink } from "react-icons/fi";
import project1 from "../assets/ecostore.png";
import project2 from "../assets/microsoft.png";
import project3 from "../assets/calculator.png";
import project4 from "../assets/sizzleindia.png";
import project5 from "../assets/rollrush.png";
import project6 from "../assets/NumzyProject.png";
import project7 from "../assets/ExpenseTracker.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const projects = [
    {
      title: "Microsoft Clone",
      description:
        "A Microsoft clone website built with vanilla HTML, CSS and JavaScript, featuring a responsive design.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: project2,
      link: "https://microsoft-clone-steel-delta.vercel.app/",
      github: "https://github.com/Innocent-Alive/Microsoft-Homepage",
    },
    {
      title: "EcoStore Web App",
      description:
        "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      image: project1,
      link: "https://ecostoreonline.onrender.com/",
      github: "https://github.com/Innocent-Alive/EcoStore",
    },
    {
      title: "Numzy",
      description:
        "A maths-based game where players solve equations to score points. Features a Python backend for logic and PostgreSQL (NeonDB) for progress tracking.",
      tech: ["React Native", "Python", "PostgreSQL", "Android"],
      image: project6,
      link: "#",
      github: "#",
    },
    {
      title: "No Exceed",
      description:
        "A comprehensive expense tracker and to-do list application for better financial and task management.",
      tech: ["TypeScript", "React Native", "Node.js", "MongoDB"],
      image: project7,
      link: "#",
      github: "#",
    },
    {
      title: "Sizzle Website",
      description:
        "A food website built with React, Tailwind, and GSAP, featuring a responsive design.",
      tech: ["React", "Tailwind", "GSAP"],
      image: project4,
      link: "https://sizzleindia.vercel.app/",
      github: "https://github.com/Innocent-Alive/Sizzle",
    },
    {
      title: "Roll Rush Game",
      description:
        "A game built with html, css and js, featuring a responsive design.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: project5,
      link: "https://roll-rush.vercel.app/",
      github: "https://github.com/Innocent-Alive/Roll-Rush",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".projects-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            refreshPriority: 5,
          },
        }
      );

      const mm = gsap.matchMedia();

      // DESKTOP (lg screens >= 1024px): Pinned Horizontal Scroll
      mm.add("(min-width: 1024px)", () => {
        const getScrollDistance = () => {
          if (!sectionRef.current) return 1000;
          return Math.max(0, sectionRef.current.scrollWidth - window.innerWidth + 100);
        };

        gsap.to(sectionRef.current, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 5,
          },
        });
      });

      // TABLET & MOBILE (< 1024px): Native smooth horizontal swipe without locking vertical scroll
      mm.add("(max-width: 1023px)", () => {
        if (sectionRef.current) {
          gsap.set(sectionRef.current, { x: 0 });
        }
      });
    }, triggerRef);

    // Ensure ScrollTrigger refreshes when images finish loading
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [projects.length]);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-background">
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center py-12 md:py-16 border-b-4 border-primary bg-news-dots relative"
      >
        <div className="container mx-auto px-4 mb-8">
          {/* Page Header */}
          <div className="flex justify-between items-end border-b-2 border-primary pb-3 projects-title">
            <h2 className="headline-serif text-3xl md:text-5xl font-black uppercase tracking-tighter text-primary">
              Latest Insights
            </h2>
            <div className="flex items-center gap-4">
              <span className="lg:hidden mono-data text-[0.6rem] font-bold text-accent animate-pulse">
                SWIPE HORIZONTALLY →
              </span>
            </div>
          </div>
        </div>

        <div 
          ref={sectionRef} 
          className="flex gap-8 px-4 md:px-[5vw] overflow-x-auto lg:overflow-x-visible pb-4 snap-x snap-mandatory lg:snap-none"
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group flex flex-col shrink-0 w-[85vw] sm:w-[380px] lg:w-[420px] pb-2 snap-start"
            >
              {/* Project Image with Silky Smooth Hover Transition */}
              <div className="border-4 border-primary p-1.5 mb-3 bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(204,0,0,1)] transition-all duration-500 ease-out">
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
              </div>
              
              {/* Title */}
              <h3 className="headline-serif text-2xl md:text-3xl font-black mb-2.5 uppercase group-hover:text-accent transition-colors duration-400 ease-out leading-[0.9] text-primary">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-primary font-bold leading-tight mb-3 text-justify line-clamp-3 text-sm opacity-90 italic border-l-2 border-primary pl-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {project.tech.map((t, i) => (
                  <span key={i} className="uppercase-label text-[0.55rem] font-black border-2 border-primary px-2.5 py-0.5 bg-neutral-100 group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-colors duration-300 ease-out">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-6 border-t-2 border-primary pt-3">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="uppercase-label text-xs font-black flex items-center gap-2 group-hover:text-accent transition-colors duration-300 ease-out"
                >
                  <FiExternalLink className="w-4 h-4" /> 
                  <span>Visit Site</span>
                </a>
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="uppercase-label text-xs font-black flex items-center gap-2 group-hover:text-accent transition-colors duration-300 ease-out border-l-2 border-primary pl-6"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>Github</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
