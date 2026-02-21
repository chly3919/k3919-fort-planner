import React from 'react';

export default function QuickStat({ icon, label, value }) {
  return (
    <div className="bg-stone-800/80 rounded-lg p-4 border border-amber-700/30 text-center">
      <div className="text-amber-500 flex justify-center mb-2">{icon}</div>
      <p className="text-stone-400 text-xs">{label}</p>
      <p className="text-white font-bold text-lg">{value}</p>
    </div>
  );
}
