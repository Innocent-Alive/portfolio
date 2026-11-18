import React, { useState, useEffect } from "react";
import { FiFileText, FiZap, FiLayout, FiCheckCircle, FiShield, FiCpu, FiTrendingUp, FiUser } from "react-icons/fi";

const leftReviews = [
  {
    quote: "Working with Abhay transformed our digital strategy. His attention to detail in the editorial UI is unparalleled in the modern web.",
    author: "Marcus Rodriguez",
    role: "CTO @ INNOVATELAB",
  },
  {
    quote: "Abhay re-architected our core cloud services to handle 100K+ concurrent requests with sub-100ms response times. Remarkable engineering depth.",
    author: "David Vance",
    role: "Head of Engineering @ Omnia Cloud",
  },
  {
    quote: "From complex database indexing to crisp front-end typography, Abhay delivers clean, bulletproof code ahead of deadline every time.",
    author: "Vikram Malhotra",
    role: "Founder & CEO @ HyperScale Media",
  },
  {
    quote: "He bridges the gap between high-level architectural thinking and obsessive micro-interaction polish. A true 10x engineering partner.",
    author: "Nathaniel Grey",
    role: "Engineering Director @ Apex Labs",
  },
];

const rightReviews = [
  {
    quote: "The speed of delivery and the robustness of the architecture was beyond our expectations. A true professional bureau experience.",
    author: "Sarah Chen",
    role: "Product Director @ TechFlow",
  },
  {
    quote: "The typography, micro-interactions, and animations feel like high-fashion print meets modern Silicon Valley web engineering.",
    author: "Elena Rostova",
    role: "VP of Design @ Neue Editorial",
  },
  {
    quote: "Abhay transformed our sluggish legacy monolith into a blazingly fast modern web app. User satisfaction scores skyrocketed immediately.",
    author: "Claire Beauchamp",
    role: "Creative Director @ Studio Atelier",
  },
  {
    quote: "Security, performance, and responsive pixel perfection—Abhay checked every single box on our mission-critical enterprise portal.",
    author: "Amina Al-Mansoor",
    role: "Principal Architect @ Qubit Core",
  },
];

