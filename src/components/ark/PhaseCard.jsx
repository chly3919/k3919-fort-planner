import React from 'react';

export default function PhaseCard({ phase, time, name, actions }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
        {phase}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-amber-400 font-mono text-sm">{time}</span>
          <span className="text-white font-bold">{name}</span>
        </div>
        <ul className="text-stone-300 text-sm">
          {actions.map((action, i) => (
            <li key={i}>• {action}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
