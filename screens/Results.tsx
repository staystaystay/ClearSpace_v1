
import React from 'react';
import { StorageStatus } from '../types';
import StorageBar from '../components/StorageBar';

interface ResultsProps {
  cleanedAmount: number;
  storage: StorageStatus;
  onReset: () => void;
  onScanAgain: () => void;
}

const Results: React.FC<ResultsProps> = ({ cleanedAmount, storage, onReset, onScanAgain }) => {
  return (
    <div className="p-8 md:p-12 text-center flex flex-col items-center">
      <div className="mb-8 p-6 bg-green-50 rounded-full scale-110">
        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">
        You've freed up <span className="text-green-600">{cleanedAmount.toFixed(1)} GB</span> 🎉
      </h1>
      <p className="text-lg text-slate-500 mb-12 font-medium">
        Your laptop is feeling lighter already!
      </p>

      <div className="w-full bg-slate-50 rounded-3xl p-8 mb-12 border border-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-bold text-slate-900 text-lg">Current Storage Status</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">Optimized</span>
        </div>
        <StorageBar 
          usedGb={storage.usedGb} 
          totalGb={storage.totalGb} 
          reclaimableGb={0} 
        />
        <div className="mt-8 p-4 bg-white rounded-xl border border-slate-100 flex items-start gap-3 text-left">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          <p className="text-slate-500 text-sm">
            <strong>Pro-tip:</strong> Some files may reappear over time as your system runs normally. We recommend scanning once a month to keep things clean.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={onScanAgain}
          className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-200 hover:shadow-blue-300 transition-all active:scale-95"
        >
          Scan Again
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-5 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-lg rounded-2xl transition-all active:scale-95"
        >
          Done for now
        </button>
      </div>
    </div>
  );
};

export default Results;
