# RoK Tools - Ark of Osiris Guide

A React-based Rise of Kingdoms tools app featuring a comprehensive Ark of Osiris guide.

## Data Source
Commander pairings and tier list data sourced from [riseofkingdomsguides.com](https://riseofkingdomsguides.com) (February 2026).

## Quick Start

### Option 1: Deploy to Vercel (Easiest)

1. Extract this zip
2. Create a GitHub repository and push these files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/rok-tools.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com)
4. Click "Add New Project"
5. Import your GitHub repository
6. Click "Deploy"
7. Done! Your site will be live at `your-project.vercel.app`

### Option 2: Run Locally

```bash
npm install
npm start
```

Visit http://localhost:3000

### Option 3: Build for Production

```bash
npm run build
```

The `build/` folder contains static files you can host anywhere.

## File Structure

```
rok-tools/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx              # Main app with navigation
│   ├── ArkOfOsirisGuide.jsx # The AoO guide component
│   ├── index.js             # Entry point
│   └── index.css            # Styles
├── package.json
├── tailwind.config.js
└── README.md
```

## Integrating with Your Existing App

If you already have a RoK Tools app and just want to add the AoO Guide:

1. Copy `src/ArkOfOsirisGuide.jsx` to your `src/` folder
2. Add this import to your App.jsx:
   ```javascript
   import ArkOfOsirisGuide from './ArkOfOsirisGuide';
   ```
3. Add a nav button:
   ```javascript
   <NavButton page="aoo" icon={<Shield className="w-4 h-4" />} label="AoO Guide" />
   ```
4. Add the page render:
   ```javascript
   {currentPage === 'aoo' && <ArkOfOsirisGuide />}
   ```

## Features

- **Overview**: Game mode explanation, objectives, teleport system
- **Team Roles**: Rally leaders, garrison defenders, ark runners, etc.
- **Strategy**: Pre-battle prep, lane play, ark fighting tactics
- **Commanders**: Season-specific pairings (S1, S2, S3, SoC) with tier ratings
- **Scoring**: Points breakdown for all objectives
- **Pro Tips**: Expert strategies from riseofkingdomsguides.com

## License

MIT
