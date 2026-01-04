# How to Host Your Spotify Clone on GitHub

This guide will walk you through the steps to upload your code to GitHub and host it using Vercel (recommended for React/Vite apps) or GitHub Pages.

## Prerequisites
- A [GitHub account](https://github.com/).
- [Git installed](https://git-scm.com/downloads) on your computer.
- [Node.js installed](https://nodejs.org/) (which you already have).

## Step 1: Initialize Git Repository
Open your terminal in the project folder (`/home/naveen/Documents/spark`) and run:

```bash
# Initialize a new git repository
git init

# Add all files to staging
git add .

# Commit the files
git commit -m "Initial commit: Spotify Clone with Search and Playlists"
```

## Step 2: Create a Repository on GitHub
1.  Log in to your GitHub account.
2.  Click the **+** icon in the top right corner and select **New repository**.
3.  Name your repository (e.g., `spotify-clone`).
4.  Make it **Public**.
5.  Click **Create repository**.

## Step 3: Push Code to GitHub
Copy the commands shown on the GitHub "Quick setup" page under "…or push an existing repository from the command line". They will look like this:

```bash
git remote add origin https://github.com/YOUR_USERNAME/spotify-clone.git
git branch -M main
git push -u origin main
```
*Replace `YOUR_USERNAME` with your actual GitHub username.*

## Step 4: Deploying (Hosting)

### Option A: Vercel (Recommended & Easiest)
Vercel is optimized for Vite/React apps and requires zero configuration.

1.  Go to [Vercel.com](https://vercel.com/) and sign up with your GitHub account.
2.  Click **Add New...** -> **Project**.
3.  Import your `spotify-clone` repository.
4.  Vercel will automatically detect it's a Vite project.
5.  Click **Deploy**.
6.  Wait a minute, and you'll get a live URL (e.g., `https://spotify-clone-naveen.vercel.app`)!

### Option B: GitHub Pages
If you prefer to host directly on GitHub.

1.  Open `package.json` and add a `homepage` field at the top level:
    ```json
    "homepage": "https://YOUR_USERNAME.github.io/spotify-clone",
    ```
2.  Install the `gh-pages` package:
    ```bash
    npm install gh-pages --save-dev
    ```
3.  Add these scripts to `package.json` under `"scripts"`:
    ```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    ```
4.  Deploy by running:
    ```bash
    npm run deploy
    ```
5.  Your site will be live at the URL you specified in `homepage`.

## Important Note on Database
This app uses `IndexedDB` (browser storage) to store songs and playlists.
- **Data is local**: Songs you upload are stored **only in your browser**. If you open the hosted link on your phone or another computer, it will be empty initially.
- **Persistence**: The data persists as long as you don't clear your browser data.
