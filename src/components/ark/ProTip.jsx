import React from 'react';

export default function ProTip({ number, title, content }) {
  return (
    <div className="bg-stone-800/80 rounded-lg p-4 border border-amber-700/30">
      <div className="flex items-start gap-3">
        <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
          {number}
        </div>
        <div>
          <h4 className="text-amber-300 font-bold mb-1">{title}</h4>
          <p className="text-stone-300 text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
}
