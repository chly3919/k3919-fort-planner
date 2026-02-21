import React from 'react';

export default function StrategyCard({ title, icon, tips }) {
  return (
    <div className="bg-stone-800/80 rounded-lg p-4 border border-amber-700/30">
      <h4 className="text-amber-300 font-bold mb-3 flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        {title}
      </h4>
      <ul className="text-stone-300 text-sm space-y-1">
        {tips.map((tip, i) => (
          <li key={i}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
}
