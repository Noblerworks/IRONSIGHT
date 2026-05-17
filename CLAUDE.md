# IRONSIGHT

## Overview
Real-time OSINT command center for monitoring the Middle East conflict. Aggregates open-source intelligence from 50+ sources across news, Telegram, military tracking, financial markets, and more into a single dashboard.

## Environment
- **Status**: Open Source / Development
- **Live URL**: Local only (no hosted version)
- **Cloud**: None (client-side only)

## Tech Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Maps: Leaflet
- Data: RSS feeds, Telegram scraping, Yahoo Finance, NASA FIRMS
- No backend - all client-side

## Common Commands
```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Start production
npm start
```

## Project Structure
```
IRONSIGHT/
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   └── lib/           # Data fetching utilities
└── public/            # Static assets
```

## Features
- Live Intel Feed (20+ RSS sources)
- Telegram OSINT (27 channels with auto-translation)
- Interactive Theater Map (aircraft, naval, strikes)
- Israel Alert Status (Pikud HaOref missile alerts)
- Conflict Monitor (strikes, defense, diplomatic)
- Military Airspace Tracking (adsb.lol)
- Naval Tracker (Persian Gulf, Eastern Med)
- Defense & Crypto Markets
- Prediction Markets (Polymarket)
- Satellite Thermal Detection (NASA FIRMS)

## Notes
- No API keys required - all free data sources
- Client-side only - no backend needed
- Open source under MIT license
