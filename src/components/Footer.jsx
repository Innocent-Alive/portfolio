import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import logo from "../assets/logoBlack.png";

const Footer = ({ isSepia, setIsSepia }) => {
  const ctaRef = useRef(null);
  const glowRef = useRef(null);
  const accentGlowRef = useRef(null);
  const backLayerRef = useRef(null);
  const quickToX = useRef(null);
  const quickToY = useRef(null);
  const quickToAccentX = useRef(null);
  const quickToAccentY = useRef(null);

  useLayoutEffect(() => {
    if (!glowRef.current || !accentGlowRef.current) return;

    quickToX.current = gsap.quickTo(glowRef.current, "x", { duration: 0.45, ease: "power2.out" });
    quickToY.current = gsap.quickTo(glowRef.current, "y", { duration: 0.45, ease: "power2.out" });
    quickToAccentX.current = gsap.quickTo(accentGlowRef.current, "x", { duration: 0.8, ease: "power3.out" });
    quickToAccentY.current = gsap.quickTo(accentGlowRef.current, "y", { duration: 0.8, ease: "power3.out" });

    // Initial position centered
    if (ctaRef.current) {
      const rect = ctaRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      quickToX.current(centerX);
      quickToY.current(centerY);
      quickToAccentX.current(centerX);
      quickToAccentY.current(centerY);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (quickToX.current) quickToX.current(x);
    if (quickToY.current) quickToY.current(y);
    if (quickToAccentX.current) quickToAccentX.current(x);
    if (quickToAccentY.current) quickToAccentY.current(y);

    // Normalized mouse offsets from center (-1 to 1)
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    // ONLY the back ghost layer moves with cursor movement
    if (backLayerRef.current) {
      gsap.to(backLayerRef.current, {
        x: -normX * 42,
        y: -normY * 26,
        rotateY: normX * 11,
        rotateX: -normY * 9,
        scale: 1.04,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseEnter = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0.95, duration: 0.35 });
    if (accentGlowRef.current) gsap.to(accentGlowRef.current, { opacity: 0.75, duration: 0.35 });
    if (backLayerRef.current) gsap.to(backLayerRef.current, { opacity: 0.85, duration: 0.35 });
  };

  const handleMouseLeave = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0.5, duration: 0.6 });
    if (accentGlowRef.current) gsap.to(accentGlowRef.current, { opacity: 0.3, duration: 0.6 });
    
    // Smoothly return the back ghost layer to center
    if (backLayerRef.current) {
      gsap.to(backLayerRef.current, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        opacity: 0.6,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-background bg-news-dots pt-0 pb-6 relative overflow-hidden transition-colors duration-700">
      {/* ========================================================================= */}
      {/* Pre-Footer CTA Section with 2-Layer 3D Depth Animation                    */}
      {/* ========================================================================= */}
      <div 
        ref={ctaRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-primary text-background py-16 md:py-24 mb-10 border-y-8 border-primary relative overflow-hidden group cursor-default select-none"
        style={{ perspective: "1000px" }}
      >
        {/* Dynamic Interactive Cursor-Following Glowing Orbs */}
        <div 
          ref={glowRef}
          className="absolute top-0 left-0 w-[550px] h-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[110px] pointer-events-none will-change-transform opacity-50 transition-opacity duration-300"
        />
        <div 
          ref={accentGlowRef}
          className="absolute top-0 left-0 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/12 blur-[90px] pointer-events-none will-change-transform opacity-30 transition-opacity duration-500"
        />

        {/* Ambient Corner Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-accent/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-white/5 rounded-full blur-[90px] pointer-events-none animate-pulse [animation-delay:1.5s]" />

        {/* Newsprint Dot Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

        {/* ========================================================================= */}
        {/* LAYER 1: Back Ghost Layer (Moves in 3D parallax with cursor movement)     */}
        {/* ========================================================================= */}
        <div 
          ref={backLayerRef} 
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none z-1 will-change-transform px-4 opacity-60"
          style={{ transformStyle: "preserve-3d" }}
        >
          <h2 className="headline-serif text-4xl md:text-8xl font-black mb-8 leading-none max-w-5xl tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.25)] drop-shadow-[0_0_20px_rgba(204,0,0,0.3)]">
            Ready to transform your workflow?
          </h2>
          <p className="text-sm md:text-xl mb-12 max-w-3xl font-medium leading-relaxed italic text-white/15">
            Join the ranks of innovative brands already leveraging advanced web solutions to drive engagement and achieve unparalleled success in the digital editorial space.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <div className="border-2 border-white/25 px-10 py-5 uppercase-label text-sm font-black text-white/30 shadow-[8px_8px_0px_0px_rgba(204,0,0,0.35)] text-center">
              Start Collaboration
            </div>
            <div className="border-2 border-white/20 px-10 py-5 uppercase-label text-sm font-black text-white/20 text-center">
              Schedule a Call
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2: Foreground Main Layer (Static - Does NOT move with cursor)       */}
        {/* ========================================================================= */}
        <div 
          className="container mx-auto px-4 flex flex-col items-center text-center relative z-10 pointer-events-auto"
        >
          <h2 className="headline-serif text-4xl md:text-8xl font-black mb-8 leading-none max-w-5xl tracking-tighter text-background">
            Ready to transform your workflow?
          </h2>
          <p className="text-sm md:text-xl mb-12 opacity-85 max-w-3xl font-medium leading-relaxed italic">
            Join the ranks of innovative brands already leveraging advanced web solutions to drive engagement and achieve unparalleled success in the digital editorial space.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <a 
              href="#contact" 
              className="bg-background text-primary px-10 py-5 uppercase-label text-sm font-black hover:bg-neutral-200 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(204,0,0,1)] text-center cursor-pointer"
            >
              Start Collaboration
            </a>
            <a 
              href="#contact" 
              className="border-4 border-background text-background px-10 py-5 uppercase-label text-sm font-black hover:bg-background hover:text-primary transition-all duration-300 text-center cursor-pointer"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-4">
          {/* Column 1: Branding & Edition Info */}
          <div>
            <div className="mb-6 border-b-2 border-primary pb-3">
              <img src={logo} alt="LOGO" className="h-10 w-auto grayscale contrast-125 mb-3" />
              <h3 className="uppercase-label text-[0.6rem] font-black tracking-widest opacity-60">MASTHEAD_REGISTERED</h3>
            </div>
            <div className="mono-data text-[0.65rem] font-black text-primary leading-loose tracking-tighter">
              <p>SERIES: {new Date().getFullYear()}</p>
              <p>VOL. {new Date().getFullYear() % 100}.5 // ISSUE 01</p>
              <p>LOC: MUMBAI, INDIA [19.21°N, 72.85°E]</p>
              <p className="mt-2 text-accent">STATUS: CONTINUOUS_UPDATE</p>
            </div>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsSepia(!isSepia)}
              className="mt-6 flex items-center gap-3 border-2 border-primary px-4 py-2 hover:bg-primary hover:text-background transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-3 h-3 rounded-full ${isSepia ? 'bg-accent' : 'bg-primary group-hover:bg-background'} transition-colors`}></div>
              <span className="uppercase-label text-[0.6rem] font-black">Daily Edition: {isSepia ? 'Sepia' : 'Standard'}</span>
            </button>
          </div>

          {/* Column 2: Staff */}
          <div>
            <h3 className="uppercase-label text-sm font-black mb-6 border-b-2 border-primary pb-2 inline-block">BUREAU_STAFF</h3>
            <ul className="mono-data text-[0.65rem] font-black text-primary space-y-2.5 uppercase tracking-tighter">
              <li className="flex justify-between border-b border-primary/10 pb-1"><span>EDITOR:</span> <span>ABHAY DAS</span></li>
              <li className="flex justify-between border-b border-primary/10 pb-1"><span>UX_DESIGN:</span> <span>NEWS_SYSTEM</span></li>
              <li className="flex justify-between border-b border-primary/10 pb-1"><span>DEV_OPS:</span> <span>SCRIPTS_V4.0</span></li>
              <li className="flex justify-between border-b border-primary/10 pb-1"><span>TYPOGRAPHY:</span> <span>SERIF_STACK</span></li>
            </ul>
          </div>

          {/* Column 3: Index */}
          <div>
            <h3 className="uppercase-label text-sm font-black mb-6 border-b-2 border-primary pb-2 inline-block">ARCHIVE_INDEX</h3>
            <ul className="mono-data text-xs font-black text-primary space-y-2.5 uppercase tracking-tighter">
              <li><a href="#about" className="hover:text-accent hover:underline flex items-center gap-2"><span>[01]</span> BIOGRAPHY</a></li>
              <li><a href="#experience" className="hover:text-accent hover:underline flex items-center gap-2"><span>[02]</span> CAREER_LOG</a></li>
              <li><a href="#projects" className="hover:text-accent hover:underline flex items-center gap-2"><span>[03]</span> INSIGHTS</a></li>
              <li><a href="#skills" className="hover:text-accent hover:underline flex items-center gap-2"><span>[04]</span> TECH_SPECS</a></li>
              <li><a href="#" className="hover:text-accent hover:underline flex items-center gap-2"><span>[05]</span> BLOGS</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Controls */}
          <div className="flex flex-col justify-between items-start lg:items-end">
            <div className="text-left lg:text-right w-full">
               <h3 className="uppercase-label text-sm font-black mb-6 border-b-2 border-primary pb-2 inline-block">LEGAL_DOSSIER</h3>
               <p className="mono-data text-[0.65rem] font-black text-muted-text uppercase leading-loose">
                 © {new Date().getFullYear()} ALL RIGHTS RESERVED.<br/>
                 UNAUTHORIZED DUPLICATION IS A BREACH OF TERMS.<br/>
                 IP_TRACKING: ACTIVE
               </p>
            </div>
            <button 
              onClick={scrollToTop}
              className="mt-8 border-4 border-primary p-3 w-12 h-12 flex items-center justify-center hover:bg-accent hover:text-background transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] group cursor-pointer"
              title="Return to Masthead"
            >
              <span className="font-black text-xl group-hover:-translate-y-1 transition-transform">↑</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background Page Number Decor */}
      <div className="absolute top-[-50px] right-[-30px] opacity-5 text-[15rem] font-black uppercase-label select-none pointer-events-none rotate-12">
        FIN
      </div>
    </footer>
  );
};

export default Footer;