import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import ScrollToTop from './components/ScrollToTop';
import StarfallBackground from './components/common/StarfallBG';

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Canvas */}
      <StarfallBackground />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Services />
        <Projects />
        <About />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default App;
