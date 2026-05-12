# India Insight

India Insight is an interactive India state intelligence dashboard with a choropleth map, state profiles, news briefs, Groq-powered news analysis, and an AI chat assistant.

## Features

- India state choropleth dashboard
- State search and profile drawer
- GSDP, population, literacy, area, and other state indicators
- News brief sidebar with image proxy fallback
- Groq-powered news analysis
- Groq-powered AI chat for dashboard questions and casual conversation
- Light and dark themes
- Express backend ready for Render hosting

## Tech Stack

- HTML, CSS, JavaScript
- Node.js
- Express
- Groq API
- GDELT news feed

## Local Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```bash
GROQ_API_KEY=your_real_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
PORT=3000
```

Start the app:

```bash
npm start
```

Open:

```text
http://127.0.0.1:3000
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes | Your Groq API key for AI chat and news analysis |
| `GROQ_MODEL` | No | Defaults to `llama-3.1-8b-instant` |
| `PORT` | No | Local server port. Render provides this automatically |

## API Routes

- `GET /api/health` checks server and Groq configuration
- `GET /api/news` fetches state news with fallback briefs
- `GET /api/image?url=...` proxies news images
- `POST /api/analyze-news` returns Groq analysis for a selected story
- `POST /api/chat` powers the AI chat assistant

## Deploying To Render

Create a Render Web Service with:

```text
Runtime: Node
Build Command: npm install
Start Command: npm start
```

Add environment variables in Render:

```text
GROQ_API_KEY=your_real_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
NODE_VERSION=20
```

Do not upload `.env` to GitHub. Render will use the environment variables from its dashboard.

## GitHub Upload Notes

Upload these files:

- `index.html`
- `script.js`
- `styles.css`
- `server.js`
- `package.json`
- `package-lock.json`
- `.env.example`
- `.gitignore`
- `README.md`
- map data files such as `india-state.js`, `india-composite.js`, and related `.geojson` files

Do not upload:

- `.env`
- `node_modules/`
- `server.out.log`
- `server.err.log`
- `.vscode/`

## Security Note

Never commit a real API key to GitHub. Keep the real Groq key only in `.env` locally and in Render environment variables for production.
