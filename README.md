# Changelog

All notable changes to Rise of Kingdoms Tools will be documented in this file.

---

## [1.3.0] - 2025-01-23

### 🌍 Multi-Language Support
- **Added Chinese (中文)** - Complete Simplified Chinese translations
- **Added Vietnamese (Tiếng Việt)** - Complete Vietnamese translations
- **100% translation coverage** across Fort Calculator, Barbarian Calculator, and DKP Calculator
- Lyceum remains English-only (quiz questions are in English)

### 🎨 UI Improvements
- **New language dropdown selector** - Replaced flag buttons with elegant dropdown menu
  - Desktop: Globe icon with current flag and dropdown arrow
  - Mobile: Compact flag button with dropdown
  - Shows language names alongside flags
  - Click outside to close
- **Improved mobile responsiveness** - Better hamburger menu navigation

### 🏰 Fort Calculator Updates
- **Fort 10 complete data** - All 5 tiers now have accurate reward values
- Removed "TBD" label from Fort 10
- All UI elements now fully translated

### ⚔️ Barbarian Calculator Updates
- Complete translation of all labels, tooltips, and results
- Translated material drop rarities (Common, Uncommon, Rare, Epic, Legendary)
- Translated resource types (Wood/Food, Stone, Gold)

### 📊 DKP Calculator Updates
- Player list labels fully translated
- Custom stats calculator redesigned to match imported player cards
- "No players found" message translated

---

## [1.2.0] - 2025-01-22

### 🌐 Internationalization
- **Added Arabic (العربية)** with full RTL support
- Language context system for easy translation management
- 160+ translation keys across all pages

### 📱 Mobile Improvements
- Hamburger menu for mobile navigation
- Responsive header with compact logo
- Touch-friendly language selector

### 🎮 DKP Calculator
- **Custom stats calculator** - Add players manually without Excel upload
- Redesigned player cards with rank badges (gold/silver/bronze for top 3)
- Inline username input with underline style
- Kill/Death points breakdown with icons

---

## [1.1.0] - 2025-01-21

### ✨ New Features
- **DKP Calculator** - Death & Kill Points calculator for KvK statistics
  - Excel file upload support (.xlsx, .xls)
  - Customizable point values for T4/T5 kills and deaths
  - Search and sort functionality
  - Player ranking with visual badges

### 🔧 Improvements
- Added tooltip system for reward cards
- Improved number formatting (K, M suffixes)
- Better error handling for file uploads

---

## [1.0.0] - 2025-01-20

### 🚀 Initial Release

#### Fort Calculator
- Calculate rewards for Barbarian Forts (Levels 1-10)
- Two calculation modes: By Number of Forts / By Honor Points
- Support for all 5 reward tiers
- Insight Talent toggle (140 vs 150 AP)
- Configurable march time and simultaneous forts
- AP regeneration tracking
- Detailed reward breakdowns with tooltips

#### Barbarian Calculator
- Calculate rewards for hunting barbarians (Levels 30-40)
- Two calculation modes: By Barbarian Count / By XP Goal
- Peacekeeping Talent toggle
- Resource, XP, and speedup calculations
- Equipment material drop estimates
- Stats breakdown (Barbarians/Hour, XP/Hour, Resources/Hour)

#### Lyceum of Wisdom
- Searchable database of 1,397 quiz questions
- Instant search with keyword matching
- Clean Q&A display format

#### Home Page
- Tool overview cards with descriptions
- Quick navigation to all calculators
- "Coming Soon" placeholders for future features

---

## Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Arabic | `ar` | ✅ Complete (RTL) |
| Chinese | `zh` | ✅ Complete |
| Vietnamese | `vi` | ✅ Complete |

---

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **SheetJS (xlsx)** - Excel file parsing

---

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/k3919-fort-planner.git

# Navigate to project directory
cd k3919-fort-planner

# Install dependencies
npm install

# Start development server
npm start
```

---

## Contributing

Contributions are welcome! Feel free to:
- Add new languages
- Report bugs
- Suggest new features
- Submit pull requests

---

## License

MIT License - feel free to use this project for your own kingdom!

---

Made with ❤️ for Kingdom 3919
