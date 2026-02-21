import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SeasonAccordion({ title, subtitle, expanded, onToggle, children }) {
  return (
    <div className="bg-stone-800/80 rounded-lg border border-amber-700/30 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-700/50 transition-colors"
      >
        <div>
          <h3 className="text-amber-300 font-bold">{title}</h3>
          <p className="text-stone-400 text-sm">{subtitle}</p>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-amber-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-amber-400" />
        )}
      </button>
      {expanded && (
        <div className="p-4 pt-0 border-t border-stone-700">
          {children}
        </div>
      )}
    </div>
  );
}
