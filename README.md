# K3919 Barbarian Fort Planner

A Rise of Kingdoms calculator for planning barbarian fort farming sessions. Calculate rewards, time, and AP costs for Kingdom 3919.

---

## 🚀 HOW TO PUBLISH (Step-by-Step)

### Option 1: Deploy to Vercel (Easiest - Recommended)

#### Step 1: Create a GitHub Account (if you don't have one)
1. Go to https://github.com
2. Click "Sign up" and create a free account

#### Step 2: Upload this project to GitHub
1. Log into GitHub
2. Click the "+" icon in the top right → "New repository"
3. Name it `k3919-fort-planner`
4. Keep it Public
5. Click "Create repository"
6. On your computer, extract the downloaded zip file
7. In the GitHub repository page, click "uploading an existing file"
8. Drag and drop ALL the files from the extracted folder
9. Click "Commit changes"

#### Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Click "Add New..." → "Project"
5. Find and select your `k3919-fort-planner` repository
6. Click "Deploy"
7. Wait 1-2 minutes for it to build
8. 🎉 Your site is live! Vercel will give you a URL like `k3919-fort-planner.vercel.app`

#### Step 4 (Optional): Custom Domain
- In Vercel dashboard, go to your project → Settings → Domains
- You can add a custom domain if you have one

---

### Option 2: Deploy to Netlify

#### Step 1: Build the project locally first
```bash
npm install
npm run build
```

#### Step 2: Deploy to Netlify
1. Go to https://netlify.com
2. Sign up (can use GitHub)
3. Click "Add new site" → "Deploy manually"
4. Drag the `build` folder into the upload area
5. 🎉 Your site is live!

---

### Option 3: Run Locally (for testing)

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open http://localhost:3000 in your browser.

---

## 📁 Project Structure

```
k3919-fort-planner/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          # Main calculator component
│   ├── index.js         # React entry point
│   └── index.css        # Tailwind CSS
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md            # This file
```

---

## 🛠 Tech Stack

- React 18
- Tailwind CSS
- Lucide React Icons

---

Made for Rise of Kingdoms Kingdom 3919 🏰
