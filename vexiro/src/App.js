import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import BackgroundSystem from './components/BackgroundSystem';

function App() {
  return (
    <div className="App selection:bg-white/10 selection:text-white">
      <BackgroundSystem />
      <div className="relative z-10">
        <Hero />
        <Services />
        <Work />
      </div>
    </div>
  );
}

export default App;
