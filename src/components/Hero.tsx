import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaBitcoin, FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power4.out" }
    )
    .fromTo(subTitleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }, 
      "-=0.5"
    );
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
      <div className="order-2 md:order-1 text-center md:text-left">
        {/* Removed 'Mining Blocks' badge to avoid overlap with BlockWrapper header */}
        
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight text-glow">
          TANINWAT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">
            KAEWPANKAN
          </span>
        </h1>
        
        <p ref={subTitleRef} className="text-lg md:text-xl font-body text-gray-400 mb-10 max-w-lg mx-auto md:mx-0">
          Web Developer. Bitcoin Advocate. Building decentralized-inspired experiences on the modern web.
        </p>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <a href="#projects" className="group bg-primary text-dark-base font-bold py-3 px-8 rounded-none border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 flex items-center gap-2">
            EXPLORE CHAIN <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
          </a>
          <a href="#contact" className="bg-transparent text-text font-bold py-3 px-8 border border-text/30 hover:border-primary hover:text-primary transition-all duration-300">
            BROADCAST MSG
          </a>
        </div>
      </div>

      <div className="order-1 md:order-2 flex justify-center items-center relative">
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-4 border border-dashed border-primary/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaBitcoin className="text-9xl text-primary drop-shadow-[0_0_30px_rgba(247,147,26,0.6)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;