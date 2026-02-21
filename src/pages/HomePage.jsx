import React from 'react';
import { Calculator, Swords, ChevronRight, Shield, Target, Zap, BookOpen } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

function HomePage({ setCurrentPage }) {
	const { t } = useLanguage();
  
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
						{t('heroTitle')}
					</h1>
					<p className="text-xl text-amber-100/80 mb-12 max-w-2xl mx-auto">
						{t('heroSubtitle')}
					</p>
          
					{/* CTA Button */}
					<button
						onClick={() => setCurrentPage('calculator')}
						className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xl font-bold px-10 py-5 rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-orange-500/25"
					>
						<Calculator className="w-6 h-6" />
						{t('exploreTools')}
						<ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
						<div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
					</button>
				</div>
			</div>
      
			{/* Features Section */}
			<div className="relative z-10 bg-stone-900/80 backdrop-blur-sm border-t border-amber-700/30 py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-amber-200 text-center mb-12">Features</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						<FeatureCard
							icon={<Calculator className="w-10 h-10" />}
							title={t('fortCalculator')}
							description={t('fortCalculatorDesc')}
							onClick={() => setCurrentPage('calculator')}
						/>
						<FeatureCard
							icon={<Target className="w-10 h-10" />}
							title={t('barbCalculator')}
							description={t('barbCalculatorDesc')}
							onClick={() => setCurrentPage('barbarian')}
						/>
						<FeatureCard
							icon={<BookOpen className="w-10 h-10" />}
							title={t('lyceumAnswers')}
							description={t('lyceumAnswersDesc')}
							onClick={() => setCurrentPage('lyceum')}
						/>
						<FeatureCard
							icon={<Swords className="w-10 h-10" />}
							title={t('dkpCalculator')}
							description={t('dkpCalculatorDesc')}
							onClick={() => setCurrentPage('dkp')}
						/>
						<FeatureCard
							icon={<Zap className="w-10 h-10" />}
							title={t('apManagement')}
							description={t('apManagementDesc')}
							comingSoon={true}
						/>
						<FeatureCard
							icon={<Shield className="w-10 h-10" />}
							title={t('completeRewards')}
							description={t('completeRewardsDesc')}
							comingSoon={true}
						/>
					</div>
				</div>
			</div>
      
			{/* Footer */}
			<footer className="relative z-10 bg-stone-900/90 border-t border-amber-700/30 py-6 px-4 text-center">
				<p className="text-stone-400 text-sm">
					{t('footerText')}
				</p>
			</footer>
		</div>
	);
}

function FeatureCard({ icon, title, description, onClick, comingSoon }) {
	const { t } = useLanguage();
  
	return (
		<div 
			className={`bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30 hover:border-amber-600/50 transition-all hover:transform hover:scale-105 ${onClick ? 'cursor-pointer' : ''} relative`}
			onClick={onClick}
		>
			{comingSoon && (
				<span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
					{t('comingSoon')}
				</span>
			)}
			<div className="text-amber-500 mb-4">{icon}</div>
			<h3 className="text-xl font-bold text-amber-100 mb-2">{title}</h3>
			<p className="text-stone-400">{description}</p>
		</div>
	);
}

export default HomePage;
