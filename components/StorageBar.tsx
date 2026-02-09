
import React from 'react';

interface StorageBarProps {
  usedGb: number;
  totalGb: number;
  reclaimableGb?: number;
}

const StorageBar: React.FC<StorageBarProps> = ({ usedGb, totalGb, reclaimableGb = 0 }) => {
  const usedPercent = (usedGb / totalGb) * 100;
  const reclaimablePercent = (reclaimableGb / totalGb) * 100;
  const netUsedPercent = usedPercent - reclaimablePercent;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
        <span>Storage Usage</span>
        <span>{Math.round(usedGb)} GB / {totalGb} GB</span>
      </div>
      <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
        <div 
          style={{ width: `${netUsedPercent}%` }} 
          className="h-full bg-blue-500 transition-all duration-1000 ease-out"
        />
        <div 
          style={{ width: `${reclaimablePercent}%` }} 
          className="h-full bg-blue-200 transition-all duration-1000 ease-out flex items-center justify-center relative group"
        >
           <div className="absolute inset-0 bg-blue-300 opacity-20 animate-pulse" />
        </div>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-xs text-slate-500 font-medium">Keep</span>
        </div>
        {reclaimableGb > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-200" />
            <span className="text-xs text-slate-500 font-medium">Safe to Remove</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageBar;
