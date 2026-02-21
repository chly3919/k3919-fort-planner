import React, { useMemo, useState } from 'react';
import { Clock, Target, Trophy } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { AP_COSTS, BARBARIAN_DATA, EXTRA_SPEEDUP_PER_BARB, MATERIAL_RATES } from '../data';

function BarbarianCalculatorPage() {
  const { t } = useLanguage();
  const [minBarbLevel, setMinBarbLevel] = useState(30);
  const [maxBarbLevel, setMaxBarbLevel] = useState(40);
  const [barbCount, setBarbCount] = useState(100);
  const [marchTime, setMarchTime] = useState(30); // in seconds
  const [apRegenSeconds, setApRegenSeconds] = useState(18);
  const [simultaneousMarches, setSimultaneousMarches] = useState(5);
  const [calculationMode, setCalculationMode] = useState('barbs');
  const [desiredXP, setDesiredXP] = useState('');
  const [hasPeacekeeping, setHasPeacekeeping] = useState(true);

  const results = useMemo(() => {
    const apCosts = hasPeacekeeping ? AP_COSTS.peacekeeping : AP_COSTS.noPeacekeeping;
    
    // Calculate average stats based on selected level range
    const levels = [];
    for (let i = minBarbLevel; i <= maxBarbLevel; i++) {
      levels.push(BARBARIAN_DATA[i]);
    }
    
    const avgResources = Math.round(levels.reduce((sum, l) => sum + l.resources, 0) / levels.length);
    const avgStone = Math.round(levels.reduce((sum, l) => sum + l.stone, 0) / levels.length);
    const avgGold = Math.round(levels.reduce((sum, l) => sum + l.gold, 0) / levels.length);
    const avgXP = Math.round(levels.reduce((sum, l) => sum + l.xp, 0) / levels.length);
    const avgSpeedupBase = Math.round(levels.reduce((sum, l) => sum + l.speedupBase, 0) / levels.length * 10) / 10;
    
    let actualBarbCount = barbCount;
    
    // If calculating by XP goal
    if (calculationMode === 'xp' && desiredXP) {
      const xpGoal = parseInt(desiredXP) || 0;
      actualBarbCount = Math.ceil(xpGoal / avgXP);
    }

    // Calculate AP cost: first kill is more expensive, subsequent kills are cheaper
    let totalAPCost = 0;
    if (actualBarbCount > 0) {
      totalAPCost = apCosts.first + (Math.max(0, actualBarbCount - 1) * apCosts.subsequent);
    }

    // Calculate rewards
    const totalResources = actualBarbCount * avgResources;
    const totalStone = actualBarbCount * avgStone;
    const totalGold = actualBarbCount * avgGold;
    const totalXP = actualBarbCount * avgXP;
    
    // Speedups: base speedup per level + extra drops (19x5min + 77x1min per 125 barbs)
    const baseSpeedups = Math.round(actualBarbCount * avgSpeedupBase);
    const extraSpeedups = Math.floor(actualBarbCount * EXTRA_SPEEDUP_PER_BARB);
    const totalSpeedups = baseSpeedups + extraSpeedups;

    // Material drops
    const materials = {
      common: Math.floor(actualBarbCount * MATERIAL_RATES.common),
      uncommon: Math.floor(actualBarbCount * MATERIAL_RATES.uncommon),
      rare: (actualBarbCount * MATERIAL_RATES.rare).toFixed(2),
      epic: (actualBarbCount * MATERIAL_RATES.epic).toFixed(3),
      legendary: (actualBarbCount * MATERIAL_RATES.legendary).toFixed(4),
    };

    // Time calculations (in seconds then converted to minutes)
    // Kill time scales with marches: 5 marches = ~9s avg, 1 march = ~15s (game scales internally)
    const killTimePerMarch = simultaneousMarches === 5 ? 9 : simultaneousMarches === 4 ? 10 : simultaneousMarches === 3 ? 12 : simultaneousMarches === 2 ? 13 : 15;
    const totalTimePerBarb = killTimePerMarch + marchTime; // marchTime is now in seconds
    const effectiveTimePerBarb = totalTimePerBarb / simultaneousMarches;
    const totalSeconds = actualBarbCount * effectiveTimePerBarb;
    const totalMinutes = totalSeconds / 60;

    // AP regeneration during farming
    const apRegenPerMinute = 60 / apRegenSeconds;
    const apRegenerated = Math.floor(totalMinutes * apRegenPerMinute);
    const netAPCost = Math.max(0, totalAPCost - apRegenerated);

    return {
      barbCount: actualBarbCount,
      totalResources,
      totalStone,
      totalGold,
      totalXP,
      totalSpeedups,
      baseSpeedups,
      extraSpeedups,
      totalAPCost,
      apRegenerated,
      netAPCost,
      totalMinutes,
      totalHours: totalMinutes / 60,
      avgResources,
      avgStone,
      avgGold,
      avgXP,
      avgSpeedupBase,
      apCosts,
      materials,
    };
  }, [minBarbLevel, maxBarbLevel, barbCount, marchTime, apRegenSeconds, simultaneousMarches, calculationMode, desiredXP, hasPeacekeeping]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700/90 to-orange-600/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">{t('barbCalcTitle')}</h1>
          </div>
          <p className="text-amber-100 mt-2">{t('barbCalcSubtitle')}</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* Calculation Mode Toggle */}
          <div className="mb-6">
            <label className="block text-amber-200 font-semibold mb-3">{t('calculationMode')}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setCalculationMode('barbs')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  calculationMode === 'barbs'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {t('byBarbCount')}
              </button>
              <button
                onClick={() => setCalculationMode('xp')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  calculationMode === 'xp'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {t('byXPGoal')}
              </button>
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-amber-200 font-semibold mb-2">{t('barbLevelRange')}</label>
                <div className="flex gap-2 items-center">
                  <select
                    value={minBarbLevel}
                    onChange={(e) => {
                      const newMin = Number(e.target.value);
                      setMinBarbLevel(newMin);
                      if (newMin > maxBarbLevel) setMaxBarbLevel(newMin);
                    }}
                    className="flex-1 bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.keys(BARBARIAN_DATA).map((level) => (
                      <option key={level} value={level}>
                        Lvl {level}
                      </option>
                    ))}
                  </select>
                  <span className="text-amber-200 font-bold">{t('to')}</span>
                  <select
                    value={maxBarbLevel}
                    onChange={(e) => {
                      const newMax = Number(e.target.value);
                      setMaxBarbLevel(newMax);
                      if (newMax < minBarbLevel) setMinBarbLevel(newMax);
                    }}
                    className="flex-1 bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.keys(BARBARIAN_DATA).map((level) => (
                      <option key={level} value={level}>
                        Lvl {level}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-stone-400 text-sm mt-1">
                  {minBarbLevel === maxBarbLevel 
                    ? `${t('onlyLevel')} ${minBarbLevel} ${t('barbarians')}` 
                    : `${t('levels')} ${minBarbLevel}-${maxBarbLevel} (${maxBarbLevel - minBarbLevel + 1} ${t('levels')})`}
                </p>
              </div>

              {calculationMode === 'barbs' ? (
                <div>
                  <label className="block text-amber-200 font-semibold mb-2">{t('numberOfBarbarians')}</label>
                  <input
                    type="number"
                    value={barbCount}
                    onChange={(e) => setBarbCount(Number(e.target.value) || 0)}
                    min="1"
                    className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-amber-200 font-semibold mb-2">{t('desiredXP')}</label>
                  <input
                    type="number"
                    value={desiredXP}
                    onChange={(e) => setDesiredXP(e.target.value)}
                    placeholder="e.g. 1000000"
                    className={`w-full bg-stone-800 text-white border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      !desiredXP ? 'border-red-500' : 'border-amber-600'
                    }`}
                  />
                  {!desiredXP && (
                    <p className="text-red-400 text-sm mt-1">{t('pleaseEnterHonor').replace('honor points', 'XP')}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-amber-200 font-semibold mb-2">
                  {t('simultaneousMarches')}: {simultaneousMarches}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={simultaneousMarches}
                  onChange={(e) => setSimultaneousMarches(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-stone-400 text-sm">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>

              {/* Peacekeeping Toggle */}
              <div className="bg-stone-800/50 rounded-lg p-4 border border-amber-700/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPeacekeeping}
                    onChange={(e) => setHasPeacekeeping(e.target.checked)}
                    className="w-5 h-5 accent-amber-500"
                  />
                  <div>
                    <p className="text-amber-200 font-semibold">{t('peacekeepingTalent')}</p>
                    <p className="text-stone-400 text-sm">
                      {hasPeacekeeping 
                        ? `${t('ap')}: ${AP_COSTS.peacekeeping.first} ${t('apFirst')}, ${AP_COSTS.peacekeeping.subsequent} ${t('apAfter')}`
                        : `${t('ap')}: ${AP_COSTS.noPeacekeeping.first} ${t('apFirst')}, ${AP_COSTS.noPeacekeeping.subsequent} ${t('apAfter')}`
                      }
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-amber-200 font-semibold mb-2">
                  {t('marchTime')}: {Math.floor(marchTime / 60)}m {marchTime % 60}s
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={marchTime}
                  onChange={(e) => setMarchTime(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-stone-400 text-sm">
                  <span>0s</span>
                  <span>1 {t('min')}</span>
                </div>
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-2">
                  {t('apRegenRate').replace('X', apRegenSeconds.toString())}
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="1"
                  value={apRegenSeconds}
                  onChange={(e) => setApRegenSeconds(Number(e.target.value))}
                  className="w-full h-3 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-stone-400 mt-1">
                  <span>{t('fast')} (10s)</span>
                  <span>{t('slow')} (30s)</span>
                </div>
                <p className="text-stone-400 text-sm mt-2">
                  {t('duringSession')} ~{results.apRegenerated} {t('ap')}
                </p>
              </div>

              {/* Per Barbarian Info */}
              <div className="bg-stone-800/50 rounded-lg p-4 border border-amber-700/50">
                <p className="text-amber-200 font-semibold mb-2">
                  {minBarbLevel === maxBarbLevel 
                    ? `Lvl ${minBarbLevel} ${t('barbarianRewards')}:` 
                    : `${t('averageRewards')} (Lvl ${minBarbLevel}-${maxBarbLevel}):`}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-stone-300">{t('resources')}: <span className="text-amber-400">{formatNumber(results.avgResources)}</span></p>
                  <p className="text-stone-300">XP: <span className="text-blue-400">{formatNumber(results.avgXP)}</span></p>
                  <p className="text-stone-300">{t('baseSpeedup')}: <span className="text-green-400">{results.avgSpeedupBase} {t('min')}</span></p>
                  <p className="text-stone-300">{t('ap')}: <span className="text-red-400">{results.apCosts.first}/{results.apCosts.subsequent}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="border-t border-amber-700/50 pt-6">
            {/* Time Required */}
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-amber-200">{t('timeRequired')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">{t('totalTime')}</p>
                <p className="text-2xl font-bold text-white">{formatTime(results.totalMinutes)}</p>
              </div>
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">{t('timePerBarbarian')}</p>
                <p className="text-2xl font-bold text-white">
                  {results.barbCount > 0 ? Math.round((results.totalMinutes * 60) / results.barbCount) : 0}s
                </p>
              </div>
            </div>

            {/* Total Rewards */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-amber-200">{t('totalRewards')}</h3>
              </div>
              <p className="text-stone-400 text-sm">{results.barbCount} {t('barbarians')}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div 
                className="bg-gradient-to-br from-amber-800/50 to-amber-900/50 rounded-lg p-4 border-2 border-amber-600 cursor-help relative group"
                title={`${t('woodFood')}: ${formatNumber(results.totalResources)}\n${t('stone')}: ${formatNumber(results.totalStone)}\n${t('gold')}: ${formatNumber(results.totalGold)}`}
              >
                <p className="text-amber-300 text-sm font-semibold">{t('resources')} 🛈</p>
                <p className="text-3xl font-bold text-white">{formatNumber(results.totalResources)}</p>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 border border-amber-500 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <p className="text-amber-200">🌲 {t('woodFood')}: <span className="text-white">{formatNumber(results.totalResources)}</span></p>
                  <p className="text-stone-300">🪨 {t('stone')}: <span className="text-white">{formatNumber(results.totalStone)}</span></p>
                  <p className="text-yellow-300">🪙 {t('gold')}: <span className="text-white">{formatNumber(results.totalGold)}</span></p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-lg p-4 border-2 border-blue-600">
                <p className="text-blue-300 text-sm font-semibold">{t('commanderXP')}</p>
                <p className="text-3xl font-bold text-white">{formatNumber(results.totalXP)}</p>
              </div>
              
              <div 
                className="bg-gradient-to-br from-green-800/50 to-green-900/50 rounded-lg p-4 border-2 border-green-600 cursor-help relative group"
              >
                <p className="text-green-300 text-sm font-semibold">{t('speedups')} 🛈</p>
                <p className="text-3xl font-bold text-white">{formatNumber(results.totalSpeedups)} {t('min')}</p>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 border border-green-500 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <p className="text-green-200">⏱️ {results.totalSpeedups.toLocaleString()} {t('minutes')}</p>
                  <p className="text-green-200">⏱️ {(results.totalSpeedups / 60).toFixed(1)} {t('hours')}</p>
                  <p className="text-green-200">⏱️ {(results.totalSpeedups / 60 / 24).toFixed(2)} {t('days')}</p>
                  <p className="text-stone-400 text-xs mt-1">⚠️ {t('estimatesNote')}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-800/50 to-red-900/50 rounded-lg p-4 border-2 border-red-600">
                <p className="text-red-300 text-sm font-semibold">{t('netApCost')}</p>
                <p className="text-3xl font-bold text-white">{formatNumber(results.netAPCost)}</p>
                <p className="text-red-400 text-xs">
                  {formatNumber(results.totalAPCost)} - {formatNumber(results.apRegenerated)} regen
                </p>
              </div>
            </div>

            {/* Material Drops */}
            <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-lg p-4 border border-purple-600 mb-4">
              <p className="text-purple-200 font-semibold mb-3">🎁 {t('materialDrops')} ({t('estimated')})</p>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div>
                  <p className="text-gray-300 text-xs">{t('common')}</p>
                  <p className="text-white font-bold">{results.materials.common}</p>
                </div>
                <div>
                  <p className="text-green-300 text-xs">{t('uncommon')}</p>
                  <p className="text-green-400 font-bold">{results.materials.uncommon}</p>
                </div>
                <div>
                  <p className="text-blue-300 text-xs">{t('rare')}</p>
                  <p className="text-blue-400 font-bold">{results.materials.rare}</p>
                </div>
                <div>
                  <p className="text-purple-300 text-xs">{t('epic')}</p>
                  <p className="text-purple-400 font-bold">{results.materials.epic}</p>
                </div>
                <div>
                  <p className="text-orange-300 text-xs">{t('legendary')}</p>
                  <p className="text-orange-400 font-bold">{results.materials.legendary}</p>
                </div>
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="flex flex-wrap gap-6 text-sm">
                <p className="text-stone-300">
                  {t('barbariansPerHour')}: <span className="text-white font-semibold">{results.totalMinutes > 0 ? Math.round(results.barbCount / (results.totalMinutes / 60)) : 0}</span>
                </p>
                <p className="text-stone-300">
                  {t('xpPerHour')}: <span className="text-blue-400 font-semibold">{results.totalHours > 0 ? formatNumber(results.totalXP / results.totalHours) : 0}</span>
                </p>
                <p className="text-stone-300">
                  {t('resourcesPerHour')}: <span className="text-amber-400 font-semibold">{results.totalHours > 0 ? formatNumber(results.totalResources / results.totalHours) : 0}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default BarbarianCalculatorPage;
