import React, { useState } from 'react';
import { Calculator, Swords, Home, Flame, Target, BookOpen, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import HomePageRoute from './pages/HomePage';
import CalculatorPageRoute from './pages/CalculatorPage';
import BarbarianCalculatorPageRoute from './pages/BarbarianCalculatorPage';
import LyceumPageRoute from './pages/LyceumPage';
import DKPCalculatorPageRoute from './pages/DKPCalculatorPage';
import ArkOfOsirisGuideRoute from './pages/ArkOfOsirisGuide';

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
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
    { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const NavButton = ({ page, icon, label }) => (
    <button
      onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
      className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm w-full md:w-auto ${
        currentPage === page
          ? 'bg-amber-600 text-white'
          : 'text-amber-200 hover:bg-stone-800'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <nav className="relative z-20 bg-stone-900/80 backdrop-blur-sm border-b border-amber-700/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>
            <Flame className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-200 via-orange-400 to-red-500 bg-clip-text text-transparent">
              <span className="hidden sm:inline">{t('heroTitle')}</span>
              <span className="sm:hidden">RoK Tools</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2 items-center">
            <NavButton page="home" icon={<Home className="w-4 h-4" />} label={t('home')} />
            <NavButton page="calculator" icon={<Calculator className="w-4 h-4" />} label={t('fortCalc')} />
            <NavButton page="barbarian" icon={<Target className="w-4 h-4" />} label={t('barbCalc')} />
            <NavButton page="lyceum" icon={<BookOpen className="w-4 h-4" />} label={t('lyceum')} />
            <NavButton page="dkp" icon={<Swords className="w-4 h-4" />} label={t('dkpCalc')} />
            <NavButton page="ark" icon={<Swords className="w-4 h-4" />} label={t('ark')} />
            
            {/* Language Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-600/50 bg-stone-800 text-amber-200 hover:bg-stone-700 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag}</span>
                <svg className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-40 bg-stone-800 border border-amber-600 rounded-lg shadow-xl z-50 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                          language === lang.code 
                            ? 'bg-amber-600 text-white' 
                            : 'text-amber-200 hover:bg-stone-700'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language Dropdown Mobile */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-amber-600/50 bg-stone-800 text-amber-200"
              >
                <span>{currentLang.flag}</span>
                <svg className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 bg-stone-800 border border-amber-600 rounded-lg shadow-xl z-50 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                        className={`w-full px-3 py-2 text-left flex items-center gap-2 transition-all ${
                          language === lang.code 
                            ? 'bg-amber-600 text-white' 
                            : 'text-amber-200 hover:bg-stone-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-amber-200 hover:bg-stone-800 transition-all"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-amber-700/30 mt-2 pt-3">
            <div className="flex flex-col gap-2">
              <NavButton page="home" icon={<Home className="w-4 h-4" />} label={t('home')} />
              <NavButton page="calculator" icon={<Calculator className="w-4 h-4" />} label={t('fortCalc')} />
              <NavButton page="barbarian" icon={<Target className="w-4 h-4" />} label={t('barbCalc')} />
              <NavButton page="lyceum" icon={<BookOpen className="w-4 h-4" />} label={t('lyceum')} />
              <NavButton page="dkp" icon={<Swords className="w-4 h-4" />} label={t('dkpCalc')} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Main App Component
export default function BarbFortCalculator() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen relative ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <FlameBackground />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePageRoute setCurrentPage={setCurrentPage} />}
      {currentPage === 'calculator' && <CalculatorPageRoute />}
      {currentPage === 'barbarian' && <BarbarianCalculatorPageRoute />}
      {currentPage === 'lyceum' && <LyceumPageRoute />}
      {currentPage === 'dkp' && <DKPCalculatorPageRoute />}
      {currentPage === 'ark' && <ArkOfOsirisGuideRoute />}
    </div>
  );
}


