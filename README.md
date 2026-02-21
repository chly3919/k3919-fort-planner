# RoK Tools

A JavaScript React app for Rise of Kingdoms utilities, including:
- Fort calculator
- Barbarian calculator
- Lyceum search
- DKP calculator
- Ark of Osiris guide

## Stack

- React 18 (JavaScript)
- Vite 5
- Tailwind CSS 3
- Lucide React icons
- XLSX file parsing

## Data Source

Ark of Osiris commander pairings and tier references are sourced from [riseofkingdomsguides.com](https://riseofkingdomsguides.com) (February 2026).

## Project Structure

```
rok-tools/
├── index.html
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── data.js
│   ├── translations.js
└── package.json
```

## Local Development

Install dependencies:

```bash
npm install
```

Run dev server (configured for port `3000`):

```bash
npm start
```

or

```bash
npm run dev
```

Open: `http://localhost:3000`

## Build

Create a production build:

```bash
npm run build
```

By default, Vite outputs static assets to the `dist/` folder.

Preview production build locally:

```bash
npm run preview
```

## Deploy

### Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Framework preset: **Vite** (usually auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Scripts

- `npm start` → Vite dev server
- `npm run dev` → Vite dev server
- `npm run build` → Production build
- `npm run preview` → Preview built app

## License

MIT
