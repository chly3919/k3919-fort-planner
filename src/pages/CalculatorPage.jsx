import React, { useMemo, useState } from 'react';
import { Calculator, Clock, Swords, Trophy } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { BATTLE_TIME, FORT_DATA } from '../data';

function CalculatorPage() {
  const { t } = useLanguage();
  const [fortLevel, setFortLevel] = useState(5);
  const [tier, setTier] = useState('tier3');
  const [marchTime, setMarchTime] = useState(5);
  const [fortCount, setFortCount] = useState(10);
  const [apPerFort, setApPerFort] = useState(150);
  const [apRegenSeconds, setApRegenSeconds] = useState(18);
  const [simultaneousForts, setSimultaneousForts] = useState(1);
  const [calculationMode, setCalculationMode] = useState('forts');
  const [desiredPoints, setDesiredPoints] = useState('');

  const results = useMemo(() => {
    const fortData = FORT_DATA[fortLevel];
    const rewards = fortData[tier] || { resource: 0, tome: 0, speedup: 0, covenant: 0 };
    const honorPoints = fortData.honorPoints;
    
    const actualFortCount = calculationMode === 'points' 
      ? (desiredPoints && honorPoints > 0 ? Math.ceil(Number(desiredPoints) / honorPoints) : 0)
      : fortCount;
    
    const totalBatches = Math.ceil(actualFortCount / simultaneousForts);
    const totalTime = totalBatches * (BATTLE_TIME + marchTime);
    
    const totalAP = actualFortCount * apPerFort;
    
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    
    const totalTimeSeconds = totalTime * 60;
    const apRegenerated = Math.floor(totalTimeSeconds / apRegenSeconds);
    const netAPCost = totalAP - apRegenerated;
    
    return {
      totalResource: rewards.resource * actualFortCount,
      totalTome: rewards.tome * actualFortCount,
      totalSpeedup: rewards.speedup * actualFortCount,
      totalCovenant: rewards.covenant * actualFortCount,
      totalHonorPoints: honorPoints * actualFortCount,
      honorPointsPerFort: honorPoints,
      actualFortCount,
      totalAP,
      apRegenerated,
      netAPCost: Math.max(0, netAPCost),
      timeHours: hours,
      timeMinutes: minutes,
      totalTimeMinutes: totalTime,
      totalBatches
    };
  }, [fortLevel, tier, marchTime, fortCount, apPerFort, apRegenSeconds, simultaneousForts, calculationMode, desiredPoints]);

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-amber-700/90 to-orange-600/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <Swords className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">{t('fortCalcTitle')}</h1>
          </div>
          <p className="text-amber-100 mt-2">{t('fortCalcSubtitle')}</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* Calculation Mode Toggle */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500 shadow-lg">
            <label className="block text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              {t('calculationMode')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCalculationMode('forts')}
                className={`p-4 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  calculationMode === 'forts'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-2 border-amber-300 shadow-xl'
                    : 'bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600'
                }`}
              >
                📊 {t('byNumberOfForts')}
              </button>
              <button
                onClick={() => setCalculationMode('points')}
                className={`p-4 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  calculationMode === 'points'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-2 border-amber-300 shadow-xl'
                    : 'bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600'
                }`}
              >
                🎯 {t('byHonorPoints')}
              </button>
            </div>
            {calculationMode === 'points' && (
              <div className="mt-3 bg-amber-900/30 border border-amber-600 rounded p-3">
                <p className="text-amber-200 text-sm">
                  💡 {t('enterTargetHonor')}
                </p>
              </div>
            )}
          </div>

          {/* Input Controls */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div>
              <label className="block text-amber-300 font-semibold mb-2">{t('fortLevel')}</label>
              <select 
                value={fortLevel} 
                onChange={(e) => setFortLevel(parseInt(e.target.value))}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="1">{t('fort')} 1</option>
                <option value="2">{t('fort')} 2</option>
                <option value="3">{t('fort')} 3</option>
                <option value="4">{t('fort')} 4</option>
                <option value="5">{t('fort')} 5</option>
                <option value="6">{t('fort')} 6 (15 {t('pts')}) - {t('tbd')}</option>
                <option value="7">{t('fort')} 7 (25 {t('pts')}) - {t('tbd')}</option>
                <option value="8">{t('fort')} 8 (35 {t('pts')}) - {t('tbd')}</option>
                <option value="9">{t('fort')} 9 (45 {t('pts')})</option>
                <option value="10">{t('fort')} 10 (60 {t('pts')})</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">{t('tierTrophyRewards')}</label>
              <select 
                value={tier} 
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="tier1">{t('tier')} 1</option>
                <option value="tier2">{t('tier')} 2</option>
                <option value="tier3">{t('tier')} 3</option>
                <option value="tier4">{t('tier')} 4</option>
                <option value="tier5">{t('tier')} 5</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">{t('apCostPerFort')}</label>
              <div className="bg-stone-800/50 rounded-lg p-4 border border-amber-700/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={apPerFort === 140}
                    onChange={(e) => setApPerFort(e.target.checked ? 140 : 150)}
                    className="w-5 h-5 accent-amber-500"
                  />
                  <div>
                    <p className="text-amber-200 font-semibold">{t('insightTalent')}</p>
                    <p className="text-stone-400 text-sm">
                      {apPerFort === 140 ? `140 ${t('apPerFortInsight')}` : `150 ${t('apPerFortStandard')}`}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                {t('marchTime')}: {marchTime} {t('min')}
              </label>
              <input 
                type="range" 
                min="0" 
                max="10" 
                step="0.5"
                value={marchTime}
                onChange={(e) => setMarchTime(parseFloat(e.target.value))}
                className="w-full h-3 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>0{t('min')}</span>
                <span>10{t('min')}</span>
              </div>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                {calculationMode === 'forts' ? `📊 ${t('numberOfForts')}` : `🎯 ${t('desiredHonorPoints')}`}
              </label>
              {calculationMode === 'forts' ? (
                <input 
                  type="number" 
                  min="1" 
                  max="200"
                  value={fortCount}
                  onChange={(e) => setFortCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              ) : (
                <>
                  <input 
                    type="number" 
                    min="1" 
                    max="100000"
                    value={desiredPoints}
                    onChange={(e) => setDesiredPoints(e.target.value)}
                    placeholder={t('enterHonorGoal')}
                    required
                    className={`w-full bg-stone-800 text-white border-2 rounded-lg p-3 focus:outline-none focus:ring-2 ${
                      desiredPoints === '' 
                        ? 'border-red-500 focus:ring-red-400 placeholder-red-400/70' 
                        : 'border-yellow-500 focus:ring-yellow-400'
                    }`}
                  />
                  {desiredPoints === '' ? (
                    <p className="text-red-400 text-sm mt-2 font-semibold bg-red-900/30 rounded px-2 py-1 border border-red-700">
                      ⚠️ {t('pleaseEnterHonor')}
                    </p>
                  ) : (
                    <p className="text-yellow-300 text-sm mt-2 font-semibold bg-yellow-900/30 rounded px-2 py-1 border border-yellow-700">
                      ⚔️ {t('requires')} {results.actualFortCount} {results.actualFortCount !== 1 ? t('forts') : t('fort')}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Simultaneous Forts and AP Regen */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-amber-300 font-semibold mb-2">{t('simultaneousForts')}</label>
              <select 
                value={simultaneousForts} 
                onChange={(e) => setSimultaneousForts(parseInt(e.target.value))}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="1">1 {t('fort')} (1 {t('march')})</option>
                <option value="2">2 {t('forts')} (2 {t('marches')})</option>
                <option value="3">3 {t('forts')} (3 {t('marches')})</option>
                <option value="4">4 {t('forts')} (4 {t('marches')})</option>
                <option value="5">5 {t('forts')} (5 {t('marches')})</option>
              </select>
              <p className="text-stone-400 text-xs mt-1">
                {t('runningBatches')} {results.totalBatches} {results.totalBatches !== 1 ? t('batchesTotal') : t('batch')}
              </p>
            </div>
            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                {t('apRegenRate')}: {apRegenSeconds}s
              </label>
              <input 
                type="range" 
                min="10" 
                max="30" 
                step="1"
                value={apRegenSeconds}
                onChange={(e) => setApRegenSeconds(parseInt(e.target.value))}
                className="w-full h-3 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>{t('fast')} (10s)</span>
                <span>{t('slow')} (30s)</span>
              </div>
              <p className="text-stone-400 text-sm mt-2">
                {t('duringSession')} ~{results.apRegenerated} {t('ap')}
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border-2 border-amber-700">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-amber-300">{t('timeRequired')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">{t('totalTime')}</p>
                <p className="text-2xl font-bold text-white">
                  {results.timeHours > 0 && `${results.timeHours}h `}
                  {results.timeMinutes}m
                </p>
              </div>
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">{t('timePerFort')}</p>
                <p className="text-2xl font-bold text-white">
                  {formatTime(BATTLE_TIME + marchTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-amber-300">{t('totalRewards')}</h2>
              </div>
              <p className="text-stone-400 text-sm italic">💡 {t('hoverForDetails')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <RewardCard
                title={t('honorPoints')}
                value={results.totalHonorPoints.toLocaleString()}
                gradient="from-yellow-900 to-yellow-950"
                border="border-yellow-600"
                textColor="text-yellow-200"
                tooltip={
                  <>
                    <p className="text-yellow-300 font-semibold text-xs mb-2">{t('honorPoints')}:</p>
                    <p className="text-white text-xs">{results.honorPointsPerFort} {t('pts')} × {results.actualFortCount} {t('forts')}</p>
                    <p className="text-white text-xs mt-1">= {results.totalHonorPoints.toLocaleString()} {t('pts')}</p>
                    <div className="border-t border-yellow-700 mt-2 pt-2">
                      <p className="text-yellow-200 text-xs">{t('fort')} {fortLevel}</p>
                    </div>
                  </>
                }
              />
              <RewardCard
                title={t('resourcePacks')}
                value={results.totalResource.toLocaleString()}
                gradient="from-green-900 to-green-950"
                border="border-green-600"
                textColor="text-green-200"
                tooltip={
                  <>
                    <p className="text-green-300 font-semibold text-xs mb-2">Random reward per pack (25% each):</p>
                    <p className="text-white text-xs">• 10,000 Food</p>
                    <p className="text-white text-xs">• 10,000 Wood</p>
                    <p className="text-white text-xs">• 7,500 Stone</p>
                    <p className="text-white text-xs">• 5,000 Gold</p>
                    <div className="border-t border-green-700 mt-2 pt-2">
                      <p className="text-green-300 font-semibold text-xs mb-1">Expected totals:</p>
                      <p className="text-white text-xs">Food: ~{((results.totalResource * 10000) / 4).toLocaleString()}</p>
                      <p className="text-white text-xs">Wood: ~{((results.totalResource * 10000) / 4).toLocaleString()}</p>
                      <p className="text-white text-xs">Stone: ~{((results.totalResource * 7500) / 4).toLocaleString()}</p>
                      <p className="text-white text-xs">Gold: ~{((results.totalResource * 5000) / 4).toLocaleString()}</p>
                    </div>
                  </>
                }
              />
              <RewardCard
                title="Lvl 3 Tome of Knowledge"
                value={results.totalTome.toLocaleString()}
                gradient="from-blue-900 to-blue-950"
                border="border-blue-600"
                textColor="text-blue-200"
                tooltip={
                  <>
                    <p className="text-blue-300 font-semibold text-xs mb-1">Commander XP:</p>
                    <p className="text-white text-xs">• 1,000 XP per tome</p>
                    <p className="text-blue-200 text-xs mt-1">Total XP: {(results.totalTome * 1000).toLocaleString()}</p>
                  </>
                }
              />
              <RewardCard
                title="Speedups Estimated"
                value={formatTime(results.totalSpeedup)}
                gradient="from-purple-900 to-purple-950"
                border="border-purple-600"
                textColor="text-purple-200"
                tooltip={
                  <>
                    <p className="text-purple-300 font-semibold text-xs mb-2">Total Speedups:</p>
                    <p className="text-white text-xs">Minutes: {results.totalSpeedup.toLocaleString()}</p>
                    <p className="text-white text-xs">Hours: {(results.totalSpeedup / 60).toFixed(1)}</p>
                    <p className="text-white text-xs">Days: {(results.totalSpeedup / 1440).toFixed(2)}</p>
                  </>
                }
              />
              <RewardCard
                title="Net AP Cost"
                value={results.netAPCost.toLocaleString()}
                gradient="from-red-900 to-red-950"
                border="border-red-600"
                textColor="text-red-200"
                tooltip={
                  <>
                    <p className="text-red-300 font-semibold text-xs mb-2">AP Breakdown:</p>
                    <p className="text-white text-xs">Total Cost: {results.totalAP.toLocaleString()} AP</p>
                    <p className="text-green-300 text-xs">Regenerated: -{results.apRegenerated.toLocaleString()} AP</p>
                    <div className="border-t border-red-700 mt-2 pt-2">
                      <p className="text-white text-xs font-semibold">Net Cost: {results.netAPCost.toLocaleString()} AP</p>
                    </div>
                    <p className="text-red-200 text-xs mt-2">{apPerFort === 140 ? 'Using Insight talent' : 'Standard AP cost'}</p>
                  </>
                }
              />
              <RewardCard
                title="Books of Covenant"
                value={results.totalCovenant.toLocaleString()}
                gradient="from-orange-900 to-orange-950"
                border="border-orange-600"
                textColor="text-orange-200"
                tooltip={
                  <>
                    <p className="text-orange-300 font-semibold text-xs mb-2">Note:</p>
                    <p className="text-white text-xs max-w-xs">~50% chance per tier. May also receive</p>
                    <p className="text-white text-xs">Silver/Gold Keys, Gems, or Starlight Sculptures</p>
                  </>
                }
              />
            </div>
          </div>

          {/* Per Fort Rewards */}
          <div className="mt-6 bg-stone-800/80 rounded-lg p-4 border border-amber-700">
            <h3 className="text-amber-300 font-semibold mb-2">Per Fort Rewards (Fort {fortLevel} - {tier.toUpperCase()})</h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-stone-400">Resource Packs</p>
                <p className="text-white font-semibold">{FORT_DATA[fortLevel][tier]?.resource || 0}</p>
              </div>
              <div>
                <p className="text-stone-400">Tomes</p>
                <p className="text-white font-semibold">{FORT_DATA[fortLevel][tier]?.tome || 0}</p>
              </div>
              <div>
                <p className="text-stone-400">Speedups</p>
                <p className="text-white font-semibold">{FORT_DATA[fortLevel][tier]?.speedup || 0}m</p>
              </div>
              <div>
                <p className="text-stone-400">Covenant Books</p>
                <p className="text-white font-semibold">{FORT_DATA[fortLevel][tier]?.covenant || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardCard({ title, value, gradient, border, textColor, tooltip }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg p-4 border-2 ${border} relative group cursor-help`}>
      <p className={`${textColor} text-sm font-semibold`}>{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {tooltip && (
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-stone-950 ${border} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10`}>
          {tooltip}
        </div>
      )}
    </div>
  );
}


export default CalculatorPage;
