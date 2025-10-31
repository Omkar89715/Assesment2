# Stock Broker Client Dashboard (Assignment 2) - Ready

This project is a React + Vite app implementing the Stock Broker Client Dashboard assignment.

## Features implemented
- Login with email (fake authentication)
- Support for 5 stocks: GOOG, TSLA, AMZN, META, NVDA
- Subscribe / unsubscribe to stocks
- Real-time price updates every 1 second using a random generator
- BroadcastChannel is used so multiple open tabs/windows of the app receive updates asynchronously
- Subscriptions are persisted per user in `localStorage` (key: `subs_<email>`)
- Clean UI with plain CSS

## How it satisfies the assignment
- Multiple users: login with different emails — each user has independent subscriptions and dashboard
- Asynchronous updates: run two browser windows/tabs, login as different users; price updates broadcast and all open dashboards update without refresh
- No external paid APIs; random generator simulates price movement

## Run locally
1. Extract the zip
2. Open a terminal inside the project folder
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open the Vite URL (usually http://localhost:5173)
6. Login with any email (e.g., alice@example.com), then open another tab and login as bob@example.com — subscribe to different stocks and observe real-time price updates across tabs.

## Notes & Tips
- The app uses `BroadcastChannel` which works on modern browsers (Chrome, Edge, Firefox). For cross-browser or cross-origin setups, consider a WebSocket server (can be added if needed).
- If you want deterministic starting prices, edit `src/services/priceGenerator.js`.
