import React, { useMemo, useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { LYCEUM_DATA } from '../data';

function LyceumPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return LYCEUM_DATA.slice(0, 50); // Show first 50 by default
    
    const term = searchTerm.toLowerCase();
    return LYCEUM_DATA.filter(item => 
      item.q.toLowerCase().includes(term) || 
      item.a.toLowerCase().includes(term)
    ).slice(0, 100); // Limit results to 100
  }, [searchTerm]);

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700/90 to-orange-600/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">{t('lyceumTitle')}</h1>
          </div>
          <p className="text-amber-100 mt-2">{t('lyceumSubtitle')} - {LYCEUM_DATA.length} {t('questionsLoaded')}</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* Search Box */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
              />
            </div>
            <p className="text-stone-400 text-sm mt-2">
              {searchTerm ? `${t('showing')} ${filteredQuestions.length} ${t('results')}` : `${t('showing')} 50 ${t('of')} ${LYCEUM_DATA.length} ${t('results')}`}
            </p>
          </div>

          {/* Quick Tips */}
          <div className="mb-6 bg-amber-900/30 border border-amber-600 rounded-lg p-4">
            <p className="text-amber-200 text-sm">
              💡 <strong>{t('tip')}:</strong> {t('tipText')}
            </p>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.map((item, index) => (
              <div
                key={index}
                className="bg-stone-800/80 rounded-lg border border-stone-700 hover:border-amber-500 transition-all overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded mt-0.5 shrink-0">{t('question').charAt(0)}</span>
                    <p className="text-white flex-1">{item.q}</p>
                  </div>
                  
                  <div className="flex items-start gap-3 mt-3 pt-3 border-t border-stone-700">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mt-0.5 shrink-0">{t('answer').charAt(0)}</span>
                    <p className="text-green-400 font-semibold flex-1">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-400 text-lg">{t('noResults')} "{searchTerm}"</p>
              <p className="text-stone-500 mt-2">{t('tryDifferent')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default LyceumPage;
