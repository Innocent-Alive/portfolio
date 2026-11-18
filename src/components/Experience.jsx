import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // Ordered in Ascending Chronological Order (2023 -> 2024 -> 2025 -> Present)
  const experiences = [
    {
      id: 1,
      company: "Independent Tech Consultant",
      position: "Full Stack & Web Developer",
      duration: "2023 - 2024",
      location: "Mumbai",
      description:
        "Engineered performant full-stack client applications, database backends, and responsive UI systems for digital brands.",
      highlights: [
        "ARCHITECTED MODERN RESPONSIVE PORTALS WITH REACT, TAILWIND CSS, AND NODE.JS",
        "DESIGNED SCALABLE RELATIONAL AND NOSQL DATABASE SCHEMAS WITH POSTGRESQL AND MONGODB",
        "STREAMLINED BUILD PIPELINES AND AUTOMATED DEPLOYMENT WORKFLOWS",
      ],
    },
    {
      id: 2,
      company: "Shree Kalam Academy",
      position: "Full Stack Developer Intern",
      duration: "2024 - 2025",
      location: "Kandivali West",
      description:
        "Worked on developing and maintaining web applications using modern JavaScript frameworks.",
      highlights: [
        "BUILT A RESPONSIVE E-COMMERCE PLATFORM USING REACT AND REDUX",
        "IMPLEMENTED RESTFUL APIS WITH NODE.JS AND EXPRESS",
        "CREATED AUTOMATED TESTING SUITES USING JEST AND CYPRESS",
      ],
    },
    {
      id: 3,
      company: "Inkstall Edutech Pvt. Ltd.",
      position: "Software Developer",
      duration: "2025 - Present",
      location: "Goregaon West",
      description:
        "Lead developer in building scalable web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
      highlights: [
        "DEVELOPED A REAL-TIME ANALYTICS DASHBOARD WITH REACT AND CHART.JS",
        "IMPLEMENTED MICROSERVICES ARCHITECTURE USING DOCKER AND KUBERNETES",
        "OPTIMIZED APPLICATION PERFORMANCE BY 40% THROUGH CODE OPTIMIZATION AND CACHING STRATEGIES",
      ],
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      // Initial States:
      // Card 0 (2023 - 2024) is visible; Cards 1 and 2 start hidden below
      gsap.set(cards[0], {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        display: "flex",
      });
      cards.slice(1).forEach((card) => {
        gsap.set(card, {
          opacity: 0,
          y: 40,
          scale: 0.96,
          pointerEvents: "none",
          display: "flex",
        });
      });

      // Master Pinned Timeline:
      // The section pins at top, stopping the heading, left column, and right column from scrolling away!
      // On scroll, the careers reveal ONE BY ONE in ascending chronological order.
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "experience-pin",
          trigger: containerRef.current,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          refreshPriority: 8,
        },
      });

      // Transition 1 -> 2:
      // Career 1 exits (0.24 - 0.36), Career 2 enters (0.28 - 0.40)
      tl.to(
        cards[0],
        {
          opacity: 0,
          y: -35,
          scale: 0.96,
          ease: "power2.inOut",
          duration: 0.12,
          pointerEvents: "none",
        },
        0.24
      );

      tl.to(
        cards[1],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.inOut",
          duration: 0.12,
          pointerEvents: "auto",
        },
        0.28
      );

      // Transition 2 -> 3:
      // Career 2 exits (0.58 - 0.70), Career 3 enters (0.62 - 0.74)
      tl.to(
        cards[1],
        {
          opacity: 0,
          y: -35,
          scale: 0.96,
          ease: "power2.inOut",
          duration: 0.12,
          pointerEvents: "none",
        },
        0.58
      );

      tl.to(
        cards[2],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.inOut",
          duration: 0.12,
          pointerEvents: "auto",
        },
        0.62
      );

      // Extended reading hold for Career 3 from 0.74 to 1.00 before unpinning
      tl.to({}, { duration: 0.26 }, 0.74);
    }, containerRef);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 bg-background border-b-4 border-primary bg-news-dots relative flex flex-col justify-center select-none"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Pinned Section Header - Stays stationary during scroll */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-3 mb-8 sm:mb-10 experience-title">
          <h2 className="headline-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-primary leading-none">
            DISPATCH: CAREER
          </h2>
          <span className="uppercase-label text-muted-text text-xs sm:text-sm font-bold tracking-widest hidden sm:block">
            PROFESSIONAL TIMELINE / VOL 26.0
          </span>
        </div>

        {/* 2-Column Split Layout: Both Left and Right stay pinned while right-side careers reveal 1-by-1 in ascending order */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Executive Summary & KPIs (Pinned in view)                    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 lg:border-r-4 lg:border-primary lg:pr-8">
            <h3 className="uppercase-label text-xs sm:text-sm font-black mb-3 text-primary tracking-widest">
              EXECUTIVE SUMMARY
            </h3>
            
            <p className="text-base sm:text-xl lg:text-2xl leading-relaxed text-primary font-bold italic mb-6 lg:mb-8 border-l-4 border-accent pl-4 sm:pl-6">
              "A documented history of building scalable solutions and driving technical excellence across diverse organizational structures."
            </p>

            {/* Key Performance Indicators Box */}
            <div className="bg-neutral-100 p-5 sm:p-7 border-4 border-primary shadow-[6px_6px_0px_0px_rgba(17,17,17,1)]">
              <span className="uppercase-label text-[0.65rem] sm:text-xs block mb-4 font-black tracking-tight border-b border-primary/40 pb-1.5">
                KEY PERFORMANCE INDICATORS
              </span>
              <ul className="space-y-3 sm:space-y-4 mono-data text-xs font-black text-primary">
                <li className="flex justify-between border-b border-primary/20 pb-1.5">
                  <span className="text-neutral-600">UPTIME S.L.A:</span> 
                  <span className="text-accent font-black">99.9%</span>
                </li>
                <li className="flex justify-between border-b border-primary/20 pb-1.5">
                  <span className="text-neutral-600">DEV VELOCITY:</span> 
                  <span>HIGH</span>
                </li>
                <li className="flex justify-between border-b border-primary/20 pb-1.5">
                  <span className="text-neutral-600">OPTIMIZATION:</span> 
                  <span className="text-accent font-black">+40%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-neutral-600">MENTORSHIP:</span> 
                  <span>ACTIVE</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Pinned Dynamic Stage - Careers Show ONE BY ONE (Ascending)  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 flex flex-col pt-2 sm:pt-4">
            
            {/* Dynamic Stage: Fixed Height Container with Staged Absolute Cards */}
            <div className="relative w-full min-h-[380px] sm:min-h-[360px] lg:min-h-[380px]">
              {experiences.map((exp, idx) => (
                <div 
                  key={exp.id} 
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="absolute inset-0 w-full flex flex-col will-change-transform"
                >
                  {/* Role Headline and Dynamic Year Chip */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div className="flex-grow">
                      <h3 className="headline-serif text-2xl sm:text-4xl lg:text-5xl font-black text-accent uppercase leading-none tracking-tight mb-2">
                        {exp.position}
                      </h3>
                      <p className="uppercase-label text-xs sm:text-sm font-black text-muted-text flex items-center gap-2">
                        <span className="text-primary font-black">{exp.company.toUpperCase()}</span>
                        <span className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
                        <span>{exp.location.toUpperCase()}</span>
                      </p>
                    </div>
                    <span className="mono-data text-xs sm:text-sm font-black border-2 border-primary px-4 py-2 bg-accent text-white self-start sm:self-auto whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Impact Description with Signature Vertical Red/Black Accent Bar */}
                  <div className="border-l-4 border-primary pl-4 sm:pl-7 mt-4 sm:mt-5">
                    <p className="text-base sm:text-lg lg:text-xl text-primary font-bold mb-5 sm:mb-6 leading-snug text-justify">
                      {exp.description}
                    </p>
                    
                    {/* Key Deliverables Bullet Points Grid */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 sm:gap-y-4">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-2.5 h-2.5 bg-accent mt-1 flex-shrink-0 shadow-xs" />
                          <span className="text-primary font-black text-[0.68rem] sm:text-[0.72rem] leading-tight uppercase tracking-tight">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;