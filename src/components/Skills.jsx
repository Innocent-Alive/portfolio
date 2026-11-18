import { useLayoutEffect, useRef } from "react";
import {
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiLayout,
  FiServer,
} from "react-icons/fi";
import { IoIosCloudOutline } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Authentic 3D Pushpin Component
const PushPin = ({ angle = 0 }) => (
  <div 
    className="push-pin absolute -top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.35)]"
    style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
  >
    <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Needle piercing through card */}
      <path d="M14 24L14 32" stroke="#111111" strokeWidth="2.2" strokeLinecap="round" />
      {/* Shadow under metallic base */}
      <ellipse cx="14" cy="24" rx="4.5" ry="1.5" fill="rgba(0,0,0,0.25)" />
      {/* Metallic collar ring */}
      <path d="M10 24L11 20H17L18 24H10Z" fill="url(#metalGrad)" stroke="#78909C" strokeWidth="0.5" />
      {/* Plastic pin body in editorial red */}
      <path d="M11 20C11 16.5 9 14.5 9 11.5C9 7 11.2 4.5 14 4.5C16.8 4.5 19 7 19 11.5C19 14.5 17 16.5 17 20H11Z" fill="#CC0000" />
      {/* 3D dome head */}
      <ellipse cx="14" cy="5" rx="6.5" ry="3.8" fill="#D32F2F" />
      {/* Glossy curved highlight on dome */}
      <ellipse cx="13" cy="4" rx="4" ry="1.8" fill="#FF8A80" opacity="0.85" />
      <circle cx="11.5" cy="3.5" r="1.2" fill="#FFFFFF" opacity="0.95" />
      {/* Lateral shine on pin contour */}
      <path d="M12 6.5C12 9 12.5 14 13 19" stroke="#FFCDD2" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <defs>
        <linearGradient id="metalGrad" x1="10" y1="20" x2="18" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ECEFF1" />
          <stop offset="0.5" stopColor="#CFD8DC" />
          <stop offset="1" stopColor="#90A4AE" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const Skills = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const pinsRef = useRef([]);

  const skillCategories = [
    {
      id: 1,
      title: "Frontend Development",
      icon: FiLayout,
      angle: -1.5,
      skills: [
        "React.js",
        "React Native",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
        "Material-UI",
        "Shadcn UI",
        "XML",
      ],
    },
    {
      id: 2,
      title: "Backend Development",
      icon: FiServer,
      angle: 1.2,
      skills: [
        "Node.js",
        "Express.js",
        "Java",
        "Spring Boot",
        "JavaScript",
        "TypeScript",
        "PHP",
        "Python",
        "FastAPI",
      ],
    },
    {
      id: 3,
      title: "Tools & Technologies",
      icon: FiCode,
      angle: -0.8,
      skills: [
        "Visual Studio Code",
        "Eclipse",
        "Windsurf IDE",
        "Spring Tool Suite",
        "IntelliJ IDEA",
        "PyCharm",
        "Android Studio",
      ],
    },
    {
      id: 4,
      title: "Version Control",
      icon: FiGitBranch,
      angle: 1.6,
      skills: ["Git", "GitHub", "GitLab", "Bitbucket"],
    },
    {
      id: 5,
      title: "Databases",
      icon: FiDatabase,
      angle: -1.2,
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle", "SQL Server"],
    },
    {
      id: 6,
      title: "Cloud & APIs",
      icon: IoIosCloudOutline,
      angle: 0.9,
      skills: ["Docker", "Kubernetes", "Google Cloud", "AWS", "RESTful APIs"],
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================================================================
      // DESKTOP (>= 1024px): Pinned Corkboard Animation with Scrub
      // Locks screen and pins each 3D pushpin card sequentially onto the board!
      // =========================================================================
      mm.add("(min-width: 1024px)", () => {
        const cards = cardsRef.current.filter(Boolean);
        const pins = pinsRef.current.filter(Boolean);

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "skills-pin",
            trigger: containerRef.current,
            start: "top top",
            end: "+=1400",
            pin: true,
            scrub: 1, // Smooth scrub forward and backwards
            anticipatePin: 1,
            refreshPriority: 6,
          },
        });

        // Title reveals at start of pin
        tl.fromTo(
          ".skills-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" },
          0
        );

        // Sequentially pin each card and pushpin onto the broadsheet corkboard
        cards.forEach((card, idx) => {
          const pin = pins[idx];
          const targetAngle = skillCategories[idx]?.angle || 0;
          const startTime = 0.12 + idx * 0.12;

          // Card drops and lands on the board
          tl.fromTo(
            card,
            {
              y: 50,
              opacity: 0,
              scale: 0.88,
              rotation: 0,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: targetAngle,
              duration: 0.18,
              ease: "back.out(1.5)",
            },
            startTime
          );

          // Pushpin drops from above and pierces the card with bounce
          if (pin) {
            tl.fromTo(
              pin,
              {
                scale: 0,
                y: -30,
                opacity: 0,
              },
              {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.15,
                ease: "bounce.out",
              },
              startTime + 0.06
            );
          }
        });

        // Hold all pinned cards in full view before unpinning
        tl.to({}, { duration: 0.25 });
      });

      // MOBILE (< 1024px): Clean in-flow stagger pin drop as user scrolls
      mm.add("(max-width: 1023px)", () => {
        const cards = cardsRef.current.filter(Boolean);
        const pins = pinsRef.current.filter(Boolean);

        cards.forEach((card, idx) => {
          const pin = pins[idx];
          const targetAngle = skillCategories[idx]?.angle || 0;

          gsap.fromTo(
            card,
            { y: 35, opacity: 0, scale: 0.92, rotation: 0 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: targetAngle,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
                refreshPriority: 6,
              },
            }
          );

          if (pin) {
            gsap.fromTo(
              pin,
              { scale: 0, y: -15, opacity: 0 },
              {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.4,
                delay: (idx % 2) * 0.1 + 0.1,
                ease: "bounce.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  toggleActions: "play none none none",
                  refreshPriority: 6,
                },
              }
            );
          }
        });
      });
    }, containerRef);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={containerRef} 
      className="min-h-screen flex flex-col justify-center py-16 sm:py-20 md:py-24 bg-background border-b-4 border-primary relative overflow-hidden bg-news-dots select-none"
    >
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-3 mb-8 md:mb-10 skills-title">
          <div className="flex items-center gap-3">
            <h2 className="headline-serif text-3xl md:text-5xl font-black uppercase tracking-tighter text-primary leading-none">
              Technical Specs
            </h2>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-accent text-background uppercase-label text-[0.6rem] font-black">
              PINNED BOARD
            </span>
          </div>
        </div>

        {/* 6 Skill Categories Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-10 gap-x-6 lg:gap-x-8">
          {skillCategories.map((category, idx) => (
            <div
              key={category.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="skill-card relative border-4 border-primary bg-white shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] flex flex-col pt-1 transition-transform duration-300 hover:scale-[1.02] hover:z-20 will-change-transform"
            >
              {/* Attached Authentic 3D Pushpin on Top */}
              <div ref={(el) => (pinsRef.current[idx] = el)}>
                <PushPin angle={category.angle * 1.5} />
              </div>

              {/* Card Header */}
              <div className="bg-primary text-background p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <category.icon className="w-4 h-4 border-2 border-background p-0.5 text-background" />
                  <h3 className="uppercase-label text-xs font-black tracking-wider">
                    {category.title.toUpperCase()}
                  </h3>
                </div>
                <span className="mono-data text-[0.58rem] font-bold opacity-60 underline">
                  REF: 0{category.id}
                </span>
              </div>
              
              {/* Skills Items */}
              <div className="p-3.5 grid grid-cols-2 gap-2 bg-background/40">
                {category.skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="border-2 border-primary p-1.5 flex items-center gap-2 bg-white shadow-[2px_2px_0px_0px_rgba(17,17,17,0.1)]"
                  >
                    <div className="w-1.5 h-1.5 bg-primary scale-75 rotate-45 flex-shrink-0"></div>
                    <span className="mono-data text-[0.62rem] font-black uppercase overflow-hidden text-ellipsis whitespace-nowrap text-primary">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Card Footer */}
              <div className="mt-auto border-t-2 border-primary p-2 bg-neutral-100 flex justify-between items-center px-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                  <span className="uppercase-label text-[0.52rem] font-black text-primary">
                    SYSTEM_OPTIMIZED
                  </span>
                </div>
                <span className="mono-data text-[0.52rem] font-bold text-muted-text">
                  SEC // 0{category.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background Stamp */}
      <div className="absolute top-12 right-[-2%] text-[9rem] font-black text-primary/5 select-none pointer-events-none uppercase-label rotate-12">
        STACK
      </div>
    </section>
  );
};

export default Skills;