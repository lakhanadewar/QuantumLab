
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy } from 'lucide-react';

const QUESTIONS = [
  {
    q: "Quantum mechanics describes the motion of objects:",
    options: ["Moving at very high speeds", "Of very small sizes", "In strong gravitational fields", "Of macroscopic sizes"],
    correct: 1,
    explanation: "Quantum mechanics deals with objects of very small proportions, such as atoms or subatomic particles."
  },
  {
    q: "For an electron to jump to an orbital with higher energy, it must:",
    options: ["Emit a photon", "Emit an electron", "Absorb a photon", "Absorb an electron"],
    correct: 2,
    explanation: "For an electron to jump to an orbital with higher energy, it must absorb a photon."
  },
  {
    q: "Which of these physicists proposed the idea of quantization of energy?",
    options: ["Niels Bohr", "Albert Einstein", "Max Planck", "Ernest Rutherford"],
    correct: 2,
    explanation: "The idea of quantization of energy was first proposed by a German physicist Max Planck in 1900."
  },
  {
    q: "Diffraction is a phenomenon in which:",
    options: ["Two waves interfere", "Three waves interfere", "Interference pattern is created", "Waves bend"],
    correct: 3,
    explanation: "Diffraction is a phenomenon in which a wave bends. Diffraction occurs when a wave passes through a narrow slit."
  },
  {
    q: "The wave function of a given quantum object collapses:",
    options: ["When the object is observed", "Spontaneously", "When the eigenstate is reduced", "When the object is created"],
    correct: 0,
    explanation: "The wave function of a given quantum object collapses when the object is observed."
  }
];

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === QUESTIONS[current].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-stone-200 shadow-xl max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy size={40} />
        </div>
        <h3 className="font-serif text-3xl text-stone-900 mb-2">Assessment Complete</h3>
        <p className="text-stone-500 mb-8">You mastered {score} out of {QUESTIONS.length} quantum concepts.</p>
        <div className="text-5xl font-serif text-violet-600 mb-12">
          {Math.round((score / QUESTIONS.length) * 100)}%
        </div>
        <button 
          onClick={restart}
          className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-violet-600 transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw size={16}/> Re-evaluate
        </button>
      </div>
    );
  }

  const q = QUESTIONS[current];

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-xl max-w-2xl mx-auto relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-stone-100">
        <motion.div 
          className="h-full bg-violet-600"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="mb-8 flex justify-between items-center">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Question {current + 1} of {QUESTIONS.length}</span>
        <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest">Score: {score}</span>
      </div>

      <h3 className="font-serif text-2xl md:text-3xl text-stone-900 mb-8 leading-tight">{q.q}</h3>

      <div className="space-y-3 mb-8">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all flex justify-between items-center group
              ${selected === null ? 'bg-stone-50 hover:bg-stone-100 border border-stone-100' : 
                i === q.correct ? 'bg-green-50 border-green-200 text-green-700' :
                selected === i ? 'bg-red-50 border-red-200 text-red-700' : 'bg-stone-50 opacity-50 border-stone-100'}`}
          >
            {opt}
            {selected !== null && i === q.correct && <CheckCircle2 size={18} className="text-green-500" />}
            {selected === i && i !== q.correct && <XCircle size={18} className="text-red-500" />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-violet-50 rounded-xl border border-violet-100"
          >
            <p className="text-xs text-violet-800 leading-relaxed">
              <span className="font-bold uppercase mr-2">Explanation:</span>
              {q.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <button 
          onClick={handleNext}
          disabled={selected === null}
          className="px-6 py-3 bg-stone-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-violet-600 disabled:opacity-30 transition-all flex items-center gap-2"
        >
          {current === QUESTIONS.length - 1 ? 'Finish' : 'Next Question'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Quiz;
