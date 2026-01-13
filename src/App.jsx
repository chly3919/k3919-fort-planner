import React, { useState, useMemo } from 'react';
import { Calculator, Swords, Clock, Trophy, Home, Flame, ChevronRight, Shield, Target, Zap } from 'lucide-react';

const FORT_DATA = {
  1: {
    honorPoints: 0,
    tier1: { resource: 9, tome: 5, speedup: 5, covenant: 1 },
    tier2: { resource: 10, tome: 13, speedup: 5, covenant: 3 },
    tier3: { resource: 12, tome: 15, speedup: 10, covenant: 3 },
    tier4: { resource: 14, tome: 17, speedup: 10, covenant: 3 },
    tier5: { resource: 15, tome: 19, speedup: 10, covenant: 4 }
  },
  2: {
    honorPoints: 0,
    tier1: { resource: 9, tome: 5, speedup: 5, covenant: 1 },
    tier2: { resource: 18, tome: 15, speedup: 5, covenant: 3 },
    tier3: { resource: 20, tome: 17, speedup: 10, covenant: 3 },
    tier4: { resource: 22, tome: 19, speedup: 10, covenant: 3 },
    tier5: { resource: 23, tome: 21, speedup: 10, covenant: 4 }
  },
  3: {
    honorPoints: 0,
    tier1: { resource: 12, tome: 6, speedup: 10, covenant: 1 },
    tier2: { resource: 25, tome: 20, speedup: 10, covenant: 3 },
    tier3: { resource: 27, tome: 22, speedup: 20, covenant: 3 },
    tier4: { resource: 29, tome: 24, speedup: 20, covenant: 3 },
    tier5: { resource: 30, tome: 26, speedup: 20, covenant: 4 }
  },
  4: {
    honorPoints: 0,
    tier1: { resource: 15, tome: 8, speedup: 10, covenant: 1 },
    tier2: { resource: 32, tome: 24, speedup: 10, covenant: 3 },
    tier3: { resource: 34, tome: 26, speedup: 20, covenant: 3 },
    tier4: { resource: 36, tome: 28, speedup: 20, covenant: 3 },
    tier5: { resource: 37, tome: 30, speedup: 25, covenant: 4 }
  },
  5: {
    honorPoints: 0,
    tier1: { resource: 20, tome: 10, speedup: 10, covenant: 1 },
    tier2: { resource: 40, tome: 30, speedup: 10, covenant: 3 },
    tier3: { resource: 42, tome: 33, speedup: 20, covenant: 3 },
    tier4: { resource: 44, tome: 36, speedup: 20, covenant: 3 },
    tier5: { resource: 45, tome: 40, speedup: 25, covenant: 4 }
  },
  6: {
    honorPoints: 15,
    tier1: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier2: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier3: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier4: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier5: { resource: 0, tome: 0, speedup: 0, covenant: 0 }
  },
  7: {
    honorPoints: 25,
    tier1: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier2: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier3: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier4: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier5: { resource: 0, tome: 0, speedup: 0, covenant: 0 }
  },
  8: {
    honorPoints: 35,
    tier1: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier2: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier3: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier4: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier5: { resource: 0, tome: 0, speedup: 0, covenant: 0 }
  },
  9: {
    honorPoints: 45,
    tier1: { resource: 54, tome: 40, speedup: 38, covenant: 4 },
    tier2: { resource: 56, tome: 42, speedup: 38, covenant: 4 },
    tier3: { resource: 58, tome: 45, speedup: 38, covenant: 4 },
    tier4: { resource: 60, tome: 48, speedup: 38, covenant: 4 },
    tier5: { resource: 62, tome: 51, speedup: 45, covenant: 4 }
  },
  10: {
    honorPoints: 60,
    tier1: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier2: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier3: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier4: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier5: { resource: 0, tome: 0, speedup: 0, covenant: 0 }
  }
};

const BATTLE_TIME = 5;

