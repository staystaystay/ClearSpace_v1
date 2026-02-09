
import React, { useState, useEffect } from 'react';
import { SCANNING_MESSAGES } from '../constants';

interface ScanningProps {
  onComplete: () => void;
  isReScan?: boolean;
}

const Scanning: React.FC<ScanningProps> = ({ onComplete, isReScan = false }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = isReScan ? 2000 : 4000;
    const intervalTime = 50;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % SCANNING_MESSAGES.length);
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete, isReScan]);

  // SVG calculations for a clean circle
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="p-12 text-center flex flex-col items-center">
      <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 120 120">
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
            className="text-blue-600"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-900 tracking-tighter">{Math.round(progress)}%</span>
        </div>
      </div>

      <h2 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">
        {isReScan ? 'Refining Analysis' : 'Deep System Scan'}
      </h2>
      <div className="h-6 overflow-hidden">
        <p className="text-blue-500 font-bold text-sm animate-pulse transition-all duration-500">
          {SCANNING_MESSAGES[messageIndex]}
        </p>
      </div>
      
      {!isReScan && (
        <div className="mt-10 flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Scanning Hardware Volumes</span>
        </div>
      )}
    </div>
  );
};

export default Scanning;
