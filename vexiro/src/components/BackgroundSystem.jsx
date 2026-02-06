import React from 'react';

const BackgroundSystem = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#000000]">
      {/* Soft Diagonal Light Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(255,255,255,0.01)_0%,_transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(255,255,255,0.01)_0%,_transparent_50%)]" />

      {/* Cinematic Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='leather'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' seed='5' stitchTiles='stitch' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23ffffff' surfaceScale='2' result='light'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23leather)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default BackgroundSystem;
