import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import BackgroundSystem from './components/BackgroundSystem';
import Work from './components/Work';
import SectionNav from './components/SectionNav';

function App() {
  return (
    <div className="App selection:bg-white/10 selection:text-white">
      <BackgroundSystem />
      <SectionNav />
      <div className="relative z-10">
        <Hero />
        <Services />
        <Work/>
      </div>
    </div>
  );
}

export default App;
