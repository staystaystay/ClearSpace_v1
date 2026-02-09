
import React, { useMemo } from 'react';
import { StorageStatus, DataCategory } from '../types';
import StorageBar from '../components/StorageBar';

interface ReportProps {
  storage: StorageStatus;
  categories: DataCategory[];
  selectedTotalGb: number;
  onToggle: (id: string) => void;
  onClean: () => void;
  onGetAiInsight: (cat: DataCategory) => void;
  isAiLoading: boolean;
}

const Report: React.FC<ReportProps> = ({ 
  storage, 
  categories, 
  selectedTotalGb,
  onToggle, 
  onClean,
  onGetAiInsight,
  isAiLoading
}) => {
  const reclaimableMax = categories.reduce((acc, c) => acc + c.sizeGb, 0);
  
  // Calculate what percentage of the USED space we can save
  const savingsPercent = useMemo(() => {
    if (storage.usedGb === 0) return 0;
    return (selectedTotalGb / storage.usedGb) * 100;
  }, [selectedTotalGb, storage.usedGb]);

  const ActionButton = ({ className = "" }: { className?: string }) => (
    <button
      onClick={onClean}
      disabled={selectedTotalGb === 0}
      className={`px-10 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black text-xl rounded-2xl shadow-2xl shadow-blue-200 hover:shadow-blue-300 transition-all active:scale-95 transform ${className}`}
    >
      Clear Selected Space
    </button>
  );

  return (
    <div className="flex flex-col w-full overflow-visible">
      {/* Header Section */}
      <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/30">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-lg tracking-widest">Scan Successful</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-3 tracking-tighter leading-none">
              Save {selectedTotalGb.toFixed(1)} <span className="text-blue-600">GB</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              You can reclaim <span className="text-blue-600 font-bold">{savingsPercent.toFixed(1)}%</span> of your used storage.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-blue-600 p-6 rounded-[2rem] shadow-2xl shadow-blue-200 text-white min-w-[140px] transform hover:scale-105 transition-transform">
            <span className="text-4xl font-black mb-0.5 leading-none">-{savingsPercent.toFixed(0)}%</span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Used Space</span>
          </div>
        </div>
        
        <div className="mb-10">
          <StorageBar 
            usedGb={storage.usedGb} 
            totalGb={storage.totalGb} 
            reclaimableGb={selectedTotalGb} 
          />
        </div>

        {/* Top Action Button */}
        <div className="flex justify-center md:justify-start">
          <ActionButton className="w-full md:w-auto" />
        </div>
      </div>

      {/* Main Breakdown Section */}
      <div className="p-4 md:p-10 space-y-6">
        <h2 className="px-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Full Data Breakdown</h2>
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className={`group p-6 rounded-[2rem] border-2 transition-all duration-300 ${
              cat.selected ? 'border-blue-500 bg-white shadow-xl shadow-blue-100/50' : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            <div className="flex items-start gap-5">
              <button 
                onClick={() => onToggle(cat.id)}
                className={`mt-1 flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  cat.selected ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'
                }`}
              >
                {cat.selected && <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
              </button>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-black text-slate-900 text-xl tracking-tight">{cat.label}</h3>
                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-widest ${
                      cat.safety === 'safe' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {cat.safety === 'safe' ? 'Verified Safe' : 'Recommended'}
                    </span>
                  </div>
                  <span className="font-black text-slate-900 text-2xl tracking-tighter">{cat.sizeGb.toFixed(1)} GB</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {cat.explanation}
                </p>
                
                {cat.aiInsight ? (
                  <div className="mb-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 text-sm text-blue-800 leading-relaxed italic relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5 font-black text-[10px] uppercase text-blue-600 tracking-widest">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      Advisor Insight
                    </div>
                    {cat.aiInsight}
                  </div>
                ) : (
                  <button 
                    onClick={() => onGetAiInsight(cat)}
                    disabled={isAiLoading}
                    className="mb-4 text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest flex items-center gap-2 disabled:opacity-50 group-hover:translate-x-1 transition-transform"
                  >
                    <span>{isAiLoading ? 'Analyzing...' : 'Why is this safe? Ask Advisor'}</span>
                    {!isAiLoading && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>}
                  </button>
                )}

                <div className="flex items-start gap-2 text-[11px] font-bold p-3.5 bg-slate-50/50 rounded-xl border border-slate-100 text-slate-400">
                  <svg className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{cat.impact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sticky Section */}
      <div className="sticky bottom-0 p-8 md:p-10 border-t border-slate-100 bg-white/90 backdrop-blur-md shadow-[0_-20px_40px_rgba(0,0,0,0.04)] z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="text-center sm:text-left">
            <span className="block text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Target Reduction</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 tracking-tighter">{selectedTotalGb.toFixed(1)}</span>
              <span className="text-xl font-black text-slate-400">GB</span>
            </div>
          </div>
          <ActionButton className="w-full sm:w-auto px-14 py-6 text-2xl rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Report;
