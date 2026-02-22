import React from 'react';

const borderColors = {
  red: 'border-red-500',
  blue: 'border-blue-500',
  amber: 'border-amber-500',
  green: 'border-green-500',
  purple: 'border-purple-500',
  cyan: 'border-cyan-500',
};

const glowShadow = {
  red: 'hover:shadow-red-500/20',
  blue: 'hover:shadow-blue-500/20',
  amber: 'hover:shadow-amber-500/20',
  green: 'hover:shadow-green-500/20',
  purple: 'hover:shadow-purple-500/20',
  cyan: 'hover:shadow-cyan-500/20',
};

const accentBg = {
  red: 'bg-red-900/15',
  blue: 'bg-blue-900/15',
  amber: 'bg-amber-900/15',
  green: 'bg-green-900/15',
  purple: 'bg-purple-900/15',
  cyan: 'bg-cyan-900/15',
};

const accentText = {
  red: 'text-red-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  cyan: 'text-cyan-400',
};

export default function RoleCard({
  role,
  emoji,
  count,
  duties,
  color,
  isMyRole = false,
  onSetMyRole,
  completedDuties = [],
  onToggleDuty,
  animationDelay = 0,
}) {
  const completedCount = completedDuties.filter(Boolean).length;
  const allDone = completedCount === duties.length && duties.length > 0;

  return (
    <div
      className={`rounded-lg border-l-4 ${borderColors[color]} ${
        isMyRole ? `${accentBg[color]} animate-glow-pulse` : 'bg-stone-800/80'
      } transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${glowShadow[color]}`}
      style={{ animation: `fadeInUp 0.4s ease-out ${animationDelay}ms both` }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h4 className="text-white font-bold flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span>{role}</span>
          {isMyRole && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${accentBg[color]} ${accentText[color]} border-current`}
            >
              MY ROLE
            </span>
          )}
        </h4>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-stone-500 text-xs">{count}</span>
          <button
            onClick={onSetMyRole}
            className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-200 font-semibold ${
              isMyRole
                ? `${accentText[color]} border-current hover:opacity-70`
                : 'text-stone-500 border-stone-600 hover:text-amber-300 hover:border-amber-500'
            }`}
            title={isMyRole ? 'Unset my role' : 'Set as my role'}
          >
            {isMyRole ? '★ Mine' : '☆ Set'}
          </button>
        </div>
      </div>

      {/* Progress bar (only shown when a duty is checked) */}
      {completedCount > 0 && (
        <div className="px-4 pb-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-stone-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  allDone ? 'bg-green-400' : `${accentText[color].replace('text-', 'bg-')}`
                }`}
                style={{ width: `${(completedCount / duties.length) * 100}%` }}
              />
            </div>
            <span className={`text-xs ${allDone ? 'text-green-400' : 'text-stone-500'}`}>
              {completedCount}/{duties.length}
            </span>
          </div>
        </div>
      )}

      {/* Duties checklist */}
      <ul className="px-4 pb-4 pt-1 space-y-1.5">
        {duties.map((duty, i) => {
          const done = completedDuties[i];
          return (
            <li
              key={i}
              onClick={() => onToggleDuty && onToggleDuty(i)}
              className={`flex items-start gap-2 rounded px-2 py-1 cursor-pointer group transition-all duration-150 ${
                done ? 'bg-stone-900/30' : 'hover:bg-stone-700/40'
              }`}
            >
              <span
                className={`mt-0.5 shrink-0 text-sm transition-colors duration-150 ${
                  done ? accentText[color] : 'text-stone-600 group-hover:text-stone-400'
                }`}
              >
                {done ? '✓' : '○'}
              </span>
              <span
                className={`text-sm transition-all duration-150 leading-snug ${
                  done ? 'line-through text-stone-500' : 'text-stone-300'
                }`}
              >
                {duty}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
