import React, { useState } from 'react';
import { Shield, Swords, Target, Users, Trophy, Zap, Clock, MapPin, RotateCcw } from 'lucide-react';
import QuickStat from '../components/ark/QuickStat';
import ObjectiveCard from '../components/ark/ObjectiveCard';
import RoleCard from '../components/ark/RoleCard';
import PhaseCard from '../components/ark/PhaseCard';
import StrategyCard from '../components/ark/StrategyCard';
import SeasonAccordion from '../components/ark/SeasonAccordion';
import TroopTypeSection from '../components/ark/TroopTypeSection';
import ProTip from '../components/ark/ProTip';

// Ark of Osiris Guide Component
// Data sourced from riseofkingdomsguides.com (February 2026)
export default function ArkOfOsirisGuide() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSeason, setExpandedSeason] = useState('soc');

  // Role checklist state
  const [myRole, setMyRole] = useState(null);
  const [completedDuties, setCompletedDuties] = useState({});

  const tabs = [
    { id: 'overview',   label: 'Overview',    icon: <Shield className="w-4 h-4" /> },
    { id: 'roles',      label: 'Team Roles',  icon: <Users className="w-4 h-4" /> },
    { id: 'strategy',   label: 'Strategy',    icon: <Target className="w-4 h-4" /> },
    { id: 'commanders', label: 'Commanders',  icon: <Swords className="w-4 h-4" /> },
    { id: 'scoring',    label: 'Scoring',     icon: <Trophy className="w-4 h-4" /> },
    { id: 'tips',       label: 'Pro Tips',    icon: <Zap className="w-4 h-4" /> },
  ];

  const toggleSeason = (season) => {
    setExpandedSeason(expandedSeason === season ? null : season);
  };

  const handleSetMyRole = (roleName) => {
    setMyRole(prev => prev === roleName ? null : roleName);
  };

  const handleToggleDuty = (roleName, dutyIndex) => {
    setCompletedDuties(prev => {
      const current = prev[roleName] || [];
      const updated = [...current];
      updated[dutyIndex] = !updated[dutyIndex];
      return { ...prev, [roleName]: updated };
    });
  };

  const resetChecklist = () => {
    setMyRole(null);
    setCompletedDuties({});
  };

  const anyChecked = myRole !== null || Object.values(completedDuties).some(arr => arr.some(Boolean));

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-amber-800/90 via-amber-700/90 to-orange-700/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30 relative overflow-hidden">
          {/* Decorative highlight */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 15% 50%, rgba(255,255,255,0.35) 0%, transparent 55%), radial-gradient(ellipse at 85% 50%, rgba(255,255,255,0.1) 0%, transparent 55%)' }}
          />
          <div className="relative flex items-center gap-4">
            <div className="bg-amber-900/60 p-3 rounded-full border border-amber-400/30 shadow-lg shrink-0">
              <Shield className="w-9 h-9 text-amber-200" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Ark of Osiris Guide</h1>
              <p className="text-amber-100/80 mt-1 text-sm">Complete strategy guide for RoK's premier alliance event</p>
            </div>
          </div>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="bg-stone-800/90 backdrop-blur-sm border-x border-amber-700/30 overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 font-semibold transition-all duration-200 whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-b from-amber-600 to-amber-700 text-white'
                    : 'text-amber-200/70 hover:bg-stone-700/80 hover:text-amber-100'
                }`}
              >
                <span className={`transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                  {tab.icon}
                </span>
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-300/70" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content Area ── */}
        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">

          {/* Keyed wrapper re-mounts on tab switch → triggers CSS entrance animation */}
          <div key={activeTab} className="animate-fade-in-up">

            {/* ── Overview Tab ── */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border border-amber-700/50">
                  <h2 className="text-2xl font-bold text-amber-300 mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    What is Ark of Osiris?
                  </h2>
                  <p className="text-stone-300 leading-relaxed">
                    Ark of Osiris (AoO) is a competitive alliance battle mode where two alliances are matched randomly
                    and each pick about <span className="text-amber-400 font-bold">30 players</span> to fight against each other.
                    Players must hold structures to gain points, and the team with the most points wins. It arrives
                    approximately every two weeks and is one of the most competitive modes in Rise of Kingdoms.
                  </p>
                </div>

                {/* Quick Stats — staggered entrance */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <QuickStat icon={<Users />}  label="Team Size"     value="~30 vs 30"   animationDelay={0} />
                  <QuickStat icon={<Clock />}  label="Duration"      value="60 min"       animationDelay={60} />
                  <QuickStat icon={<MapPin />} label="Map Lanes"     value="3 or 5"       animationDelay={120} />
                  <QuickStat icon={<Trophy />} label="Win Condition" value="Most Points"  animationDelay={180} />
                </div>

                {/* Key Objectives */}
                <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border border-amber-700/50">
                  <h3 className="text-xl font-bold text-amber-300 mb-4">Key Objectives</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ObjectiveCard
                      name="The Ark"
                      points="2 pts/sec when held"
                      desc="Spawns in the middle. Escort to your base for massive points. Carrier moves slower."
                      color="amber"
                    />
                    <ObjectiveCard
                      name="Obelisks"
                      points="1 pt/sec each"
                      desc="Multiple obelisks to capture and hold. First to occupy earns teleports."
                      color="blue"
                    />
                    <ObjectiveCard
                      name="Shrines / Caravans"
                      points="Supply points"
                      desc="Gather from caravan nodes for massive supply points. Use farmers like Joan, Sarka, Constance."
                      color="green"
                    />
                    <ObjectiveCard
                      name="Outposts"
                      points="Back buildings"
                      desc="Little buildings in the back. Put marches in them, then teleport to obelisks."
                      color="purple"
                    />
                  </div>
                </div>

                {/* Divine Intervention Info */}
                <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4">
                  <h4 className="text-amber-300 font-semibold mb-2">📍 Divine Intervention (Teleport System)</h4>
                  <p className="text-stone-300 text-sm">
                    Most teams have <span className="text-amber-400 font-bold">Divine Intervention</span> which gives extra teleports.
                    Be careful when teleporting immediately — leave space for teammates. If you're second or third string,
                    pay attention to your outposts and teleport strategically to obelisks of your choosing.
                  </p>
                </div>
              </div>
            )}

            {/* ── Team Roles Tab ── */}
            {activeTab === 'roles' && (
              <div className="space-y-6">
                {/* Checklist toolbar */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-stone-300 text-sm">
                      Select <span className="text-amber-400 font-semibold">your role</span> for this match, then check off duties as you complete them.
                    </p>
                    {myRole && (
                      <p className="text-amber-400 text-xs mt-1 font-semibold">
                        📌 Current role: {myRole}
                      </p>
                    )}
                  </div>
                  {anyChecked && (
                    <button
                      onClick={resetChecklist}
                      className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-400 border border-stone-600 hover:border-red-500/50 px-3 py-1.5 rounded-full transition-all duration-200"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                <p className="text-stone-500 text-xs -mt-2">
                  If you're a low-power player and not first to teleport, you'll have 5 different jobs to rotate between.
                </p>

                <div className="grid gap-3">
                  {[
                    {
                      role: 'Rally Leaders', emoji: '⚔️', count: '2-3 players', color: 'red',
                      duties: [
                        'Lead rallies on enemy structures',
                        'Coordinate timing with team',
                        'Use top-tier rally commanders (Nevsky, Tariq, Henry)',
                      ],
                    },
                    {
                      role: 'Garrison Defenders', emoji: '🛡️', count: '2-3 players', color: 'blue',
                      duties: [
                        'Defend captured structures with Gorgo, Zenobia, Heraclius',
                        'Fill allied garrisons',
                        "If you don't have garrison commanders, let others defend",
                      ],
                    },
                    {
                      role: 'Ark Runners', emoji: '📦', count: '5-8 players', color: 'amber',
                      duties: [
                        'Pick up Ark from YOUR side (picking from enemy side gives it to them!)',
                        'Use tanky marches: Richard, Guan Yu, Martel',
                        'Designated person picks up, others protect',
                      ],
                    },
                    {
                      role: 'Open Field Fighters', emoji: '🗡️', count: '10-15 players', color: 'green',
                      duties: [
                        'Fight in the middle, open area',
                        'Consolidate forces before engaging',
                        "Don't fight randomly — wait for calls",
                      ],
                    },
                    {
                      role: 'Obelisk Cappers', emoji: '⚡', count: '3-5 players', color: 'purple',
                      duties: [
                        'Use Dragon Lancer march with Windswept gear + T1 cavalry',
                        'T1 cavalry is fastest in the game',
                        'Capture obelisks immediately on spawn',
                      ],
                    },
                    {
                      role: 'Farmers / Gatherers', emoji: '🌾', count: 'Low-power players', color: 'cyan',
                      duties: [
                        'Massive points from supply/caravans',
                        'Use Joan of Arc, Sarka, Constance, Centurion',
                        "Go node to node — don't let it reset",
                      ],
                    },
                  ].map((r, idx) => (
                    <RoleCard
                      key={r.role}
                      role={r.role}
                      emoji={r.emoji}
                      count={r.count}
                      duties={r.duties}
                      color={r.color}
                      isMyRole={myRole === r.role}
                      onSetMyRole={() => handleSetMyRole(r.role)}
                      completedDuties={completedDuties[r.role] || []}
                      onToggleDuty={(i) => handleToggleDuty(r.role, i)}
                      animationDelay={idx * 70}
                    />
                  ))}
                </div>

                <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4">
                  <h4 className="text-amber-300 font-semibold mb-2">💡 March Management</h4>
                  <p className="text-stone-300 text-sm">
                    Maximum <span className="text-amber-400 font-bold">3 marches</span> recommended: one in each building/obelisk.
                    This way you can still teleport. Always be available for calls on Discord!
                  </p>
                </div>
              </div>
            )}

            {/* ── Strategy Tab ── */}
            {activeTab === 'strategy' && (
              <div className="space-y-6">
                {/* Preparation */}
                <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border border-amber-700/50">
                  <h3 className="text-xl font-bold text-amber-300 mb-4">⚙️ Pre-Battle Preparation</h3>
                  <ul className="text-stone-300 space-y-2">
                    <li>• <span className="text-amber-400">Clear your hospital</span> before entering</li>
                    <li>• Activate a <span className="text-amber-400">defense boost</span> (attack boost is given in AoO)</li>
                    <li>• Use at least <span className="text-amber-400">25% army expansion</span> (50% not needed)</li>
                    <li>• Pop troop capacity buff and set up equipment</li>
                    <li>• Prepare a <span className="text-amber-400">Dragon Lancer march</span> with Windswept gear + T1 cavalry for obelisk capture</li>
                    <li>• Set marches beforehand: Martel, Richard, Guan Yu with appropriate gear</li>
                    <li>• Be early on Discord for RSVP</li>
                  </ul>
                </div>

                {/* Lane Play */}
                <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border border-amber-700/50">
                  <h3 className="text-xl font-bold text-amber-300 mb-4">🗺️ Map & Lane Play</h3>
                  <div className="space-y-4">
                    <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-700 transition-all duration-200 hover:border-amber-600/40 hover:bg-stone-800/40">
                      <h4 className="text-amber-400 font-semibold mb-2">Three-Lane Play (Basic)</h4>
                      <p className="text-stone-300 text-sm">Middle (Ark), Top side buildings, Bottom side buildings. Most common strategy.</p>
                    </div>
                    <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-700 transition-all duration-200 hover:border-amber-600/40 hover:bg-stone-800/40">
                      <h4 className="text-amber-400 font-semibold mb-2">Five-Lane Play (Advanced)</h4>
                      <p className="text-stone-300 text-sm">No lane structure. Low-power players rotate between 5 jobs: fill rallies, fill garrison, debuff in middle, buff in middle, gather.</p>
                    </div>
                  </div>
                </div>

                {/* Ark Fighting Strategy */}
                <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border border-amber-700/50">
                  <h3 className="text-xl font-bold text-amber-300 mb-4">⚔️ Ark Fighting Strategy</h3>
                  <div className="space-y-3">
                    <PhaseCard phase="1" time="Start"              name="Don't Fight Immediately"  animationDelay={0}
                      actions={['No one fights at the beginning', 'Send Belisarius to pick up Ark and run in front', 'Consolidate your team first']} />
                    <PhaseCard phase="2" time="3 min before Ark"   name="Consolidate Forces"       animationDelay={80}
                      actions={['Move to the middle, open area', 'Consolidate all forces in front of Ark', "Don't let opponents grab it"]} />
                    <PhaseCard phase="3" time="Ark Spawn"          name="Designated Pickup"        animationDelay={160}
                      actions={['Designated person picks up Ark', 'ALWAYS pick from YOUR side (picking from enemy side gives it to them!)', 'Push opponents back, pop buff, start fighting']} />
                    <PhaseCard phase="4" time="Ongoing"            name="Contest or Retreat"       animationDelay={240}
                      actions={['If contestable Ark, keep fighting for it', 'If not contestable, go back and focus on buildings', 'Always work as a team']} />
                  </div>
                </div>

                {/* Key Strategies */}
                <div className="grid md:grid-cols-2 gap-4">
                  <StrategyCard title="Ark Control"       icon="📦" tips={['Ark spawns in the center', 'Carrier moves slower — rotate often', '2 pts/sec is massive over time', 'NEVER pick from enemy side!']} />
                  <StrategyCard title="Gathering Points"  icon="🌾" tips={['Massive points from supply/caravans', 'Use farmers: Joan, Sarka, Constance', 'Go node to node continuously', 'Low-power players should prioritize this']} />
                  <StrategyCard title="Communication"     icon="📢" tips={['Always be on Discord', 'Listen to calls from leaders', 'Everyone take the same call (even bad ones)', 'Communication makes teams win']} />
                  <StrategyCard title="Building Defense"  icon="🏰" tips={["Don't rail all buildings to middle", 'Keep march on back buildings', 'Forward buildings need less defense', 'Protect structures from being stolen']} />
                </div>
              </div>
            )}

            {/* ── Commanders Tab ── */}
            {activeTab === 'commanders' && (
              <div className="space-y-6">
                <p className="text-stone-400 mb-4">
                  Commander pairings from <span className="text-amber-400">riseofkingdomsguides.com</span> (February 2026).
                  Organized by role and season availability:
                </p>

                <SeasonAccordion
                  season="s1"
                  title="🌱 Season 1 (KvK 1) — New Players"
                  subtitle="Limited legendaries. Epic commanders like Sun Tzu are essential. Focus on F2P-friendly options."
                  expanded={expandedSeason === 's1'}
                  onToggle={() => toggleSeason('s1')}
                >
                  <div className="space-y-4">
                    <TroopTypeSection title="Infantry (Best for F2P)" pairings={[
                      { type: 'Tanky + Damage',   names: 'Richard I + Sun Tzu',                role: 'Open Field', roleColor: 'green' },
                      { type: 'Garrison',          names: 'Charles Martel + Sun Tzu',           role: 'Garrison',   roleColor: 'blue' },
                      { type: 'Support March',     names: 'Richard I + Joan of Arc',            role: 'Open Field', roleColor: 'green' },
                      { type: 'Damage Focus',      names: 'Sun Tzu + Yi Seong-Gye',             role: 'Open Field', roleColor: 'green' },
                      { type: 'Budget Tank',       names: 'Charles Martel + Scipio Africanus',  role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Cavalry" pairings={[
                      { type: 'Spender Option',  names: 'Minamoto + Cao Cao',      role: 'Open Field', roleColor: 'green' },
                      { type: 'F2P Cavalry',     names: 'Minamoto + Baibars',      role: 'Open Field', roleColor: 'green' },
                      { type: 'Budget Cavalry',  names: 'Pelagius + Baibars',      role: 'Open Field', roleColor: 'green' },
                      { type: 'Speed March',     names: 'Cao Cao + Belisarius',    role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Archers" pairings={[
                      { type: 'Best KvK1 Archer', names: 'Yi Seong-Gye + El Cid',         role: 'Open Field', roleColor: 'green' },
                      { type: 'F2P Archer',        names: 'Hermann + Kusunoki',             role: 'Open Field', roleColor: 'green' },
                      { type: 'With Legendary',    names: 'Thutmose + Yi Seong-Gye',       role: 'Open Field', roleColor: 'green' },
                    ]} />
                  </div>
                </SeasonAccordion>

                <SeasonAccordion
                  season="s2"
                  title="⚔️ Season 2 (KvK 2) — Mid Game"
                  subtitle="More legendaries unlocked. Alexander the Great and Saladin become available."
                  expanded={expandedSeason === 's2'}
                  onToggle={() => toggleSeason('s2')}
                >
                  <div className="space-y-4">
                    <TroopTypeSection title="Infantry" pairings={[
                      { type: 'Best KvK2', names: 'Alexander the Great + Sun Tzu',      role: 'Open Field', roleColor: 'green' },
                      { type: 'Garrison',  names: 'Charles Martel + Yi Seong-Gye',      role: 'Garrison',   roleColor: 'blue' },
                      { type: 'Support',   names: 'Constantine + Joan of Arc',           role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Cavalry" pairings={[
                      { type: 'Open Field',     names: 'Saladin + Sun Tzu',         role: 'Open Field', roleColor: 'green' },
                      { type: 'Speed + Damage', names: 'Saladin + Baibars',         role: 'Open Field', roleColor: 'green' },
                      { type: 'Single Target',  names: 'Minamoto + Pelagius',       role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Archers" pairings={[
                      { type: 'AOE Damage', names: 'Yi Seong-Gye + Aethelflaed', role: 'Open Field', roleColor: 'green' },
                    ]} />
                  </div>
                </SeasonAccordion>

                <SeasonAccordion
                  season="s3"
                  title="🔥 Season 3 (KvK 3) — Late Pre-SoC"
                  subtitle="Guan Yu, Leonidas, Zenobia, Attila, Takeda become available."
                  expanded={expandedSeason === 's3'}
                  onToggle={() => toggleSeason('s3')}
                >
                  <div className="space-y-4">
                    <TroopTypeSection title="Infantry" pairings={[
                      { type: 'Best Infantry', names: 'Guan Yu + Leonidas I',              role: 'Open Field', roleColor: 'green' },
                      { type: 'Tank March',    names: 'Alexander the Great + Harald',      role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Cavalry" pairings={[
                      { type: 'Devastating Rally', names: 'Attila + Takeda',    role: 'Rally',      roleColor: 'red' },
                      { type: 'Open Field',         names: 'Saladin + Takeda',  role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Archers" pairings={[
                      { type: 'Archer Power', names: 'Ramesses II + Yi Seong-Gye',          role: 'Rally',      roleColor: 'red' },
                      { type: 'Archer Nuke',  names: 'Nebuchadnezzar II + Ramesses II',     role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Garrison Defense" pairings={[
                      { type: 'Best Garrison', names: 'Zenobia + Yi Seong-Gye', role: 'Garrison', roleColor: 'blue' },
                    ]} />
                  </div>
                </SeasonAccordion>

                <SeasonAccordion
                  season="soc"
                  title="👑 Season of Conquest (SoC) — Endgame Meta 2026"
                  subtitle="All commanders available. Data from riseofkingdomsguides.com tier list February 2026."
                  expanded={expandedSeason === 'soc'}
                  onToggle={() => toggleSeason('soc')}
                >
                  <div className="space-y-4">
                    <TroopTypeSection title="🏆 S+ Tier Open Field (Best in Game)" pairings={[
                      { type: 'S+ Cavalry',  names: 'Alexander Nevsky + Joan of Arc Prime',     role: 'Open Field', roleColor: 'green' },
                      { type: 'S+ Infantry', names: 'Scipio Africanus Prime + Liu Che',         role: 'Open Field', roleColor: 'green' },
                      { type: 'S+ Infantry', names: 'Liu Che + Scipio Africanus Prime',         role: 'Open Field', roleColor: 'green' },
                      { type: 'S+ Archer',   names: 'Zhuge Liang + Hermann Prime',              role: 'Open Field', roleColor: 'green' },
                      { type: 'S+ Archer',   names: 'Hermann Prime + Zhuge Liang',              role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Infantry — Open Field (S/A Tier)" pairings={[
                      { type: 'Top Infantry',    names: 'Guan Yu + Scipio Africanus Prime',  role: 'Open Field', roleColor: 'green' },
                      { type: 'Debuff Infantry', names: 'Sargon the Great + Liu Che',        role: 'Open Field', roleColor: 'green' },
                      { type: 'Infantry March',  names: 'Tariq ibn Ziyad + Liu Che',         role: 'Open Field', roleColor: 'green' },
                      { type: 'Infantry',        names: 'Gorgo + Liu Che',                   role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Cavalry — Open Field (S/A Tier)" pairings={[
                      { type: 'Top Cavalry',   names: 'Alexander Nevsky + Huo Qubing',       role: 'Open Field', roleColor: 'green' },
                      { type: 'Cavalry March', names: 'Xiang Yu + Honda Tadakatsu',          role: 'Open Field', roleColor: 'green' },
                      { type: 'Cavalry',       names: 'Huo Qubing + William I',              role: 'Open Field', roleColor: 'green' },
                      { type: 'Cavalry',       names: 'Joan of Arc Prime + Xiang Yu',        role: 'Open Field', roleColor: 'green' },
                      { type: 'S Tier Cav',    names: 'Justinian + Alexander Nevsky',        role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Archers — Open Field (S/A Tier)" pairings={[
                      { type: 'Archer Nuke',  names: 'Boudica Prime + Zhuge Liang',      role: 'Open Field', roleColor: 'green' },
                      { type: 'Archer March', names: 'Nebuchadnezzar II + Henry V',      role: 'Open Field', roleColor: 'green' },
                      { type: 'Archer',       names: 'Boudica Prime + Ashurbanipal',     role: 'Open Field', roleColor: 'green' },
                    ]} />
                    <TroopTypeSection title="Rally Leaders — SoC" pairings={[
                      { type: 'Cavalry Rally',  names: 'Alexander Nevsky + Justinian',        role: 'Rally', roleColor: 'red' },
                      { type: 'Cavalry Rally',  names: 'Alexander Nevsky + Attila',           role: 'Rally', roleColor: 'red' },
                      { type: 'Infantry Rally', names: 'Tariq ibn Ziyad + Sargon the Great',  role: 'Rally', roleColor: 'red' },
                      { type: 'Archer Rally',   names: 'Henry V + Ashurbanipal',              role: 'Rally', roleColor: 'red' },
                      { type: 'Archer Rally',   names: 'Zhuge Liang + Gilgamesh',             role: 'Rally', roleColor: 'red' },
                    ]} />
                    <TroopTypeSection title="Garrison Defense — SoC (S Tier)" pairings={[
                      { type: 'Best Garrison',    names: 'Gorgo + Constantine',       role: 'Garrison', roleColor: 'blue' },
                      { type: 'Top Garrison',     names: 'Zenobia + Gorgo',           role: 'Garrison', roleColor: 'blue' },
                      { type: 'Garrison',         names: 'Gorgo + Heraclius',         role: 'Garrison', roleColor: 'blue' },
                      { type: 'Garrison',         names: 'Heraclius + Zenobia',       role: 'Garrison', roleColor: 'blue' },
                      { type: 'Garrison',         names: 'Zenobia + Flavius Aetius',  role: 'Garrison', roleColor: 'blue' },
                      { type: 'Archer Garrison',  names: 'Dido + Heraclius',          role: 'Garrison', roleColor: 'blue' },
                    ]} />
                  </div>
                </SeasonAccordion>

                {/* Tier Legend */}
                <div className="bg-stone-800/80 rounded-lg p-4 border border-amber-700/30">
                  <h4 className="text-amber-300 font-semibold mb-3">📊 Tier System (from riseofkingdomsguides.com)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <span className="text-red-400">S+ = Very Overpowered</span>
                    <span className="text-orange-400">S = Overpowered</span>
                    <span className="text-yellow-400">A = Balanced</span>
                    <span className="text-green-400">B = Slightly Underpowered</span>
                    <span className="text-blue-400">C = Underpowered</span>
                    <span className="text-gray-400">F = The Worst</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4">
                  <h4 className="text-amber-300 font-semibold mb-2">⚠️ Important Notes</h4>
                  <p className="text-stone-300 text-sm">
                    If you don't have top-tier garrison commanders, <span className="text-amber-400">let someone else defend</span>.
                    If you don't have rally commanders, <span className="text-amber-400">let someone else lead rallies</span>.
                    Commander meta changes with game updates. Always test pairings based on your specific commander skill levels,
                    equipment, and troop tiers.
                  </p>
                </div>
              </div>
            )}

            {/* ── Scoring Tab ── */}
            {activeTab === 'scoring' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border border-amber-700/50">
                  <h3 className="text-xl font-bold text-amber-300 mb-4">Points Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-amber-700/50">
                          <th className="text-left py-3 px-4 text-amber-300">Action</th>
                          <th className="text-right py-3 px-4 text-amber-300">Points</th>
                          <th className="text-left py-3 px-4 text-amber-300">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="text-stone-300">
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Hold Ark</td>
                          <td className="text-right py-3 px-4 text-amber-400 font-bold">2 pts/sec</td>
                          <td className="py-3 px-4 text-stone-400">While carrying toward base</td>
                        </tr>
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Deliver Ark to Base</td>
                          <td className="text-right py-3 px-4 text-amber-400 font-bold">1,500 pts</td>
                          <td className="py-3 px-4 text-stone-400">One-time bonus per delivery</td>
                        </tr>
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Hold Obelisk</td>
                          <td className="text-right py-3 px-4 text-blue-400 font-bold">1 pt/sec</td>
                          <td className="py-3 px-4 text-stone-400">Per obelisk controlled</td>
                        </tr>
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Capture Shrine</td>
                          <td className="text-right py-3 px-4 text-green-400 font-bold">200-500 pts</td>
                          <td className="py-3 px-4 text-stone-400">Varies by shrine type</td>
                        </tr>
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Kill Enemy Troops</td>
                          <td className="text-right py-3 px-4 text-red-400 font-bold">1 pt/100 kills</td>
                          <td className="py-3 px-4 text-stone-400">Based on troop power</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border border-amber-700/50">
                  <h3 className="text-xl font-bold text-amber-300 mb-4">Individual Score (Honor)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-amber-700/50">
                          <th className="text-left py-3 px-4 text-amber-300">Action</th>
                          <th className="text-right py-3 px-4 text-amber-300">Honor</th>
                        </tr>
                      </thead>
                      <tbody className="text-stone-300">
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Kill T4 troops</td>
                          <td className="text-right py-3 px-4">1 per 200</td>
                        </tr>
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Kill T5 troops</td>
                          <td className="text-right py-3 px-4">1 per 100</td>
                        </tr>
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Capture Obelisk</td>
                          <td className="text-right py-3 px-4">500</td>
                        </tr>
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Capture Shrine</td>
                          <td className="text-right py-3 px-4">200</td>
                        </tr>
                        <tr className="border-b border-stone-700/50 hover:bg-stone-800/40 transition-colors">
                          <td className="py-3 px-4">Deliver Ark</td>
                          <td className="text-right py-3 px-4">1,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4">
                  <h4 className="text-amber-300 font-semibold mb-2">💡 Point Priority</h4>
                  <p className="text-stone-300 text-sm">
                    <span className="text-amber-400 font-bold">Ark &gt; Obelisks &gt; Shrines &gt; Kills</span>.
                    The Ark at 2pts/sec for 60 minutes = 7,200 points potential. Four obelisks at 1pt/sec each = 14,400 points.
                    Control objectives, not just kills!
                  </p>
                </div>
              </div>
            )}

            {/* ── Pro Tips Tab ── */}
            {activeTab === 'tips' && (
              <div className="space-y-4">
                <ProTip number={1} title="Clear Hospital & Set Equipment"
                  content="Clear your hospital before entering. Set up equipment beforehand — don't fumble during the match. Gears are nothing without equipment!" />
                <ProTip number={2} title="Use Defense Boost, Not Attack"
                  content="Activate a defense boost before entering. You already get an attack boost in Ark of Osiris, making defense boost more valuable." />
                <ProTip number={3} title="25% Army Expansion is Enough"
                  content="Use at least 25% expansion. 50% is generally not needed — save it for open fielding in KvK. 25% is generous courtesy to teammates." />
                <ProTip number={4} title="Fastest Obelisk Capture: T1 Cavalry"
                  content="For obelisk capture, use Dragon Lancer march with Windswept gear + T1 cavalry. T1 cavalry units are the FASTEST in the game." />
                <ProTip number={5} title="Never Pick Ark from Enemy Side"
                  content="CRITICAL: Always pick up the Ark from YOUR side. If you pick it up from the enemy's end, THEY get it. This can cause a huge loss!" />
                <ProTip number={6} title="Gather for Massive Points"
                  content="Massive points come from supply/caravans. Use farmers: Joan of Arc, Sarka, Constance, Centurion. Go node to node — don't let it reset." />
                <ProTip number={7} title="Listen to Calls — Even Bad Ones"
                  content="Always be on Discord. Everyone should take the SAME call, even if it's bad. A unified bad call is better than some good, some bad." />
                <ProTip number={8} title="Don't Fight Randomly"
                  content="Open fielding randomly wastes troops. Don't start fighting until you consolidate your team. Communication makes the difference!" />

                <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 mt-6">
                  <h4 className="text-red-300 font-semibold mb-3">❌ Common Mistakes to Avoid</h4>
                  <ul className="text-stone-300 text-sm space-y-2">
                    <li>• <span className="text-red-400">Picking up Ark from enemy side</span> — gives it to them!</li>
                    <li>• Fighting before consolidating your team</li>
                    <li>• Not being on Discord / missing calls</li>
                    <li>• Ignoring gathering (massive point source)</li>
                    <li>• Using 50% expansion when 25% is enough</li>
                    <li>• Not clearing hospital before entering</li>
                    <li>• Teleporting without leaving space for teammates</li>
                    <li>• Defending without proper garrison commanders</li>
                  </ul>
                </div>

                <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4">
                  <h4 className="text-amber-300 font-semibold mb-2">🏆 Remember: AoO is a Team Game</h4>
                  <p className="text-stone-300 text-sm">
                    It doesn't matter how good you are individually — you can still lose. Communication and power make
                    the team stand out. Work together, follow calls, and prioritize team victory over personal glory.
                  </p>
                </div>
              </div>
            )}

          </div>{/* end animated key wrapper */}
        </div>
      </div>
    </div>
  );
}
