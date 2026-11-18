import { useRef } from "react";
import heroImage from "../assets/heroImage.png";
import logo from "../assets/logoBlack.png";

const Hero = () => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative bg-background bg-news-dots overflow-hidden pt-5 sm:pt-7 lg:pt-8"
    >
      <div className="container mx-auto px-4 pb-8 sm:pb-10 relative">
        {/* Broadsheet Masthead Header Bar */}
        <div className="w-full border-b-2 border-primary pb-2 mb-4 sm:mb-6 flex justify-between items-center text-primary">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-5 sm:h-6 w-auto grayscale contrast-125" />
            <span className="uppercase-label text-[0.65rem] sm:text-xs font-black tracking-widest">
              THE DIGITAL DISPATCH
            </span>
          </div>
          <div className="mono-data text-[0.6rem] sm:text-xs font-bold text-accent">
            EDITION 2026 // VOL. 024 // ISSUE 01
          </div>
        </div>

        {/* Main Broadsheet Front Page Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 border-b-4 border-primary pb-8 sm:pb-10 hero-content">
          {/* Left Column - Main Headline & Story */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent animate-pulse"></span>
              <span className="uppercase-label text-accent font-black text-xs sm:text-sm tracking-widest">
                Breaking Development
              </span>
            </div>
            
            <h1 className="headline-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-primary">
              Transforming <br /> 
              the way your <br /> 
              <span className="italic text-accent">ideas</span> work
            </h1>

            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start mt-2">
              <div className="relative">
                <p className="text-lg md:text-xl lg:text-2xl leading-snug text-primary font-medium max-w-2xl text-justify">
                  <span className="float-left text-7xl lg:text-8xl font-header font-black mr-3 sm:mr-4 leading-[0.7] text-primary mt-1">A</span>
                  bhay Kumar Das brings your digital vision to life with a robust technical arsenal. 
                  Specializing in building scalable web applications and intuitive mobile experiences 
                  that drive user engagement and business growth in an ever-evolving digital landscape.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-6 sm:mt-8">
                  <a 
                    href="#contact" 
                    className="bg-primary text-background px-6 sm:px-8 py-3 sm:py-3.5 uppercase-label text-xs font-black hover:bg-accent transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(17,17,17,0.3)]"
                  >
                    Start Collaboration
                  </a>
                  <a 
                    href="#projects" 
                    className="border-2 border-primary px-6 sm:px-8 py-3 sm:py-3.5 uppercase-label text-xs font-black bg-white hover:bg-neutral-100 transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]"
                  >
                    View Archives
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - "Market Watch" / Editorial Sidebar */}
          <div className="lg:col-span-4 border-t-4 lg:border-t-0 lg:border-l-4 border-primary pt-6 lg:pt-0 lg:pl-8 flex flex-col gap-6 sm:gap-8">
            <div>
              <h3 className="uppercase-label border-b-2 border-primary pb-2 mb-4 sm:mb-6 text-sm sm:text-base font-black tracking-widest">
                Market Watch
              </h3>
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex justify-between items-end border-b border-secondary pb-3">
                  <span className="text-muted-text uppercase-label text-xs font-bold">MERN Experience</span>
                  <div className="text-right">
                    <span className="headline-serif text-2xl sm:text-3xl font-black">3+ Years</span>
                    <p className="text-accent text-[0.7rem] font-black uppercase mt-0.5">▲ 12% GROWTH</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-secondary pb-3">
                  <span className="text-muted-text uppercase-label text-xs font-bold">Code Quality</span>
                  <div className="text-right">
                    <span className="headline-serif text-2xl sm:text-3xl font-black">99.9%</span>
                    <p className="text-accent text-[0.7rem] font-black uppercase mt-0.5">ENTERPRISE GRADE</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-secondary pb-3">
                  <span className="text-muted-text uppercase-label text-xs font-bold">Solutions Delivered</span>
                  <div className="text-right">
                    <span className="headline-serif text-2xl sm:text-3xl font-black">25+</span>
                    <p className="text-accent text-[0.7rem] font-black uppercase mt-0.5">GLOBAL REACH</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advertisement Mockup */}
            <div className="mt-auto bg-neutral-100 p-4 sm:p-5 border-2 border-primary text-center">
              <span className="uppercase-label text-[0.6rem] mb-2 sm:mb-3 block font-bold text-muted-text tracking-[0.2em]">
                P R O M O T E D
              </span>
              <a 
                href="#contact" 
                className="bg-primary py-4 sm:py-5 flex items-center justify-center mb-3 sm:mb-4 group cursor-pointer hover:bg-accent transition-colors duration-500 block"
              >
                <span className="text-background headline-serif text-3xl sm:text-4xl font-black uppercase tracking-tighter">
                  Hire Me
                </span>
              </a>
              <p className="text-[0.65rem] italic uppercase tracking-widest font-black leading-tight">
                Accepting New <br /> Opportunities for 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker Tape Style Socials - Full Width */}
      <div className="w-full py-2.5 sm:py-3 border-y-2 border-primary flex overflow-hidden whitespace-nowrap bg-background group">
        <div className="flex animate-marquee group-hover:pause-animation">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 mx-5 text-primary">
              <a href="https://github.com/Innocent-Alive" target="_blank" rel="noopener noreferrer" className="uppercase-label text-xs hover:text-accent font-black">GitHub / @Innocent-Alive</a>
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <a href="https://www.linkedin.com/in/innocent-alive/" target="_blank" rel="noopener noreferrer" className="uppercase-label text-xs hover:text-accent font-black">LinkedIn / @Abhay-Kumar-Das</a>
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <a href="https://www.instagram.com/innocent_alive/" target="_blank" rel="noopener noreferrer" className="uppercase-label text-xs hover:text-accent font-black">Instagram / @Innocent_Alive</a>
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <a href="https://www.facebook.com/TheInnocentAlive" target="_blank" rel="noopener noreferrer" className="uppercase-label text-xs hover:text-accent font-black">Facebook / @TheInnocentAlive</a>
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
