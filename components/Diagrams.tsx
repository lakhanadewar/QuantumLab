
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Eye, EyeOff, LayoutGrid } from 'lucide-react';

// --- BLACK BODY DIAGRAM ---
export const BlackBodyDiagram: React.FC = () => {
  const [temp, setTemp] = useState(5000);
  
  // Simple Planck's Law approximation for visualization
  const getCurve = (t: number) => {
    const points = [];
    const maxFreq = 100;
    const peak = 3000 / t; // simplified Wien's law
    for (let x = 0; x < maxFreq; x++) {
      // Very loose approximation for visual
      const intensity = (Math.pow(x, 3) / (Math.exp(x / (t / 1000)) - 1)) * 5;
      points.push(`${x * 8},${200 - intensity}`);
    }
    return points.join(' ');
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm max-w-3xl mx-auto overflow-hidden">
      <h3 className="font-serif text-2xl mb-2 text-stone-900">Quantization Simulator</h3>
      <p className="text-stone-500 mb-8 text-sm uppercase tracking-widest font-bold">Temperature vs. Spectral Intensity</p>
      
      <div className="relative h-64 bg-stone-50 rounded-2xl border border-stone-100 p-4 mb-8">
        <svg viewBox="0 0 800 200" className="w-full h-full">
          {/* UV, Visible, IR regions */}
          <rect x="0" y="0" width="100" height="200" fill="#f5f3ff" opacity="0.5" />
          <rect x="100" y="0" width="200" height="200" fill="url(#visibleGradient)" opacity="0.3" />
          <rect x="300" y="0" width="500" height="200" fill="#fff7ed" opacity="0.5" />
          
          <defs>
            <linearGradient id="visibleGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          <text x="10" y="190" className="text-[10px] fill-stone-400 font-bold">ULTRAVIOLET</text>
          <text x="110" y="190" className="text-[10px] fill-stone-400 font-bold">VISIBLE</text>
          <text x="310" y="190" className="text-[10px] fill-stone-400 font-bold">INFRARED</text>

          <motion.polyline
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            points={getCurve(temp)}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </svg>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between text-xs font-bold text-stone-500">
          <span>COOL (3000K)</span>
          <span>TEMP: {temp}K</span>
          <span>HOT (10000K)</span>
        </div>
        <input 
          type="range" 
          min="3000" 
          max="10000" 
          value={temp} 
          onChange={(e) => setTemp(parseInt(e.target.value))}
          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
        />
      </div>
    </div>
  );
};

