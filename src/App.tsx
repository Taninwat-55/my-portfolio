import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import BlockWrapper from './components/BlockWrapper';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- NATIVE WHEEL SCROLL HIJACK ---
  // This converts your vertical mouse wheel into horizontal scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // 1. Check if user is trying to scroll inside a vertical box (like the About text)
      const target = e.target as HTMLElement;
      const scrollableY = target.closest('.overflow-y-auto');
      
      if (scrollableY) {
         const el = scrollableY as HTMLElement;
         // If there is room to scroll vertically, let the browser handle it
         if (el.scrollHeight > el.clientHeight) return;
      }

      // 2. Otherwise, move the page horizontally
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    // 'passive: false' is required to prevent the default vertical scroll
    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, []);

  // --- HELPER: Fake Hash Generator ---
  const generateHash = (seed: string) => 
    `0000000000${seed.split('').map(c => c.charCodeAt(0).toString(16)).join('')}a1b2c3d4e5f`.substring(0, 64);

  const genesisHash = generateHash('GENESIS');
  const aboutHash = generateHash('ABOUT');
  const workHash = generateHash('WORK');
  const skillHash = generateHash('SKILLS');
  const contactHash = generateHash('CONTACT');

  return (
    <div className='relative w-full h-full bg-dark-base text-text ledger-bg'>
      
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Horizontal Scroll Container */}
      <main 
        ref={containerRef} 
        className="horizontal-scroll-container z-10 relative"
      >
        {/* BLOCK 00: HERO */}
        <BlockWrapper 
          id="hero" 
          blockNumber="00" 
          title="GENESIS_BLOCK" 
          hash={genesisHash}
        >
          <Hero />
        </BlockWrapper>

        {/* BLOCK 01: ABOUT */}
        <BlockWrapper 
          id="about" 
          blockNumber="01" 
          title="NODE_IDENTITY" 
          hash={aboutHash}
          prevHash={genesisHash}
        >
          <About />
        </BlockWrapper>

        {/* BLOCK 02: PROJECTS */}
        <BlockWrapper 
          id="projects" 
          blockNumber="02" 
          title="PROOF_OF_WORK" 
          hash={workHash}
          prevHash={aboutHash}
        >
          {/* We removed the onMouseEnter 3D trigger here */}
          <Projects />
        </BlockWrapper>

        {/* BLOCK 03: SKILLS */}
        <BlockWrapper 
          id="skills" 
          blockNumber="03" 
          title="PROTOCOL_SPECS" 
          hash={skillHash}
          prevHash={workHash}
        >
          <Skills />
        </BlockWrapper>

        {/* BLOCK 04: CONTACT */}
        <BlockWrapper 
          id="contact" 
          blockNumber="04" 
          title="BROADCAST_MSG" 
          hash={contactHash}
          prevHash={skillHash}
          isLast={true}
        >
          <Contact />
        </BlockWrapper>

      </main>
    </div>
  );
}

export default App;