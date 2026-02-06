import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import BackgroundSystem from './components/BackgroundSystem';
import CurvedDivider from './components/CurvedDivider';
import Work from './components/Work';
import Team from './components/Team';
import SectionNav from './components/SectionNav';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App selection:bg-white/10 selection:text-white">
      <BackgroundSystem />
      <SectionNav />
      <div className="relative z-10">
        <Hero />
        <Services />
        <CurvedDivider />
        <Work />
        <Team />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;