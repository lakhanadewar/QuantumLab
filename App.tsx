
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, AtomScene, ParticleWaveScene } from './components/QuantumScene';
import { 
  BlackBodyDiagram, 
  DoubleSlitDiagram, 
  PhotoelectricDiagram, 
  UncertaintyDiagram, 
  EntanglementDiagram 
} from './components/Diagrams';
import Quiz from './components/Quiz';
import { ArrowDown, Menu, X, Microscope, Zap, Atom, HelpCircle, BookOpen, Brain } from 'lucide-react';

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => (
  <div className="mb-12">
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold tracking-widest uppercase rounded-full mb-4 border border-violet-200">
      <Icon size={14}/> {subtitle}
    </div>
    <h2 className="font-serif text-4xl md:text-5xl text-stone-900">{title}</h2>
    <div className="w-20 h-1 bg-violet-500 mt-4 rounded-full"></div>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-800 selection:bg-violet-500 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Atom size={24} />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-stone-900">
              QUANTUM<span className="text-violet-600">LAB</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-stone-500 uppercase">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-violet-600 transition-colors">Intro</a>
            <a href="#origins" onClick={scrollToSection('origins')} className="hover:text-violet-600 transition-colors">Origins</a>
            <a href="#atom" onClick={scrollToSection('atom')} className="hover:text-violet-600 transition-colors">The Atom</a>
            <a href="#duality" onClick={scrollToSection('duality')} className="hover:text-violet-600 transition-colors">Duality</a>
            <a href="#principles" onClick={scrollToSection('principles')} className="hover:text-violet-600 transition-colors">Principles</a>
            <a href="#quiz" onClick={scrollToSection('quiz')} className="px-5 py-2 bg-stone-900 text-white rounded-lg hover:bg-violet-600 transition-all shadow-md">Self Test</a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#intro" onClick={scrollToSection('intro')} className="uppercase">Introduction</a>
            <a href="#origins" onClick={scrollToSection('origins')} className="uppercase">Origins</a>
            <a href="#atom" onClick={scrollToSection('atom')} className="uppercase">Bohr Atom</a>
            <a href="#duality" onClick={scrollToSection('duality')} className="uppercase">Wave-Particle</a>
            <a href="#principles" onClick={scrollToSection('principles')} className="uppercase">Principles</a>
            <a href="#quiz" onClick={scrollToSection('quiz')} className="px-8 py-3 bg-violet-600 text-white rounded-full shadow-lg uppercase text-sm font-bold tracking-widest">Start Quiz</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
        <HeroScene />
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="inline-block mb-6 px-4 py-1 border border-violet-400/30 text-violet-300 text-xs tracking-[0.3em] uppercase font-bold rounded-full backdrop-blur-md bg-white/5">
            The Microworld Explored
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-stone-400">
            Quantum <br/><span className="italic font-normal text-violet-400">Mechanics</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-300 font-light leading-relaxed mb-12">
            "I think I can safely say that nobody understands quantum mechanics." — Richard Feynman
          </p>
          <button onClick={scrollToSection('intro')} className="group p-4 rounded-full border border-white/20 hover:border-violet-400 transition-all">
            <ArrowDown className="text-white group-hover:text-violet-400 animate-bounce" />
          </button>
        </div>
      </header>

      <main>
        {/* Intro */}
        <section id="intro" className="py-24 bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader title="The Edge of Reality" subtitle="Introduction" icon={Microscope} />
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                <p>
                  For centuries, Newtonian physics described the universe as a clockwork machine. But at the turn of the 20th century, this deterministic view began to crumble. 
                </p>
                <p>
                  Quantum mechanics deals with objects from the <strong>microworld</strong>—particles and atoms. These objects behave nothing like the macroscopic world we know. They exist in multiple states, tunnel through barriers, and are linked across vast distances.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-stone-900 border-8 border-white">
              <ParticleWaveScene />
            </div>
          </div>
        </section>

        {/* Origin: Quantization */}
        <section id="origins" className="py-24 bg-stone-50 border-y border-stone-200">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <SectionHeader title="The Birth of the Quantum" subtitle="Black-Body Radiation" icon={Zap} />
              <p className="text-lg text-stone-600">
                In 1900, Max Planck solved the "Ultraviolet Catastrophe" by proposing that energy is not continuous, but comes in discrete packets called <strong>quanta</strong>.
              </p>
            </div>
            <BlackBodyDiagram />
          </div>
        </section>

        {/* Bohr Atom */}
        <section id="atom" className="py-24 bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 h-[500px] bg-stone-950 rounded-3xl overflow-hidden shadow-inner">
              <AtomScene />
            </div>
            <div className="lg:col-span-5">
              <SectionHeader title="The Bohr Model" subtitle="Atomic Structure" icon={Atom} />
              <ul className="space-y-6 text-stone-600">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <p>Electrons orbit the nucleus in specific, allowed circular paths without radiating light.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <p>Electrons "jump" between levels by absorbing or emitting a single photon of light.</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <p>Energy quantization applies to mass, defining the unique spectral lines of elements.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Duality */}
        <section id="duality" className="py-24 bg-stone-950 text-white overflow-hidden">
          <div className="container mx-auto px-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <SectionHeader title="Wave-Particle Duality" subtitle="Light & Matter" icon={Zap} />
                  <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                    Light acts as a wave in Young's Experiment, creating interference patterns. Yet, in the Photoelectric Effect, it acts as a stream of particles (photons). De Broglie later proved that even matter—like electrons—exhibits these dual properties.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-violet-400 mb-1 uppercase text-xs tracking-widest">Diffraction</h4>
                      <p className="text-sm text-stone-300">When a wave reaches a small opening, it bends.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-violet-400 mb-1 uppercase text-xs tracking-widest">Interference</h4>
                      <p className="text-sm text-stone-300">Waves can strengthen (constructive) or cancel (destructive) each other.</p>
                    </div>
                  </div>
               </div>
               <div className="space-y-8">
                  <DoubleSlitDiagram />
                  <PhotoelectricDiagram />
               </div>
             </div>
          </div>
        </section>

        {/* Heisenberg & Entanglement */}
        <section id="principles" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <SectionHeader title="Uncertainty Principle" subtitle="Heisenberg" icon={Brain} />
                <p className="text-stone-600 mb-8">
                  Werner Heisenberg stated that pairs of properties (like position and momentum) cannot be known precisely at the same time. The more accurately we know where a particle is, the less we know about where it's going.
                </p>
                <UncertaintyDiagram />
              </div>
              <div>
                <SectionHeader title="Quantum Entanglement" subtitle="EPR Paradox" icon={Zap} />
                <p className="text-stone-600 mb-8">
                  Einstein called it "spooky action at a distance." Two particles become linked such that measuring one instantly determines the state of the other, regardless of distance.
                </p>
                <EntanglementDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz" className="py-24 bg-stone-50 border-t border-stone-200">
           <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <SectionHeader title="Test Your Knowledge" subtitle="Assessment" icon={HelpCircle} />
                <p className="text-stone-500 max-w-2xl mx-auto">Based on the core concepts of the quantum world.</p>
              </div>
              <Quiz />
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-500 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center justify-center md:justify-start gap-2">
                  <Atom className="text-violet-500" /> QUANTUMLAB
                </div>
                <p className="text-sm">Comprehensive educational guide to Quantum Mechanics.</p>
            </div>
         
        </div>
        <div className="text-center mt-12 text-xs text-stone-700 border-t border-stone-800 pt-8">
            &copy; 2026 Educational Visualization. Based on the https://stepanbrychta.com/Quantum.pdf.
        </div>
      </footer>
    </div>
  );
};

export default App;