const EditorialProcess = () => {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [animPhase, setAnimPhase] = useState("active"); // "active" | "exit" | "prep"

  // Automatically cycle reviews every 5 seconds
  // Left changes from top side (slides down into view from top)
  // Right changes from bottom side (slides up into view from bottom)
  useEffect(() => {
    let prepTimeout;
    let enterTimeout;

    const interval = setInterval(() => {
      // 1. Exit phase:
      // Left exits downwards (translate-y-12)
      // Right exits upwards (-translate-y-12)
      setAnimPhase("exit");

      prepTimeout = setTimeout(() => {
        // 2. Prep phase: change content and position offscreen opposite to entrance
        // Left goes to top (-translate-y-12)
        // Right goes to bottom (translate-y-12)
        setReviewIndex((prev) => (prev + 1) % leftReviews.length);
        setAnimPhase("prep");

        enterTimeout = setTimeout(() => {
          // 3. Active phase: smoothly transition into view
          // Left enters from top side (slides down to 0)
          // Right enters from bottom side (slides up to 0)
          setAnimPhase("active");
        }, 50);
      }, 450);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(prepTimeout);
      clearTimeout(enterTimeout);
    };
  }, []);

  const currentLeft = leftReviews[reviewIndex];
  const currentRight = rightReviews[reviewIndex];

  const leftAnimClasses =
    animPhase === "exit"
      ? "opacity-0 translate-y-12 transition-all duration-400 ease-in"
      : animPhase === "prep"
      ? "opacity-0 -translate-y-12 transition-none"
      : "opacity-100 translate-y-0 transition-all duration-600 ease-out";

  const rightAnimClasses =
    animPhase === "exit"
      ? "opacity-0 -translate-y-12 transition-all duration-400 ease-in"
      : animPhase === "prep"
      ? "opacity-0 translate-y-12 transition-none"
      : "opacity-100 translate-y-0 transition-all duration-600 ease-out";
  return (
    <section className="overflow-hidden">
      {/* 1. How I Work (Dark Section) */}
      <div className="bg-primary text-background py-14 lg:py-16 px-4 border-b-8 border-background relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3">
              <h2 className="headline-serif text-5xl md:text-7xl font-black mb-6 leading-tight">
                The Editorial Method
              </h2>
              <p className="uppercase-label text-xs font-black tracking-[0.3em] opacity-60 border-l-4 border-accent pl-4">
                Rapid deployment, precision craft, and unmatched strategic alignment.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  id: 1,
                  title: "Discovery & Dossier",
                  desc: "I begin by mapping your brand's digital presence and identifying technical gaps in your current architecture.",
                },
                {
                  id: 2,
                  title: "Editorial Logic",
                  desc: "We prioritize features like headlines in a newsroom. Only the most impactful user experiences make the cut.",
                },
                {
                  id: 3,
                  title: "Continuous Press",
                  desc: "Deployment is just the start. I maintain a live cycle of updates to ensure your digital platform remains cutting-edge.",
                },
              ].map((step) => (
                <div key={step.id} className="relative group">
                  <div className="w-12 h-12 bg-accent text-background flex items-center justify-center font-black text-xl mb-6 shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.4)] transition-all">
                    {step.id}
                  </div>
                  <h3 className="headline-serif text-2xl font-black mb-4 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                  {step.id < 3 && (
                    <div className="hidden md:block absolute top-6 -right-6 w-full h-[2px] bg-background/10 z-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Value Proposition (Light Section) */}
      <div className="bg-background relative bg-news-dots border-b-4 border-primary">
        <div className="container mx-auto p-2">
          <div className="border border-primary/20 flex flex-col lg:flex-row">
            {/* Illustration Column */}
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col items-center justify-center bg-primary/5 border-b lg:border-b-0 lg:border-r border-primary/20">
              <div className="relative">
                <FiFileText className="w-48 h-48 lg:w-64 lg:h-64 text-primary opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-40 border-4 border-primary bg-background shadow-[10px_10px_0px_0px_rgba(17,17,17,1)] flex flex-col p-4 animate-bounce-slow">
                     <div className="w-full h-2 bg-primary mb-2"></div>
                     <div className="w-2/3 h-2 bg-primary/20 mb-4"></div>
                     <div className="space-y-2">
                       <div className="w-full h-1 bg-primary/10"></div>
                       <div className="w-full h-1 bg-primary/10"></div>
                       <div className="w-full h-1 bg-primary/10"></div>
                       <div className="w-3/4 h-1 bg-primary/10"></div>
                     </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 text-center">
                <span className="uppercase-label text-[0.65rem] font-black tracking-widest opacity-40">FIG. 2.1 // PRODUCTIVITY_VISUALIZATION</span>
              </div>
            </div>

            {/* Benefits Column */}
            <div className="lg:w-1/2 p-12 lg:p-20">
              <span className="uppercase-label text-xs font-black text-accent bg-accent/10 px-3 py-1 mb-8 inline-block">ANALYSIS_REPORT</span>
              <h2 className="headline-serif text-4xl lg:text-5xl font-black mb-12 leading-tight">
                Why Industry Leaders Choose This Bureau
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {[
                  { id: "01", ico: FiZap, label: "Unmatched Speed", desc: "Reduce time-to-market by 40% with optimized delivery pipelines." },
                  { id: "02", ico: FiCpu, label: "Tech Precision", desc: "Clean, scalable code built for enterprise-grade performance." },
                  { id: "03", ico: FiTrendingUp, label: "Strategic ROI", desc: "Design decisions focused on conversion and user retention." },
                  { id: "04", ico: FiShield, label: "Robust Security", desc: "Proactive audit cycles to safeguard your platform's integrity." },
                ].map((item) => (
                  <div key={item.id} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                       <span className="mono-data text-accent font-black text-sm">{item.id}.</span>
                       <h4 className="uppercase-label text-sm font-black tracking-widest">
                         {item.label}
                       </h4>
                    </div>
                    <p className="text-sm text-muted-text leading-relaxed pl-8 font-medium italic">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 3. Testimonials (Dual Column with Opposing 5s Auto-Rotation) */}
      <div className="bg-background border-b-4 border-primary grid grid-cols-1 lg:grid-cols-2 text-primary">
         {/* Left Column (Changes from Top side) */}
         <div className="p-10 sm:p-12 lg:p-20 xl:p-24 border-b lg:border-b-0 lg:border-r-4 border-primary flex flex-col justify-between overflow-hidden min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] relative">
            <div className={`${leftAnimClasses} flex flex-col justify-between h-full`}>
               <div>
                  <svg className="w-12 h-12 text-accent mb-8 opacity-20 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21V18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM3.01704 21L3.01704 18C3.01704 16.8954 3.91247 16 5.01704 16H8.01704C9.12161 16 10.017 16.8954 10.017 18V21C10.017 22.1046 9.12161 23 8.01704 23H5.01704C3.91247 23 3.01704 22.1046 3.01704 21ZM3.01704 21V18C3.01704 16.8954 3.91247 16 5.01704 16H8.01704C9.12161 16 10.017 16.8954 10.017 18V21C10.017 22.1046 9.12161 23 8.01704 23H5.01704C3.91247 23 3.01704 22.1046 3.01704 21Z" transform="translate(0, -8)" />
                  </svg>
                  <p className="headline-serif text-2xl sm:text-3xl md:text-4xl font-black mb-10 leading-tight italic">
                    "{currentLeft.quote}"
                  </p>
               </div>
               <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all border-2 border-primary">
                     <FiUser className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="uppercase-label text-[0.7rem] font-black tracking-widest">{currentLeft.author}</p>
                     <p className="mono-data text-[0.6rem] font-black opacity-50">{currentLeft.role}</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Column (Changes from Bottom side) */}
         <div className="p-10 sm:p-12 lg:p-20 xl:p-24 flex flex-col justify-between bg-primary/2 overflow-hidden min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] relative">
            <div className={`${rightAnimClasses} flex flex-col justify-between h-full`}>
               <div>
                  <svg className="w-12 h-12 text-accent mb-8 opacity-20 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21V18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM3.01704 21L3.01704 18C3.01704 16.8954 3.91247 16 5.01704 16H8.01704C9.12161 16 10.017 16.8954 10.017 18V21C10.017 22.1046 9.12161 23 8.01704 23H5.01704C3.91247 23 3.01704 22.1046 3.01704 21ZM3.01704 21V18C3.01704 16.8954 3.91247 16 5.01704 16H8.01704C9.12161 16 10.017 16.8954 10.017 18V21C10.017 22.1046 9.12161 23 8.01704 23H5.01704C3.91247 23 3.01704 22.1046 3.01704 21Z" transform="translate(0, -8)" />
                  </svg>
                  <p className="headline-serif text-2xl sm:text-3xl md:text-4xl font-black mb-10 leading-tight italic">
                    "{currentRight.quote}"
                  </p>
               </div>
               <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all border-2 border-primary">
                     <FiUser className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="uppercase-label text-[0.7rem] font-black tracking-widest">{currentRight.author}</p>
                     <p className="mono-data text-[0.6rem] font-black opacity-50">{currentRight.role}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default EditorialProcess;
