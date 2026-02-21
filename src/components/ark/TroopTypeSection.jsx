import React from 'react';
import CommanderPairing from './CommanderPairing';

export default function TroopTypeSection({ title, pairings }) {
  return (
    <div>
      <h4 className="text-amber-400 font-semibold text-sm mb-2 mt-4">{title}</h4>
      <div className="space-y-2">
        {pairings.map((pairing, i) => (
          <CommanderPairing key={i} {...pairing} />
        ))}
      </div>
    </div>
  );
}
