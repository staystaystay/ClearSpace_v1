
import React, { useState, useEffect } from 'react';
import { CLEANING_MESSAGES } from '../constants';

interface CleaningProps {
  onComplete: () => void;
}

const Cleaning: React.FC<CleaningProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 5000;
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % CLEANING_MESSAGES.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="p-12 text-center flex flex-col items-center">
      <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-xl shadow-green-100" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.1s linear'
            }}
            className="text-green-500"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <svg className="w-10 h-10 text-green-500 animate-pulse mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="text-xl font-black text-slate-900 tracking-tighter">{Math.round(progress)}%</span>
        </div>
      </div>

      <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Ejecting Clutter</h2>
      <p className="text-green-600 font-bold mb-10 animate-pulse">
        {CLEANING_MESSAGES[messageIndex]}
      </p>

      <div className="flex items-center gap-3 px-6 py-3 bg-green-50 rounded-2xl border border-green-100">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
        <span className="text-xs font-black text-green-700 uppercase tracking-widest leading-none">Security Protocol Active</span>
      </div>
    </div>
  );
};

export default Cleaning;
