import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/logoBlack.png";

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Initial State: The stamp is raised high above the paper
    gsap.set(logoRef.current, {
      scale: 2.6,
      opacity: 0,
      rotation: -18,
      y: -60,
      filter: "blur(6px)",
      transformOrigin: "50% 50%",
    });

    gsap.set(textRef.current, {
      opacity: 0,
      y: 12,
    });

    // 2. The Stamp slams down onto the newsprint with force
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      y: 0,
      filter: "blur(0px)",
      duration: 0.36,
      ease: "power4.in",
    })
    // 3. Impact recoil of the rubber/metal stamp hitting paper
    .to(logoRef.current, {
      scale: 1.08,
      y: -4,
      duration: 0.08,
      ease: "power1.out",
    })
    .to(logoRef.current, {
      scale: 1,
      y: 0,
      duration: 0.14,
      ease: "bounce.out",
    })
    // 4. "loading..." appears below the stamped logo
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    }, "-=0.05")
    // 5. Brief hold for the stamp effect
    .to({}, { duration: 0.7 })
    // 6. Smooth exit into the site
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.35,
      ease: "power2.inOut",
      onComplete: () => {
        if (onCompleteRef.current) onCompleteRef.current();
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-background flex flex-col justify-center items-center z-[9999] bg-news-dots select-none"
    >
      <div className="flex flex-col items-center justify-center text-center">
        {/* Stamping Logo */}
        <div ref={logoRef} className="will-change-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
          <img
            src={logo}
            alt="Logo"
            className="h-24 md:h-32 w-auto grayscale contrast-125 mx-auto"
          />
        </div>

        {/* Loading text below */}
        <div ref={textRef} className="mt-8">
          <p className="headline-serif text-sm md:text-base font-black uppercase tracking-[0.3em] text-primary animate-pulse">
            loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
