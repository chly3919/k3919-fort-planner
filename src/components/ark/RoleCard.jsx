import React from 'react';

export default function RoleCard({ role, emoji, count, duties, color }) {
  const borderColors = {
    red: 'border-red-500',
    blue: 'border-blue-500',
    amber: 'border-amber-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    cyan: 'border-cyan-500',
  };

  return (
    <div className={`bg-stone-800/80 rounded-lg p-4 border-l-4 ${borderColors[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-bold flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          {role}
        </h4>
        <span className="text-stone-400 text-sm">{count}</span>
      </div>
      <ul className="text-stone-300 text-sm space-y-1">
        {duties.map((duty, i) => (
          <li key={i}>• {duty}</li>
        ))}
      </ul>
    </div>
  );
}
