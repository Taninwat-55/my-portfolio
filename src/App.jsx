import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Toaster position="bottom-center" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;