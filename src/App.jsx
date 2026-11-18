import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import EditorialProcess from "./components/EditorialProcess";
import FAQ from "./components/FAQ";
import logo from "./assets/logoBlack.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isSepia, setIsSepia] = useState(() => {
    return localStorage.getItem("sepiaMode") === "true";
  });
  const [loading, setLoading] = useState(true);
  const stageRef = useRef(null);
  const newspaperRef = useRef(null);
  const tvFrameRef = useRef(null);
  const tvScreenRef = useRef(null);
  const mobileScreenRef = useRef(null);
  const broadcastScreenRef = useRef(null);
  const mobileBroadcastScreenRef = useRef(null);
  const tvPageScreenRef = useRef(null);
  const mobilePageScreenRef = useRef(null);
  const navbarWrapperRef = useRef(null);

  // 5 dynamic breaking news headlines changing smoothly every 3 seconds
  const headlines = [
    "TRANSFORMING THE WAY YOUR IDEAS WORK",
    "ENGINEERING SCALABLE FULL-STACK SYSTEMS",
    "ARCHITECTING MODERN DIGITAL EXPERIENCES",
    "TURNING COMPLEX LOGIC INTO ELEGANT CODE",
    "DELIVERING HIGH-IMPACT WEB & CLOUD SOLUTIONS",
  ];
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [headlineAnimState, setHeadlineAnimState] = useState("in");

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setHeadlineAnimState("out");
      setTimeout(() => {
        setHeadlineIndex((prev) => (prev + 1) % headlines.length);
        setHeadlineAnimState("in");
      }, 350);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading, headlines.length]);

  useEffect(() => {
    if (isSepia) {
      document.documentElement.classList.add("sepia-mode");
    } else {
      document.documentElement.classList.remove("sepia-mode");
    }
  }, []);

  useEffect(() => {
    if (isSepia) {
      document.documentElement.classList.add("sepia-mode");
    } else {
      document.documentElement.classList.remove("sepia-mode");
    }
    localStorage.setItem("sepiaMode", isSepia);
  }, [isSepia]);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const getInitialScale = () => {
    if (typeof window === "undefined") return 0.46;
    const w = window.innerWidth;
    const isMobile = w < 768;
    const screenEl = isMobile ? mobileScreenRef.current : tvScreenRef.current;
    const fullWidth = newspaperRef.current?.offsetWidth || w;
    const fullHeight = newspaperRef.current?.offsetHeight || 750;

    if (screenEl && screenEl.offsetWidth > 0 && fullWidth > 0) {
      const scaleX = (screenEl.offsetWidth * 0.98) / fullWidth;
      const screenH = screenEl.offsetHeight;
      const scaleY = fullHeight > 0 && screenH > 0 ? (screenH * 0.98) / fullHeight : scaleX;
      // Guarantee the newspaper fits 100% inside both width and height of the TV screen
      return Math.min(scaleX, scaleY);
    }

    if (w < 480) return 0.28;
    if (w < 768) return 0.35;
    if (w < 1024) return 0.42;
    return 0.46;
  };

  useLayoutEffect(() => {
    if (loading) return;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const initialScale = getInitialScale();

      // 1. Initial State:
      // The TV/Phone Breaking News Broadcast Screen starts 100% visible
      gsap.set([broadcastScreenRef.current, mobileBroadcastScreenRef.current], {
        opacity: 1,
        scale: 1,
      });

      // The Portfolio page preview inside the TV starts hidden (fades in on scroll)
      gsap.set([tvPageScreenRef.current, mobilePageScreenRef.current], {
        opacity: 0,
        scale: 0.98,
      });

      // The real broadsheet newspaper (in foreground stage) starts hidden at initialScale
      // It stays hidden while the page is resting inside the TV, and activates at the throw
      gsap.set(newspaperRef.current, {
        scale: initialScale,
        rotation: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        opacity: 0,
        filter: "blur(0px)",
        transformOrigin: "50% 50%",
      });

      if (navbarWrapperRef.current) {
        gsap.set(navbarWrapperRef.current, {
          opacity: 0,
          y: -30,
          pointerEvents: "none",
        });
      }

      // =========================================================================
      // Multi-Stage Smooth Scroll Timeline:
      // Stage 1 (0% - 10%): TV displays Breaking News broadcast with rotating headlines
      // Stage 2 (10% - 26%): Breaking news broadcast smoothly crossfades into portfolio page INSIDE the TV
      // Stage 3 (26% - 38%): Portfolio page rests proudly INSIDE the TV screen (0 spillage, perfectly contained)
      // Stage 4 (38% - 86%): TV screen goes black as page bursts 360° OUT of the TV screen towards viewer
      // Stage 5 (86% - 100%): Page lands flush on screen with recoil bounce; sticky navbar docks
      // =========================================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 1, // Buttery smooth scroll scrub forward & backwards
          anticipatePin: 1,
          refreshPriority: 10,
          onUpdate: (self) => {
            if (tvFrameRef.current) {
              tvFrameRef.current.style.visibility = self.progress > 0.78 ? "hidden" : "visible";
            }
            if (navbarWrapperRef.current) {
              navbarWrapperRef.current.style.pointerEvents = self.progress > 0.85 ? "auto" : "none";
            }
          },
        },
      });

      // Step 1: Breaking news broadcast screen crossfades into the portfolio page INSIDE the TV!
      tl.to(
        [broadcastScreenRef.current, mobileBroadcastScreenRef.current],
        {
          opacity: 0,
          scale: 0.96,
          ease: "power2.inOut",
          duration: 0.16,
        },
        0.08
      );

      tl.to(
        [tvPageScreenRef.current, mobilePageScreenRef.current],
        {
          opacity: 1,
          scale: 1,
          ease: "power2.inOut",
          duration: 0.16,
        },
        0.10
      );

      // (Between 0.26 and 0.38: The page rests proudly INSIDE the TV screen with zero spillage!)

      // Step 2: "and then should come out of it then only it will be a smoother transition"
      // The TV screen goes black OLED as the broadsheet newspaper launches OUT of the TV!
      tl.to(
        [tvPageScreenRef.current, mobilePageScreenRef.current],
        {
          opacity: 0,
          scale: 0.97,
          ease: "power1.in",
          duration: 0.06,
        },
        0.38
      );

      // Real broadsheet newspaper takes flight from the TV screen
      tl.fromTo(
        newspaperRef.current,
        {
          opacity: 0,
          scale: initialScale,
          rotation: 0,
          z: 0,
        },
        {
          opacity: 1,
          duration: 0.04,
          ease: "none",
        },
        0.38
      );

      // 360° rotate throw and scale up to full screen
      tl.to(
        newspaperRef.current,
        {
          scale: 1,
          rotation: -360,
          ease: "power2.out",
          duration: 0.48,
        },
        0.38
      );

      // 3D perspective tilt as it flies through the air
      tl.fromTo(
        newspaperRef.current,
        {
          rotateX: 0,
          rotateY: 0,
        },
        {
          rotateX: 18,
          rotateY: -12,
          duration: 0.24,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        },
        0.38
      );

      // As the site lifts out of the TV, the TV behind it recedes into black
      tl.to(
        tvFrameRef.current,
        {
          opacity: 0,
          scale: 0.68,
          ease: "power2.inOut",
          duration: 0.35,
        },
        0.40
      );

      // Step 3: Paper recoil slap bounce as it lands flush on the screen (86% - 94%)
      tl.to(
        newspaperRef.current,
        {
          y: -8,
          scale: 1.01,
          duration: 0.05,
          ease: "power2.out",
        },
        0.86
      );
      tl.to(
        newspaperRef.current,
        {
          y: 0,
          scale: 1,
          duration: 0.05,
          ease: "power2.in",
        },
        0.91
      );

      // Box shadow flushes flat as it integrates into document flow
      tl.to(
        newspaperRef.current,
        {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          duration: 0.08,
          ease: "power1.out",
        },
        0.89
      );

      // Step 4: Sticky Navbar docks into place smoothly (82% - 98%)
      if (navbarWrapperRef.current) {
        tl.to(
          navbarWrapperRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.16,
          },
          0.82
        );
      }
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 200);

    const handleResize = () => {
      if (window.scrollY < 50) {
        const newScale = getInitialScale();
        gsap.set(newspaperRef.current, { scale: newScale });
      }
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-background bg-news-dots font-body transition-colors duration-700 overflow-x-clip">
      {loading && <Loader onComplete={handleLoaderComplete} />}

      {/* Fixed Sticky Navbar for the entire portfolio */}
      <div 
        ref={navbarWrapperRef} 
        className="fixed top-0 left-0 w-full z-50 pointer-events-none"
      >
        <Navbar />
      </div>

      {/* Centered Device Stage: Modern Smartphone on Mobile (< 768px), Modern Smart TV on Desktop/Tablet (>= 768px) */}
      <div 
        ref={tvFrameRef}
        className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none select-none px-4"
      >
        {/* ========================================================================= */}
        {/* MOBILE SMARTPHONE DEVICE FRAME (< 768px screens)                         */}
        {/* ========================================================================= */}
        <div className="md:hidden flex flex-col items-center justify-center relative">
          {/* Smartphone Chassis - centered on screen */}
          <div className="w-[min(80vw,280px)] aspect-[9/18.5] max-h-[60vh] bg-[#0c0c0c] rounded-[44px] p-2 border-[4px] border-neutral-700/90 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)] relative flex flex-col items-center justify-between z-10">
            {/* Left Volume Button Notches */}
            <div className="absolute -left-[6px] top-16 w-[3px] h-7 bg-neutral-600 rounded-l-sm" />
            <div className="absolute -left-[6px] top-26 w-[3px] h-7 bg-neutral-600 rounded-l-sm" />
            {/* Right Power Button Notch */}
            <div className="absolute -right-[6px] top-20 w-[3px] h-10 bg-neutral-600 rounded-r-sm" />

            {/* Smartphone Display Screen (Pure Black OLED Base) */}
            <div 
              ref={mobileScreenRef}
              className="w-full h-full rounded-[36px] bg-[#060606] border border-neutral-800 relative overflow-hidden flex flex-col items-center justify-between shadow-inner"
            >
              {/* Dynamic Island Pill */}
              <div className="w-22 h-4.5 bg-black rounded-full mt-2 z-30 flex items-center justify-between px-2.5 shadow-sm border border-neutral-800/80">
                <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
              </div>

              {/* Pure Black OLED Base (revealed when paper leaves phone) */}
              <div className="absolute inset-0 bg-[#060606] flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 rounded-full bg-neutral-900/40 blur-2xl pointer-events-none" />
              </div>

              {/* 1. Mobile Breaking News Broadcast Screen (Initial State) */}
              <div 
                ref={mobileBroadcastScreenRef}
                className="absolute inset-0 bg-[#fbf9f5] text-primary flex flex-col justify-between pt-8 pb-3 px-3 select-none z-10 will-change-transform"
              >
                {/* Top Tag */}
                <div className="flex justify-between items-center border-b border-primary/20 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <img src={logo} alt="Logo" className="h-3.5 w-auto grayscale contrast-125" />
                    <span className="mono-data text-[0.48rem] font-black text-primary">LIVE // CH-01</span>
                  </div>
                  <span className="mono-data text-[0.48rem] font-black text-accent uppercase tracking-widest">• SPECIAL BROADCAST</span>
                </div>

                {/* Center Content: Rotating Headline */}
                <div className="flex flex-col items-center text-center my-auto px-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span className="uppercase-label text-accent font-black text-[0.52rem] tracking-widest">
                      BREAKING NEWS
                    </span>
                  </div>
                  <div className="h-16 flex items-center justify-center overflow-hidden">
                    <h2 
                      className={`headline-serif text-sm sm:text-base font-black uppercase tracking-tight text-primary leading-tight transition-all duration-300 ease-out ${
                        headlineAnimState === "in" 
                          ? "opacity-100 translate-y-0" 
                          : "opacity-0 -translate-y-2"
                      }`}
                    >
                      {headlines[headlineIndex]}
                    </h2>
                  </div>
                  <p className="mono-data text-[0.48rem] font-bold text-neutral-600 tracking-wider mt-2 uppercase">
                    ABHAY KUMAR DAS // FULL-STACK
                  </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-center text-[0.48rem] mono-data font-bold text-neutral-600 border-t border-primary/20 pt-1">
                  <span>EDITION 2026</span>
                  <span className="text-primary font-black uppercase tracking-wider">SCROLL TO READ ↓</span>
                  <span className="text-accent font-black">● ON</span>
                </div>
              </div>

              {/* 2. Mobile Portfolio Page INSIDE the Phone Screen (Fades in on scroll) */}
              <div 
                ref={mobilePageScreenRef}
                className="absolute inset-0 bg-[#fbf9f5] text-primary flex flex-col justify-between pt-8 pb-3 px-3 select-none z-15 will-change-transform opacity-0 overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b border-primary/25 pb-1">
                  <div className="flex items-center gap-1">
                    <img src={logo} alt="Logo" className="h-3 w-auto grayscale contrast-125" />
                    <span className="uppercase-label text-[0.45rem] font-black tracking-wider text-primary">THE DIGITAL DISPATCH</span>
                  </div>
                  <span className="mono-data text-[0.42rem] font-bold text-accent">VOL. 024</span>
                </div>

                {/* Main Content */}
                <div className="flex flex-col text-center my-auto px-1">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-xs bg-accent animate-pulse" />
                    <span className="uppercase-label text-accent font-black text-[0.48rem] tracking-wider">
                      Breaking Development
                    </span>
                  </div>
                  <h3 className="headline-serif text-sm font-black uppercase tracking-tight text-primary leading-tight">
                    TRANSFORMING THE WAY YOUR <span className="italic text-accent">IDEAS</span> WORK
                  </h3>
                  <p className="text-[0.46rem] text-primary/80 leading-snug mt-1 line-clamp-3">
                    Abhay Kumar Das builds scalable web applications & intuitive digital experiences.
                  </p>
                  <div className="flex justify-center gap-1.5 mt-2">
                    <span className="bg-primary text-background px-2.5 py-0.5 uppercase-label text-[0.45rem] font-black">
                      START COLLABORATION
                    </span>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="border-t border-primary/20 pt-1">
                  <div className="flex justify-around text-center">
                    <div>
                      <p className="headline-serif text-xs font-black">3+ YRS</p>
                      <p className="uppercase-label text-[0.4rem] text-muted-text">EXP</p>
                    </div>
                    <div>
                      <p className="headline-serif text-xs font-black">99.9%</p>
                      <p className="uppercase-label text-[0.4rem] text-muted-text">UPTIME</p>
                    </div>
                    <div>
                      <p className="headline-serif text-xs font-black">25+</p>
                      <p className="uppercase-label text-[0.4rem] text-muted-text">BUILDS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ambient Glass Reflections & Subtle Scanlines */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20 rounded-[36px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.06)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />

              {/* Bottom Home Indicator Bar */}
              <div className="w-24 h-1 bg-neutral-500/80 rounded-full mb-1.5 z-30" />
            </div>
          </div>

          {/* Smartphone Soft Floor Shadow */}
          <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none w-max">
            <div className="w-40 h-3 bg-black/40 blur-md rounded-full mx-auto" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET MODERN SMART TV FRAME (>= 768px screens)                 */}
        {/* ========================================================================= */}
        <div className="hidden md:flex flex-col items-center relative">
          {/* Modern Slim Bezel TV Frame - centered on screen with sleek lowered width */}
          <div className="bg-[#0c0c0c] p-2 sm:p-2.5 rounded-2xl border border-neutral-700/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)] flex flex-col items-center relative z-10">
            
            {/* The Widescreen Display Screen - lowered width for sleek, balanced modern look */}
            <div 
              ref={tvScreenRef}
              className="w-[min(84vw,680px)] lg:w-[min(78vw,780px)] xl:w-[820px] aspect-[16/10] max-h-[54vh] rounded-xl bg-black relative overflow-hidden shadow-inner flex flex-col border border-neutral-800"
            >
              {/* Pure Black OLED Screen Base (revealed when paper leaves TV) */}
              <div className="absolute inset-0 bg-[#060606] flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full bg-neutral-900/35 blur-3xl pointer-events-none" />
              </div>

              {/* ========================================================================= */}
              {/* 1. Breaking News Broadcast Screen (Initial State - Scroll = 0%)           */}
              {/* ========================================================================= */}
              <div 
                ref={broadcastScreenRef}
                className="absolute inset-0 bg-[#fbf9f5] text-primary flex flex-col justify-between p-4 sm:p-6 select-none z-10 will-change-transform"
              >
                {/* Top Broadcast Masthead Bar */}
                <div className="flex justify-between items-center border-b border-primary/20 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center p-0.5">
                      <img src={logo} alt="Logo" className="h-4 w-auto grayscale contrast-125" />
                    </div>
                    <span className="mono-data text-[0.55rem] sm:text-xs font-black tracking-wider text-primary">
                      SPECIAL BROADCAST // LIVE FEED
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    <span className="mono-data text-[0.6rem] sm:text-xs font-black text-accent uppercase tracking-widest">
                      • SPECIAL BROADCAST
                    </span>
                  </div>
                </div>

                {/* Center Content: Rotating Headline that changes smoothly every second */}
                <div className="flex flex-col items-center justify-center text-center my-auto px-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    <span className="uppercase-label text-accent font-black text-[0.65rem] sm:text-xs tracking-[0.25em]">
                      BREAKING NEWS
                    </span>
                  </div>
                  <div className="h-20 sm:h-24 md:h-26 flex items-center justify-center overflow-hidden">
                    <h1 
                      className={`headline-serif text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-[1.05] max-w-xl mx-auto transition-all duration-300 ease-out ${
                        headlineAnimState === "in" 
                          ? "opacity-100 translate-y-0 scale-100" 
                          : "opacity-0 -translate-y-3 scale-[0.98]"
                      }`}
                    >
                      {headlines[headlineIndex]}
                    </h1>
                  </div>
                  <p className="mono-data text-[0.58rem] sm:text-[0.68rem] font-bold text-neutral-600 tracking-wider mt-2.5 uppercase">
                    ABHAY KUMAR DAS // FULL-STACK ARCHITECT
                  </p>
                </div>

                {/* Bottom Bar: Edition, Scroll hint, Live status */}
                <div className="flex justify-between items-center border-t border-primary/20 pt-1.5 text-[0.55rem] sm:text-[0.65rem] mono-data font-bold text-neutral-600">
                  <span>EDITION 2026</span>
                  <span className="text-primary font-black uppercase tracking-wider flex items-center gap-1">
                    SCROLL TO READ <span className="animate-bounce">↓</span>
                  </span>
                  <div className="flex items-center gap-1 text-accent font-black">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>ON</span>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* 2. Portfolio Page INSIDE the TV Screen (Fades in on scroll, 0 spillage!) */}
              {/* ========================================================================= */}
              <div 
                ref={tvPageScreenRef}
                className="absolute inset-0 bg-[#fbf9f5] text-primary flex flex-col justify-between p-4 sm:p-6 select-none z-15 will-change-transform opacity-0 overflow-hidden"
              >
                {/* Broadsheet Masthead Header Bar */}
                <div className="w-full border-b border-primary/30 pb-1.5 flex justify-between items-center text-primary">
                  <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-4 sm:h-5 w-auto grayscale contrast-125" />
                    <span className="uppercase-label text-[0.55rem] sm:text-xs font-black tracking-widest">
                      THE DIGITAL DISPATCH
                    </span>
                  </div>
                  <div className="mono-data text-[0.5rem] sm:text-[0.65rem] font-bold text-accent">
                    EDITION 2026 // VOL. 024 // ISSUE 01
                  </div>
                </div>

                {/* Main Broadsheet Front Page Content */}
                <div className="grid grid-cols-12 gap-3 sm:gap-6 my-auto items-center">
                  {/* Left Column - Headline & Story */}
                  <div className="col-span-8 flex flex-col gap-1.5 sm:gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-xs bg-accent animate-pulse" />
                      <span className="uppercase-label text-accent font-black text-[0.55rem] sm:text-xs tracking-widest">
                        Breaking Development
                      </span>
                    </div>
                    
                    <h2 className="headline-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-[0.92] text-primary">
                      Transforming <br />
                      the way your <br />
                      <span className="italic text-accent">ideas</span> work
                    </h2>

                    <p className="text-[0.55rem] sm:text-xs leading-relaxed text-primary/90 font-medium line-clamp-3">
                      Abhay Kumar Das brings your digital vision to life with a robust technical arsenal. 
                      Specializing in building scalable web applications and intuitive digital experiences.
                    </p>

                    <div className="flex gap-2 mt-1">
                      <span className="bg-primary text-background px-3 py-1 uppercase-label text-[0.5rem] sm:text-[0.6rem] font-black shadow-xs">
                        Start Collaboration
                      </span>
                      <span className="border border-primary px-3 py-1 uppercase-label text-[0.5rem] sm:text-[0.6rem] font-black bg-white shadow-xs">
                        View Archives
                      </span>
                    </div>
                  </div>

                  {/* Right Column - Market Watch */}
                  <div className="col-span-4 border-l border-primary/30 pl-3 sm:pl-4 flex flex-col gap-2">
                    <h3 className="uppercase-label border-b border-primary/20 pb-1 text-[0.55rem] sm:text-xs font-black tracking-widest">
                      Market Watch
                    </h3>
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      <div className="flex justify-between items-baseline border-b border-secondary/40 pb-0.5">
                        <span className="uppercase-label text-[0.45rem] sm:text-[0.55rem] text-muted-text font-bold">MERN Experience</span>
                        <span className="headline-serif text-xs sm:text-sm font-black">3+ Years</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-secondary/40 pb-0.5">
                        <span className="uppercase-label text-[0.45rem] sm:text-[0.55rem] text-muted-text font-bold">Code Quality</span>
                        <span className="headline-serif text-xs sm:text-sm font-black">99.9%</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="uppercase-label text-[0.45rem] sm:text-[0.55rem] text-muted-text font-bold">Solutions Delivered</span>
                        <span className="headline-serif text-xs sm:text-sm font-black">25+</span>
                      </div>
                    </div>

                    <div className="bg-neutral-100 p-1.5 sm:p-2 border border-primary text-center mt-1">
                      <span className="bg-primary text-background headline-serif text-xs sm:text-sm font-black uppercase tracking-tight block py-1">
                        Hire Me
                      </span>
                      <span className="text-[0.45rem] sm:text-[0.5rem] uppercase tracking-wider font-black block mt-0.5">
                        Accepting 2026 Projects
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Ticker Tape */}
                <div className="w-full py-1 border-t border-primary/30 flex overflow-hidden whitespace-nowrap bg-background">
                  <div className="flex animate-marquee text-[0.5rem] sm:text-[0.58rem] uppercase-label font-black text-primary gap-4">
                    <span>GitHub / @Innocent-Alive</span>
                    <span>•</span>
                    <span>LinkedIn / @Abhay-Kumar-Das</span>
                    <span>•</span>
                    <span>Instagram / @Innocent_Alive</span>
                    <span>•</span>
                    <span>Full-Stack Engineering</span>
                  </div>
                </div>
              </div>

              {/* Modern TV Screen Glare & Subtle Scanlines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.06)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <div className="absolute left-0 right-0 h-14 bg-gradient-to-b from-transparent via-black/8 via-primary/10 to-transparent animate-tv-scan border-b border-primary/15 pointer-events-none" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20 rounded-xl" />
            </div>

            {/* Modern Slim Chin with Standby LED */}
            <div className="w-full flex items-center justify-center pt-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_6px_rgba(204,0,0,0.9)]" />
                <span className="mono-data text-[0.48rem] font-bold text-neutral-400 tracking-wider">SMART OLED</span>
              </div>
            </div>
          </div>

          {/* Stand & Floor Shadow anchored below the TV frame */}
          <div className="absolute top-[calc(100%-2px)] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-0 w-max">
            {/* Minimalist Vertical Neck */}
            <div className="w-14 h-3.5 bg-gradient-to-b from-neutral-800 to-neutral-950 border-x border-neutral-700 mx-auto" />
            {/* Minimalist Base Plate */}
            <div className="w-56 sm:w-64 md:w-72 h-2 bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-950 rounded-sm shadow-md border-t border-neutral-600 mx-auto" />
            {/* Ambient Soft Floor Shadow */}
            <div className="w-64 sm:w-80 md:w-[480px] h-3.5 bg-black/35 blur-md rounded-full mx-auto mt-1" />
          </div>
        </div>
      </div>

      {/* Hero / Throw Stage - centered in viewport while pinned */}
      <div 
        ref={stageRef}
        className="relative bg-transparent overflow-hidden min-h-screen w-full flex items-center justify-center z-30 pointer-events-none"
        style={{ perspective: "1200px" }}
      >
        {/* The Newspaper Broadside: Full width section matching all other sections, rotating 360° OUT of the TV/Phone screen towards the user! */}
        <div
          ref={newspaperRef}
          className="w-full will-change-transform z-40 pointer-events-auto bg-background border-b-4 border-primary shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
          style={{ 
            transformStyle: "preserve-3d" 
          }}
        >
          <Hero />
        </div>
      </div>

      <About />
      <Experience />
      <Skills />
      <Projects />
      <EditorialProcess />
      <FAQ />
      <Contact />
      <Footer isSepia={isSepia} setIsSepia={setIsSepia} />
    </div>
  );
}

export default App;