// Animated Ember Background Component
function FlameBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Clean dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      
      {/* Ember particles only */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={`ember-${i}`}
            className="absolute rounded-full animate-ember"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-5%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f97316' : '#ef4444',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              opacity: 0.5 + Math.random() * 0.5,
              boxShadow: `0 0 ${4 + Math.random() * 6}px ${i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f97316' : '#ef4444'}`,
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes ember {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${30 + Math.random() * 50}px) scale(0.3);
            opacity: 0;
          }
        }
        
        .animate-ember {
          animation: ember ease-out infinite;
        }
      `}</style>
    </div>
  );
}

// Navigation Component
function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="relative z-10 bg-stone-900/80 backdrop-blur-sm border-b border-amber-700/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-200 via-orange-400 to-red-500 bg-clip-text text-transparent">K3919 Barbarian Fort Planner</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                currentPage === 'home'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-200 hover:bg-stone-800'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => setCurrentPage('calculator')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                currentPage === 'calculator'
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-200 hover:bg-stone-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Home Page Component
function HomePage({ setCurrentPage }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-4xl">
          {/* Animated Logo */}
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-amber-600 to-orange-700 p-8 rounded-full shadow-2xl border-4 border-amber-500/50">
              <Swords className="w-24 h-24 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            K3919 Barbarian Fort Planner
          </h1>
          <p className="text-xl text-amber-100/80 mb-12 max-w-2xl mx-auto">
            Plan your fort farming sessions with precision. Calculate rewards, time, and AP costs for maximum efficiency.
          </p>
          
          {/* CTA Button */}
          <button
            onClick={() => setCurrentPage('calculator')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xl font-bold px-10 py-5 rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-orange-500/25"
          >
            <Calculator className="w-6 h-6" />
            Start Calculating
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
          </button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="relative z-10 bg-stone-900/80 backdrop-blur-sm border-t border-amber-700/30 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-200 text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="w-10 h-10" />}
              title="Goal Planning"
              description="Calculate by number of forts or set a specific honor points target to reach."
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="AP Management"
              description="Track AP costs and regeneration to optimize your farming sessions."
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title="Complete Rewards"
              description="See all rewards including resources, tomes, speedups, and covenant books."
            />
          </div>
        </div>
      </div>
      
      /* Fort Levels Quick Reference - Removed */
      
      {/* Footer */}
      <footer className="relative z-10 bg-stone-900/90 border-t border-amber-700/30 py-6 px-4 text-center">
        <p className="text-stone-400 text-sm">
          K3919 Barbarian Fort Planner • Made for Rise of Kingdoms Kingdom 3919
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30 hover:border-amber-600/50 transition-all hover:transform hover:scale-105">
      <div className="text-amber-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-amber-100 mb-2">{title}</h3>
      <p className="text-stone-400">{description}</p>
    </div>
  );
}

// Calculator Page Component
function CalculatorPage() {
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
            <h1 className="text-3xl font-bold text-white">Barbarian Fort Calculator</h1>
          </div>
          <p className="text-amber-100 mt-2">Calculate rewards and time for your fort farming sessions</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* Calculation Mode Toggle */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500 shadow-lg">
            <label className="block text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Calculation Mode
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
                📊 By Number of Forts
              </button>
              <button
                onClick={() => setCalculationMode('points')}
                className={`p-4 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  calculationMode === 'points'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-2 border-amber-300 shadow-xl'
                    : 'bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600'
                }`}
              >
                🎯 By Honor Points Goal
              </button>
            </div>
            {calculationMode === 'points' && (
              <div className="mt-3 bg-amber-900/30 border border-amber-600 rounded p-3">
                <p className="text-amber-200 text-sm">
                  💡 Enter your target honor points below to calculate required forts
                </p>
              </div>
            )}
          </div>

          {/* Input Controls */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div>
              <label className="block text-amber-300 font-semibold mb-2">Fort Level</label>
              <select 
                value={fortLevel} 
                onChange={(e) => setFortLevel(parseInt(e.target.value))}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="1">Fort 1</option>
                <option value="2">Fort 2</option>
                <option value="3">Fort 3</option>
                <option value="4">Fort 4</option>
                <option value="5">Fort 5</option>
                <option value="6">Fort 6 (15 pts) - TBD</option>
                <option value="7">Fort 7 (25 pts) - TBD</option>
                <option value="8">Fort 8 (35 pts) - TBD</option>
                <option value="9">Fort 9 (45 pts)</option>
                <option value="10">Fort 10 (60 pts) - TBD</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">Tier Trophy Rewards</label>
              <select 
                value={tier} 
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="tier1">Tier 1</option>
                <option value="tier2">Tier 2</option>
                <option value="tier3">Tier 3</option>
                <option value="tier4">Tier 4</option>
                <option value="tier5">Tier 5</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">AP Cost per Fort</label>
              <select 
                value={apPerFort} 
                onChange={(e) => setApPerFort(parseInt(e.target.value))}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="150">150 AP (Standard)</option>
                <option value="140">140 AP (Insight)</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                March Time: {marchTime} min
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
                <span>0m</span>
                <span>10m</span>
              </div>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                {calculationMode === 'forts' ? '📊 Number of Forts' : '🎯 Desired Honor Points'}
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
                    placeholder="Enter honor points goal..."
                    required
                    className={`w-full bg-stone-800 text-white border-2 rounded-lg p-3 focus:outline-none focus:ring-2 ${
                      desiredPoints === '' 
                        ? 'border-red-500 focus:ring-red-400 placeholder-red-400/70' 
                        : 'border-yellow-500 focus:ring-yellow-400'
                    }`}
                  />
                  {desiredPoints === '' ? (
                    <p className="text-red-400 text-sm mt-2 font-semibold bg-red-900/30 rounded px-2 py-1 border border-red-700">
                      ⚠️ Please enter your honor points goal
                    </p>
                  ) : (
                    <p className="text-yellow-300 text-sm mt-2 font-semibold bg-yellow-900/30 rounded px-2 py-1 border border-yellow-700">
                      ⚔️ Requires {results.actualFortCount} fort{results.actualFortCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Simultaneous Forts and AP Regen */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-amber-300 font-semibold mb-2">Simultaneous Forts</label>
              <select 
                value={simultaneousForts} 
                onChange={(e) => setSimultaneousForts(parseInt(e.target.value))}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="1">1 Fort (1 March)</option>
                <option value="2">2 Forts (2 Marches)</option>
                <option value="3">3 Forts (3 Marches)</option>
                <option value="4">4 Forts (4 Marches)</option>
                <option value="5">5 Forts (5 Marches)</option>
              </select>
              <p className="text-stone-400 text-xs mt-1">
                Running {results.totalBatches} batch{results.totalBatches !== 1 ? 'es' : ''} total
              </p>
            </div>
            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                AP Regeneration (1 AP every X seconds): {apRegenSeconds}s
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
                <span>Fast (10s)</span>
                <span>Slow (30s)</span>
              </div>
              <p className="text-stone-400 text-sm mt-2">
                During this session you'll naturally regenerate ~{results.apRegenerated} AP
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border-2 border-amber-700">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-amber-300">Time Required</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">Total Time</p>
                <p className="text-2xl font-bold text-white">
                  {results.timeHours > 0 && `${results.timeHours}h `}
                  {results.timeMinutes}m
                </p>
              </div>
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">Time per Fort</p>
                <p className="text-2xl font-bold text-white">
                  {formatTime(BATTLE_TIME + marchTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-amber-300">Total Rewards</h2>
              </div>
              <p className="text-stone-400 text-sm italic">💡 Hover over cards for details</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <RewardCard
                title="Honor Points / Tech Tokens"
                value={results.totalHonorPoints.toLocaleString()}
                gradient="from-yellow-900 to-yellow-950"
                border="border-yellow-600"
                textColor="text-yellow-200"
                tooltip={
                  <>
                    <p className="text-yellow-300 font-semibold text-xs mb-2">Honor Points Breakdown:</p>
                    <p className="text-white text-xs">{results.honorPointsPerFort} points × {results.actualFortCount} forts</p>
                    <p className="text-white text-xs mt-1">= {results.totalHonorPoints.toLocaleString()} total points</p>
                    <div className="border-t border-yellow-700 mt-2 pt-2">
                      <p className="text-yellow-200 text-xs">Level {fortLevel} fort rewards</p>
                    </div>
                  </>
                }
              />
              <RewardCard
                title="Lvl 2 Resource Packs"
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

// Main App Component
export default function BarbFortCalculator() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen relative">
      <FlameBackground />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' ? (
        <HomePage setCurrentPage={setCurrentPage} />
      ) : (
        <CalculatorPage />
      )}
    </div>
  );
}
