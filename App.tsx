
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppState, DataCategory, StorageStatus } from './types';
import { CATEGORIES, INITIAL_STORAGE } from './constants.tsx';
import Home from './screens/Home';
import Scanning from './screens/Scanning';
import Report from './screens/Report';
import Cleaning from './screens/Cleaning';
import Results from './screens/Results';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [categories, setCategories] = useState<DataCategory[]>(CATEGORIES);
  const [storage, setStorage] = useState<StorageStatus>(INITIAL_STORAGE);
  const [cleanedAmount, setCleanedAmount] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Dynamic calculation of currently selected reclaimable space
  const currentReclaimable = useMemo(() => {
    return categories
      .filter(c => c.selected)
      .reduce((acc, c) => acc + c.sizeGb, 0);
  }, [categories]);

  const startScan = useCallback(() => {
    setState(AppState.SCANNING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const completeScan = useCallback(() => {
    setState(AppState.REPORT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleCategory = useCallback((id: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, selected: !cat.selected } : cat
    ));
  }, []);

  const getAiInsight = useCallback(async (category: DataCategory) => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain in human-friendly, reassuring language why deleting "${category.label}" is safe for a non-technical computer user. Category description: ${category.explanation}. Keep it under 60 words and emphasize that it won't delete personal photos or documents.`,
      });
      
      const insight = response.text || "This data is safely temporary and removing it will help your system run more smoothly.";
      
      setCategories(prev => prev.map(c => 
        c.id === category.id ? { ...c, aiInsight: insight } : c
      ));
    } catch (error) {
      console.error("AI Insight failed", error);
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  const startCleaning = useCallback(() => {
    setState(AppState.CLEANING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const completeCleaning = useCallback(() => {
    setCleanedAmount(currentReclaimable);
    setState(AppState.RE_SCANNING);
    
    setTimeout(() => {
      setStorage(prev => ({
        ...prev,
        usedGb: prev.usedGb - currentReclaimable,
        reclaimableGb: 0
      }));
      setState(AppState.FINISHED);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  }, [currentReclaimable]);

  const reset = useCallback(() => {
    setCategories(CATEGORIES);
    setStorage(INITIAL_STORAGE);
    setState(AppState.IDLE);
    setCleanedAmount(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 md:px-8 bg-slate-50 text-slate-900">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden transition-all duration-500">
        {state === AppState.IDLE && (
          <Home onScan={startScan} />
        )}

        {(state === AppState.SCANNING || state === AppState.RE_SCANNING) && (
          <Scanning 
            onComplete={state === AppState.SCANNING ? completeScan : () => {}} 
            isReScan={state === AppState.RE_SCANNING}
          />
        )}

        {state === AppState.REPORT && (
          <Report 
            storage={storage} 
            categories={categories} 
            selectedTotalGb={currentReclaimable}
            onToggle={toggleCategory} 
            onClean={startCleaning}
            onGetAiInsight={getAiInsight}
            isAiLoading={isAiLoading}
          />
        )}

        {state === AppState.CLEANING && (
          <Cleaning onComplete={completeCleaning} />
        )}

        {state === AppState.FINISHED && (
          <Results 
            cleanedAmount={cleanedAmount} 
            storage={storage} 
            onReset={reset} 
            onScanAgain={startScan}
          />
        )}
      </div>
      
      <footer className="mt-12 mb-8 text-slate-400 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          Privacy First
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          Human Language
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          Secure Deletion
        </div>
      </footer>
    </div>
  );
};

export default App;
