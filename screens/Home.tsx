
import React from 'react';

interface HomeProps {
  onScan: () => void;
}

const Home: React.FC<HomeProps> = ({ onScan }) => {
  return (
    <div className="p-8 md:p-16 text-center flex flex-col items-center">
      <div className="mb-10 relative">
        <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-20 animate-pulse" />
        <div className="relative p-8 bg-blue-50 rounded-[2.5rem] float-animation">
          <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
        Clear the clutter,<br/><span className="text-blue-600">keep the speed.</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-lg font-medium leading-relaxed">
        One click to find unused system files and hidden app leftovers that are slowing you down.
      </p>

      <button
        onClick={onScan}
        className="group relative w-full sm:w-72 h-20 bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl rounded-[1.5rem] shadow-2xl shadow-blue-200 hover:shadow-blue-300 transition-all active:scale-95 flex items-center justify-center overflow-hidden"
      >
        <span className="relative z-10">Scan My Storage</span>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      </button>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 w-full max-w-md">
        <div className="flex flex-col items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
           </div>
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secure</span>
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           </div>
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fast</span>
        </div>
        <div className="hidden sm:flex flex-col items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
           </div>
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Human</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
