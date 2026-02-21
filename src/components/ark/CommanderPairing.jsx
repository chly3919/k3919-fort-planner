import React from 'react';

export default function CommanderPairing({ type, names, role, roleColor }) {
  const roleColors = {
    red: 'bg-red-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
  };

  return (
    <div className="flex items-center justify-between bg-stone-900/50 rounded-lg p-3 border border-stone-700">
      <div>
        <span className="text-stone-400 text-xs">{type}</span>
        <p className="text-white font-semibold">{names}</p>
      </div>
      <span className={`${roleColors[roleColor]} text-white text-xs px-2 py-1 rounded`}>
        {role}
      </span>
    </div>
  );
}