// --- DOUBLE SLIT DIAGRAM ---
export const DoubleSlitDiagram: React.FC = () => {
  const [observed, setObserved] = useState(false);

  return (
    <div className="bg-stone-900 p-6 rounded-2xl border border-white/10 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-xl text-white">Young's Experiment</h3>
        <button 
          onClick={() => setObserved(!observed)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${observed ? 'bg-violet-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {observed ? <Eye size={14}/> : <EyeOff size={14}/>}
          {observed ? 'OBSERVING (PARTICLE)' : 'NOT OBSERVING (WAVE)'}
        </button>
      </div>

      <div className="relative h-48 bg-black rounded-xl border border-white/5 p-4 flex items-center justify-center overflow-hidden">
        {/* Source */}
        <div className="absolute left-4 w-4 h-4 bg-violet-400 rounded-full blur-md animate-pulse" />
        
        {/* Slits */}
        <div className="absolute left-24 h-32 w-2 bg-stone-800 flex flex-col justify-center gap-12">
           <div className="h-4 w-full bg-black/50" />
           <div className="h-4 w-full bg-black/50" />
        </div>

        {/* Pattern on Screen */}
        <div className="absolute right-4 h-32 w-12 flex flex-col justify-around">
          {observed ? (
            <div className="flex flex-col gap-12 items-center">
              <div className="w-8 h-4 bg-violet-500 blur-sm" />
              <div className="w-8 h-4 bg-violet-500 blur-sm" />
            </div>
          ) : (
            [...Array(7)].map((_, i) => (
              <div key={i} className="w-full h-2 bg-violet-500" style={{ opacity: Math.max(0.1, 1 - Math.abs(i-3)*0.3), filter: 'blur(4px)' }} />
            ))
          )}
        </div>

        {/* Waves visualization (SVG) */}
        {!observed && (
          <svg className="absolute left-24 w-[calc(100%-120px)] h-full opacity-30 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx="0" cy="50%"
                r="10"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1"
                initial={{ r: 0, opacity: 1 }}
                animate={{ r: 300, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
              />
            ))}
          </svg>
        )}
      </div>
      <p className="mt-4 text-[10px] text-stone-500 uppercase tracking-widest text-center">
        {observed ? "Observation collapses the wave function into definite paths." : "Particles act as waves, interfering with themselves to create patterns."}
      </p>
    </div>
  );
};

// --- PHOTOELECTRIC DIAGRAM ---
export const PhotoelectricDiagram: React.FC = () => {
  const [intensity, setIntensity] = useState(2);
  const [frequency, setFrequency] = useState(5); // 0-10, threshold is 5

  const photons = [...Array(intensity * 3)].map((_, i) => ({
    id: i,
    delay: i * 0.2
  }));

  const electrons = [...Array(frequency >= 5 ? intensity * 2 : 0)].map((_, i) => ({
    id: i,
    delay: i * 0.3
  }));

  return (
    <div className="bg-stone-900 p-6 rounded-2xl border border-white/10">
      <h3 className="font-serif text-xl text-white mb-6">Photoelectric Effect</h3>
      <div className="relative h-40 bg-black rounded-xl border border-white/5 p-4 flex items-center justify-between overflow-hidden">
        {/* Photons coming in */}
        <div className="flex flex-col gap-2 relative">
          {photons.map(p => (
             <motion.div 
               key={p.id}
               className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]`}
               style={{ backgroundColor: frequency < 5 ? '#facc15' : '#8b5cf6' }}
               initial={{ x: -20, y: Math.random() * 80, opacity: 0 }}
               animate={{ x: 100, opacity: [0, 1, 0] }}
               transition={{ duration: 1 / (frequency/5 || 1), repeat: Infinity, delay: p.delay }}
             />
          ))}
          <span className="text-[8px] text-violet-400 absolute -bottom-4 font-bold">PHOTONS</span>
        </div>

        {/* Metal Surface */}
        <div className="w-4 h-32 bg-stone-700 rounded-full shadow-inner relative">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-600 to-stone-800" />
        </div>

        {/* Emitted Electrons */}
        <div className="flex flex-col gap-2 relative">
           {electrons.map(e => (
             <motion.div 
               key={e.id}
               className="w-2 h-2 bg-blue-400 rounded-full"
               initial={{ x: 0, y: Math.random() * 80, opacity: 0 }}
               animate={{ x: 100, opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: e.delay }}
             />
           ))}
           <span className="text-[8px] text-blue-400 absolute -bottom-4 right-0 font-bold">ELECTRONS</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-stone-500 font-bold">
            <span>LOW FREQ</span>
            <span>FREQ: {frequency}</span>
          </div>
          <input type="range" min="1" max="10" value={frequency} onChange={e => setFrequency(parseInt(e.target.value))} className="w-full accent-violet-500" />
        </div>
        <div className="space-y-2">
           <div className="flex justify-between text-[10px] text-stone-500 font-bold">
            <span>LOW INTENSITY</span>
            <span>INTENSITY: {intensity}</span>
          </div>
          <input type="range" min="1" max="5" value={intensity} onChange={e => setIntensity(parseInt(e.target.value))} className="w-full accent-blue-500" />
        </div>
      </div>
      <p className="mt-4 text-[10px] text-stone-500 text-center uppercase tracking-widest">
        {frequency < 5 ? "Threshold frequency not met. No electrons released." : "High frequency photons have enough energy to eject electrons."}
      </p>
    </div>
  );
};

// --- UNCERTAINTY DIAGRAM ---
export const UncertaintyDiagram: React.FC = () => {
  const [spread, setSpread] = useState(50);
  
  return (
    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
      <div className="relative h-48 bg-white rounded-xl border border-stone-100 p-4 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full">
           {/* Wave Function representation */}
           <motion.path
             d={`M 0,100 ${[...Array(40)].map((_, i) => {
               const x = i * 10;
               const amp = Math.exp(-Math.pow(x - 200, 2) / (2 * Math.pow(spread, 2)));
               const wave = Math.sin(x * (100 / spread));
               return `L ${x},${100 - wave * amp * 80}`;
             }).join(' ')}`}
             fill="none"
             stroke="#8b5cf6"
             strokeWidth="2"
           />
           {/* Position Uncertainty Indicator */}
           <rect x={200 - spread} y="180" width={spread * 2} height="4" fill="#8b5cf6" opacity="0.3" rx="2" />
        </svg>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-xs font-bold text-stone-500 uppercase">
          <span>Localised (Certain Position)</span>
          <span>Spread (Certain Momentum)</span>
        </div>
        <input type="range" min="10" max="150" value={spread} onChange={e => setSpread(parseInt(e.target.value))} className="w-full accent-violet-600" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-3 bg-white rounded-lg border border-stone-100 text-center">
          <span className="block text-[10px] text-stone-400 font-bold">ΔX (POSITION)</span>
          <span className="text-xl font-serif text-violet-600">{spread < 30 ? 'LOW' : spread > 100 ? 'HIGH' : 'MED'}</span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-stone-100 text-center">
          <span className="block text-[10px] text-stone-400 font-bold">ΔP (MOMENTUM)</span>
          <span className="text-xl font-serif text-violet-600">{spread < 30 ? 'HIGH' : spread > 100 ? 'LOW' : 'MED'}</span>
        </div>
      </div>
    </div>
  );
};

// --- ENTANGLEMENT DIAGRAM ---
export const EntanglementDiagram: React.FC = () => {
  const [spinA, setSpinA] = useState<'UP' | 'DOWN' | 'SUPER'>('SUPER');
  const [spinB, setSpinB] = useState<'UP' | 'DOWN' | 'SUPER'>('SUPER');

  const measure = () => {
    const res = Math.random() > 0.5 ? 'UP' : 'DOWN';
    setSpinA(res);
    setSpinB(res === 'UP' ? 'DOWN' : 'UP');
  };

  const reset = () => {
    setSpinA('SUPER');
    setSpinB('SUPER');
  };

  return (
    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center w-1/3 p-4 bg-white rounded-2xl border border-stone-100 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 bg-violet-600 text-white text-[8px] font-bold rounded">PARTICLE A</span>
          <motion.div 
            animate={spinA === 'SUPER' ? { rotate: 360 } : { rotate: spinA === 'UP' ? 0 : 180 }}
            transition={spinA === 'SUPER' ? { duration: 1, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
            className={`text-4xl ${spinA === 'SUPER' ? 'text-stone-300' : 'text-violet-600'}`}
          >
            ↑
          </motion.div>
          <div className="text-[10px] font-bold text-stone-400 mt-2">{spinA}</div>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-4">
           <div className="h-[2px] w-full bg-gradient-to-r from-violet-200 via-violet-500 to-violet-200 animate-pulse" />
        </div>

        <div className="text-center w-1/3 p-4 bg-white rounded-2xl border border-stone-100 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 bg-blue-600 text-white text-[8px] font-bold rounded">PARTICLE B</span>
          <motion.div 
            animate={spinB === 'SUPER' ? { rotate: 360 } : { rotate: spinB === 'UP' ? 0 : 180 }}
            transition={spinB === 'SUPER' ? { duration: 1, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
            className={`text-4xl ${spinB === 'SUPER' ? 'text-stone-300' : 'text-blue-600'}`}
          >
            ↑
          </motion.div>
          <div className="text-[10px] font-bold text-stone-400 mt-2">{spinB}</div>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={measure} 
          disabled={spinA !== 'SUPER'}
          className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-violet-700 disabled:opacity-50 transition-all shadow-md"
        >
          Measure A
        </button>
        <button 
          onClick={reset}
          className="px-6 py-3 border border-stone-200 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
        >
          ↺
        </button>
      </div>
      <p className="mt-4 text-[10px] text-stone-500 text-center uppercase tracking-widest leading-relaxed font-medium">
        Measuring one particle instantly collapses its twin's wave function, no matter how far apart.
      </p>
    </div>
  );
};
