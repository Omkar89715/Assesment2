# Stock Broker Client Dashboard (Assignment 2) - Ready

This project is a React + Vite app implementing the Stock Broker Client Dashboard assignment.

## 🚀 Features Implemented
- Login with email (fake authentication)
- Support for 5 stocks: **GOOG, TSLA, AMZN, META, NVDA**
- Subscribe / unsubscribe to stocks
- Real-time price updates every 1 second using a random generator
- `BroadcastChannel` is used so multiple open tabs/windows of the app receive updates asynchronously
- Subscriptions are persisted per user in `localStorage` (key: `subs_<email>`)
- Clean UI with plain CSS

## ✅ How It Satisfies the Assignment
- **Multiple users:** Login with different emails — each user has independent subscriptions and dashboards.
- **Asynchronous updates:** Run two browser windows/tabs, login as different users; price updates broadcast and all open dashboards update without refresh.
- **No external paid APIs:** Random generator simulates price movement effectively.

## ⚙️ Run Locally
1. Extract the zip.
2. Open a terminal inside the project folder.
3. Install dependencies:
   ```bash
   npm install
