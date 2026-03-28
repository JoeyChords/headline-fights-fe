# Headline Fights Frontend

## Overview

This is the Next.js frontend for Headline Fights. It renders the landing page,
login/register flows, the game, dashboard, settings, and the contact form.

## Node Version

Use Node 24.

- Preferred local version: `24.14.1`
- This repo pins Node in `.node-version`
- `package.json` also enforces the supported range

## Local Dev Quick Start

1. Install dependencies:

```bash
npm install
```

2. Make sure `.env.local` exists with the values needed by the contact route:

```env
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
RESEND_API_KEY=your_resend_key
SENDER_EMAIL=your_verified_sender
MY_EMAIL=your_destination_email
```

3. Start the frontend on port 3001:

```bash
npm run dev -- -p 3001
```

4. Open:

```text
http://localhost:3001
```

## How React Runs Here

You do not need to set up React separately.

This app uses Next.js, so local frontend development is just:

```bash
npm run dev -- -p 3001
```

That starts the Next.js development server.

## Local API Pairing

For full local development, run the API separately on port 3000.

The API repo should be started with:

```bash
cd /Users/buzzukajoe/Repos/HeadlineFights/headline-fights-api
npm run dev
```

The frontend then talks to:

```text
http://localhost:3000
```

## Local Vs Deployed API

This repo chooses the API through `NEXT_PUBLIC_API_ENDPOINT`.

Use one of these:

- Local frontend -> local API:

```env
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
```

- Local frontend -> deployed API:

```env
NEXT_PUBLIC_API_ENDPOINT=https://api.headlinefights.com
```

## Why Port 3001

The API defaults to port 3000, so the frontend should run on 3001 during local
development to avoid a port collision.

## Contact Form

The contact form uses the local Next.js route at
`app/api/contact/route.js`,
which sends email through Resend using values from `.env.local`.

If those env vars are real, local testing can send real email.

## Known Local Caveats

- Most app pages talk directly to `API_ENDPOINT`, so
  `NEXT_PUBLIC_API_ENDPOINT` must match the backend you want to hit

## Useful Commands

```bash
npm install
npm run dev -- -p 3001
npm run build
npm start
npm run lint
npm run format
npm test
```
