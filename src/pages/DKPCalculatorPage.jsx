import React, { useMemo, useState } from 'react';
import { Search, Swords, Target } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useLanguage } from '../hooks/useLanguage';

function DKPCalculatorPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dkp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [playerData, setPlayerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Point values - customizable
  const [t4KillPoints, setT4KillPoints] = useState(1);
  const [t4DeathPoints, setT4DeathPoints] = useState(2);
  const [t5KillPoints, setT5KillPoints] = useState(10);
  const [t5DeathPoints, setT5DeathPoints] = useState(20);

  // Custom stats entries
  const [customEntries, setCustomEntries] = useState([
    { id: 1, username: '', power: '', t4Kills: '', t4Deaths: '', t5Kills: '', t5Deaths: '' }
  ]);

  const addCustomEntry = () => {
    setCustomEntries([
      ...customEntries,
      { id: Date.now(), username: '', power: '', t4Kills: '', t4Deaths: '', t5Kills: '', t5Deaths: '' }
    ]);
  };

  const removeCustomEntry = (id) => {
    if (customEntries.length > 1) {
      setCustomEntries(customEntries.filter(entry => entry.id !== id));
    }
  };

  const updateCustomEntry = (id, field, value) => {
    setCustomEntries(customEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const calculateCustomDKP = (entry) => {
    const t4K = Number(entry.t4Kills) || 0;
    const t4D = Number(entry.t4Deaths) || 0;
    const t5K = Number(entry.t5Kills) || 0;
    const t5D = Number(entry.t5Deaths) || 0;
    const killPoints = (t4K * t4KillPoints) + (t5K * t5KillPoints);
    const deathPoints = (t4D * t4DeathPoints) + (t5D * t5DeathPoints);
    return { dkp: killPoints + deathPoints, killPoints, deathPoints };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError('');

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Map the data to our expected format
        const mappedData = jsonData.map((row, index) => ({
          id: row['Character ID'] || index,
          username: row['Username'] || row['Name'] || row['Player'] || `Player ${index + 1}`,
          power: Number(row['Power']) || 0,
          t5Deaths: Number(row['T5 Deaths']) || 0,
          t4Deaths: Number(row['T4 Deaths']) || 0,
          t5Kills: Number(row['T5 Kills']) || 0,
          t4Kills: Number(row['T4 Kills']) || 0,
        }));

        setPlayerData(mappedData);
        setError('');
      } catch (err) {
        console.error('Error reading file:', err);
        setError('Error reading file. Please make sure it\'s a valid Excel file (.xlsx)');
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const playersWithDKP = useMemo(() => {
    return playerData.map(player => {
      const killPoints = (player.t4Kills * t4KillPoints) + (player.t5Kills * t5KillPoints);
      const deathPoints = (player.t4Deaths * t4DeathPoints) + (player.t5Deaths * t5DeathPoints);
      return {
        ...player,
        dkp: killPoints + deathPoints,
        killPoints,
        deathPoints,
      };
    });
  }, [playerData, t4KillPoints, t4DeathPoints, t5KillPoints, t5DeathPoints]);

  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = playersWithDKP;
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(player => 
        player.username.toLowerCase().includes(term) ||
        String(player.id).toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return filtered;
  }, [playersWithDKP, searchTerm, sortBy, sortOrder]);

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const SortButton = ({ field, label }) => (
    <button
      onClick={() => handleSort(field)}
      className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
        sortBy === field 
          ? 'bg-amber-600 text-white' 
          : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
      }`}
    >
      {label} {sortBy === field && (sortOrder === 'desc' ? '↓' : '↑')}
    </button>
  );

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700/90 to-orange-600/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <Swords className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">{t('dkpCalcTitle')}</h1>
          </div>
          <p className="text-amber-100 mt-2">{t('dkpCalcSubtitle')}{playerData.length > 0 && ` - ${playerData.length} ${t('playersLoaded')}`}</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* File Upload Section */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500">
            <h3 className="text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              📁 {t('uploadPlayerData')}
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <label className="flex-1">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="cursor-pointer bg-stone-700 hover:bg-stone-600 border-2 border-dashed border-amber-500 rounded-lg p-4 text-center transition-all">
                  <p className="text-amber-200 font-semibold">
                    {isLoading ? '⏳ Loading...' : `📤 ${t('clickToUpload')}`}
                  </p>
                  <p className="text-stone-400 text-sm mt-1">
                    {t('requiredColumns')}
                  </p>
                </div>
              </label>
              {playerData.length > 0 && (
                <button
                  onClick={() => setPlayerData([])}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-all"
                >
                  {t('clearData')}
                </button>
              )}
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-3">⚠️ {error}</p>
            )}
            {playerData.length > 0 && (
              <p className="text-green-400 text-sm mt-3">✅ {t('successfullyLoaded')} {playerData.length} {t('players')}</p>
            )}
            
            {/* How to get data guide */}
            <div className="mt-4 bg-stone-900/50 rounded-lg p-4 border border-stone-600">
              <p className="text-amber-300 font-semibold mb-2">📖 {t('howToGetData')}</p>
              <ol className="text-stone-300 text-sm space-y-2 list-decimal list-inside">
                <li>{t('howToStep1')} <a href="https://rok-game-tools-global.lilith.com/manageTools" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">rok-game-tools-global.lilith.com/manageTools</a></li>
                <li>{t('howToStep2')} <span className="text-amber-400">{t('noticeBoard')}</span> → <span className="text-amber-400">{t('viewMemberData')}</span></li>
                <li>{t('howToStep3')}</li>
                <li>{t('howToStep4')}</li>
              </ol>
            </div>
          </div>

          {/* Point Configuration */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500">
            <h3 className="text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Point Values Configuration
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-amber-300 text-sm font-semibold mb-2">T4 Kill Points</label>
                <input
                  type="number"
                  value={t4KillPoints}
                  onChange={(e) => setT4KillPoints(Number(e.target.value) || 0)}
                  className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-amber-300 text-sm font-semibold mb-2">T4 Death Points</label>
                <input
                  type="number"
                  value={t4DeathPoints}
                  onChange={(e) => setT4DeathPoints(Number(e.target.value) || 0)}
                  className="w-full bg-stone-800 text-white border-2 border-red-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-amber-300 text-sm font-semibold mb-2">T5 Kill Points</label>
                <input
                  type="number"
                  value={t5KillPoints}
                  onChange={(e) => setT5KillPoints(Number(e.target.value) || 0)}
                  className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-amber-300 text-sm font-semibold mb-2">T5 Death Points</label>
                <input
                  type="number"
                  value={t5DeathPoints}
                  onChange={(e) => setT5DeathPoints(Number(e.target.value) || 0)}
                  className="w-full bg-stone-800 text-white border-2 border-red-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <p className="text-stone-400 text-sm mt-3">
              💡 Adjust point values above to recalculate DKP for all players
            </p>
          </div>

          {/* Custom Stats Calculator */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500">
            <h3 className="text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              ✏️ {t('customStatsCalc')}
            </h3>
            <p className="text-stone-400 text-sm mb-4">
              {t('customStatsDesc')}
            </p>
            
            {/* Custom entries displayed like player list */}
            <div className="space-y-2">
              {customEntries.map((entry, index) => {
                const dkpResult = calculateCustomDKP(entry);
                const hasData = entry.t4Kills || entry.t4Deaths || entry.t5Kills || entry.t5Deaths;
                
                return (
                  <div 
                    key={entry.id} 
                    className="bg-stone-800/80 rounded-lg border border-stone-700 hover:border-amber-500 transition-all p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      {/* Left side - Rank and Username */}
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-stone-700 text-stone-300'
                        }`}>
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder={t('username')}
                            value={entry.username}
                            onChange={(e) => updateCustomEntry(entry.id, 'username', e.target.value)}
                            className="bg-transparent text-white font-semibold border-b border-stone-600 focus:border-amber-500 outline-none w-full max-w-[150px] placeholder-stone-500"
                          />
                        </div>
                        {customEntries.length > 1 && (
                          <button
                            onClick={() => removeCustomEntry(entry.id)}
                            className="text-red-400 hover:text-red-300 text-xs md:hidden"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      
                      {/* Right side - Stats */}
                      <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t4KillPoints').replace(' Points', '')}</p>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.t4Kills}
                            onChange={(e) => updateCustomEntry(entry.id, 't4Kills', e.target.value)}
                            className="w-16 bg-stone-700/50 text-green-400 font-semibold text-center border border-stone-600 rounded p-1 text-sm focus:outline-none focus:border-green-500"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t5KillPoints').replace(' Points', '')}</p>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.t5Kills}
                            onChange={(e) => updateCustomEntry(entry.id, 't5Kills', e.target.value)}
                            className="w-16 bg-stone-700/50 text-green-400 font-semibold text-center border border-stone-600 rounded p-1 text-sm focus:outline-none focus:border-green-500"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t4DeathPoints').replace(' Points', '')}</p>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.t4Deaths}
                            onChange={(e) => updateCustomEntry(entry.id, 't4Deaths', e.target.value)}
                            className="w-16 bg-stone-700/50 text-red-400 font-semibold text-center border border-stone-600 rounded p-1 text-sm focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t5DeathPoints').replace(' Points', '')}</p>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.t5Deaths}
                            onChange={(e) => updateCustomEntry(entry.id, 't5Deaths', e.target.value)}
                            className="w-16 bg-stone-700/50 text-red-400 font-semibold text-center border border-stone-600 rounded p-1 text-sm focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-amber-400 text-xs font-semibold">{t('totalDKP').toUpperCase()}</p>
                          <p className={`font-bold text-lg ${hasData ? 'text-amber-300' : 'text-stone-500'}`}>
                            {hasData ? formatNumber(dkpResult.dkp) : '-'}
                          </p>
                        </div>
                        {customEntries.length > 1 && (
                          <button
                            onClick={() => removeCustomEntry(entry.id)}
                            className="hidden md:block text-red-400 hover:text-red-300 p-1"
                            title={t('remove')}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Kill/Death points breakdown */}
                    {hasData && (
                      <div className="mt-2 pt-2 border-t border-stone-700 flex gap-4 text-xs">
                        <span className="text-green-400">⚔️ {t('killPoints')}: {formatNumber(dkpResult.killPoints)}</span>
                        <span className="text-red-400">💀 {t('deathPoints')}: {formatNumber(dkpResult.deathPoints)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <button
              onClick={addCustomEntry}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <span className="text-xl">+</span> {t('addAnotherPlayer')}
            </button>
          </div>

          {playerData.length === 0 ? (
            <div className="text-center py-16 bg-stone-800/50 rounded-lg border border-stone-700">
              <Swords className="w-16 h-16 text-stone-600 mx-auto mb-4" />
              <p className="text-stone-400 text-lg">No player data loaded</p>
              <p className="text-stone-500 mt-2">Upload an Excel file above to get started</p>
            </div>
          ) : (
            <>
              {/* Search and Sort */}
              <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by username or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-stone-400 text-sm">Sort by:</span>
                  <SortButton field="dkp" label="DKP" />
                  <SortButton field="power" label="Power" />
                  <SortButton field="killPoints" label="Kills" />
                  <SortButton field="deathPoints" label="Deaths" />
                </div>
              </div>

              {/* Player List */}
              <div className="space-y-2">
                {filteredAndSortedPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className="bg-stone-800/80 rounded-lg border border-stone-700 hover:border-amber-500 transition-all p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-stone-700 text-stone-300'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-white font-semibold">{player.username}</p>
                          <p className="text-stone-400 text-sm">{t('id')}: {player.id} • {t('power')}: {formatNumber(player.power)}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 md:gap-6">
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t4KillPoints').replace(' Points', '')}</p>
                          <p className="text-green-400 font-semibold">{formatNumber(player.t4Kills)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t5KillPoints').replace(' Points', '')}</p>
                          <p className="text-green-400 font-semibold">{formatNumber(player.t5Kills)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t4DeathPoints').replace(' Points', '')}</p>
                          <p className="text-red-400 font-semibold">{formatNumber(player.t4Deaths)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t5DeathPoints').replace(' Points', '')}</p>
                          <p className="text-red-400 font-semibold">{formatNumber(player.t5Deaths)}</p>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-amber-400 text-xs font-semibold">{t('totalDKP').toUpperCase()}</p>
                          <p className="text-amber-300 font-bold text-lg">{formatNumber(player.dkp)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAndSortedPlayers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-stone-400 text-lg">{t('noPlayersFound')} "{searchTerm}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default DKPCalculatorPage;
