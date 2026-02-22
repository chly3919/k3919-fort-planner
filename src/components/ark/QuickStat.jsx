import React from 'react';

export default function QuickStat({ icon, label, value, animationDelay = 0 }) {
  return (
    <div
      className="bg-stone-800/80 rounded-lg p-4 border border-amber-700/30 text-center transition-all duration-200 hover:scale-105 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 cursor-default group"
      style={{ animation: `scaleIn 0.3s ease-out ${animationDelay}ms both` }}
    >
      <div className="text-amber-500 flex justify-center mb-2 transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <p className="text-stone-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-white font-bold text-lg mt-0.5">{value}</p>
    </div>
  );
}
