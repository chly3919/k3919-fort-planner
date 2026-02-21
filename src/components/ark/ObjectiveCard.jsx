import React from 'react';

export default function ObjectiveCard({ name, points, desc, color }) {
  const colorClasses = {
    amber: 'border-amber-500 bg-amber-900/20',
    blue: 'border-blue-500 bg-blue-900/20',
    green: 'border-green-500 bg-green-900/20',
    purple: 'border-purple-500 bg-purple-900/20',
  };

  const textColors = {
    amber: 'text-amber-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <h4 className={`font-bold ${textColors[color]}`}>{name}</h4>
      <p className="text-white font-semibold text-sm">{points}</p>
      <p className="text-stone-400 text-sm">{desc}</p>
    </div>
  );
}
