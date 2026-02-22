import React from 'react';

export default function PhaseCard({ phase, time, name, actions, animationDelay = 0 }) {
  return (
    <div
      className="flex gap-4 items-start bg-stone-900/50 rounded-lg p-4 border border-stone-700 transition-all duration-200 hover:border-amber-600/50 hover:bg-stone-800/60 hover:shadow-md group"
      style={{ animation: `fadeInUp 0.4s ease-out ${animationDelay}ms both` }}
    >
      <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-md group-hover:shadow-amber-500/30 transition-shadow duration-200">
        {phase}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-amber-400 font-mono text-xs bg-amber-900/30 px-2 py-0.5 rounded border border-amber-700/40">
            {time}
          </span>
          <span className="text-white font-bold">{name}</span>
        </div>
        <ul className="text-stone-300 text-sm space-y-1.5">
          {actions.map((action, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-amber-600 mt-0.5 shrink-0 text-xs">▸</span>
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
