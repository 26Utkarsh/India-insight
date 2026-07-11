<div align="center">

<br/>

<!-- Hero SVG Banner -->
<svg width="780" height="160" viewBox="0 0 780 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0f3460"/>
      <stop offset="50%" stop-color="#16213e"/>
      <stop offset="100%" stop-color="#0f3460"/>
    </linearGradient>
    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FF9933" stop-opacity="0"/>
      <stop offset="30%" stop-color="#FF9933"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#138808"/>
      <stop offset="100%" stop-color="#138808" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="780" height="160" rx="14" fill="url(#bgGrad)"/>

  <!-- Subtle grid lines -->
  <line x1="0" y1="40" x2="780" y2="40" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
  <line x1="0" y1="80" x2="780" y2="80" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
  <line x1="0" y1="120" x2="780" y2="120" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
  <line x1="195" y1="0" x2="195" y2="160" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
  <line x1="390" y1="0" x2="390" y2="160" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
  <line x1="585" y1="0" x2="585" y2="160" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>

  <!-- India outline dots (decorative) -->
  <circle cx="60" cy="55" r="2" fill="#FF9933" opacity="0.6"/>
  <circle cx="72" cy="68" r="1.5" fill="#FF9933" opacity="0.5"/>
  <circle cx="65" cy="80" r="2" fill="#ffffff" opacity="0.5"/>
  <circle cx="78" cy="90" r="1.5" fill="#138808" opacity="0.6"/>
  <circle cx="68" cy="100" r="2" fill="#138808" opacity="0.5"/>
  <circle cx="55" cy="110" r="1.5" fill="#138808" opacity="0.4"/>

  <!-- Tricolor accent bar -->
  <rect x="140" y="48" width="500" height="3" rx="1.5" fill="url(#lineGrad)" opacity="0.8"/>

  <!-- Main title -->
  <text x="390" y="88" font-family="'Segoe UI', system-ui, sans-serif" font-size="38" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5">India Insight</text>

  <!-- Subtitle -->
  <text x="390" y="114" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle" letter-spacing="2">STATE INTELLIGENCE DASHBOARD</text>

  <!-- Bottom tricolor line -->
  <rect x="140" y="130" width="500" height="2" rx="1" fill="url(#lineGrad)" opacity="0.5"/>

  <!-- Right decorative dots -->
  <circle cx="720" cy="55" r="2" fill="#FF9933" opacity="0.6"/>
  <circle cx="708" cy="68" r="1.5" fill="#FF9933" opacity="0.5"/>
  <circle cx="715" cy="80" r="2" fill="#ffffff" opacity="0.5"/>
  <circle cx="702" cy="90" r="1.5" fill="#138808" opacity="0.6"/>
  <circle cx="712" cy="100" r="2" fill="#138808" opacity="0.5"/>
  <circle cx="725" cy="110" r="1.5" fill="#138808" opacity="0.4"/>
</svg>

<br/>

<!-- Badges -->
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Groq](https://img.shields.io/badge/Groq_AI-FF6B35?style=flat-square&logoColor=white)
![Render](https://img.shields.io/badge/Deployed_on_Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

**An interactive India state intelligence dashboard** — choropleth maps, live news, AI-powered analysis, and a conversational assistant, all in one place.

</div>

---

## Dashboard Preview

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🇮🇳  India Insight                            🌙  [Light / Dark]       │
├──────────────────────┬──────────────────────────┬───────────────────────┤
│                      │                          │                       │
│   Search: [_______]  │   ╔══════════════════╗   │  📰 Latest News       │
│                      │   ║                  ║   │  ─────────────────    │
│   ● Maharashtra      │   ║   CHOROPLETH     ║   │  • Maharashtra GDP    │
│   ● Tamil Nadu       │   ║   MAP OF INDIA   ║   │    hits $400B         │
│   ● Karnataka        │   ║                  ║   │  • Kerala literacy    │
│   ● Gujarat          │   ║  [hover states]  ║   │    reaches 97%        │
│   ● Rajasthan        │   ║                  ║   │  • Rajasthan solar    │
│   ...28 states       │   ╚══════════════════╝   │    capacity triples   │
│                      │                          │                       │
│   ─────────────────  │  GSDP  ████░░  ₹28.8T   │  [Analyze with AI ↗]  │
│                      │  Pop   ███░░░  1.42B     │                       │
│   State Profile      │  Lit   █████░  77.7%     │  ─────────────────    │
│   ─────────────────  │  Area  ██░░░░  3.29M     │  🤖 AI Chat           │
│   Maharashtra        │                          │  ─────────────────    │
│   Capital: Mumbai    │                          │  Ask anything about   │
│   GSDP: ₹36.3T      │                          │  Indian states...     │
│   Literacy: 84.8%   │                          │  [__________________] │
└──────────────────────┴──────────────────────────┴───────────────────────┘
```

---

## Features

<!-- Feature grid SVG -->
<svg width="100%" viewBox="0 0 740 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Row 1: 3 cards -->
  <!-- Card 1: Choropleth Map -->
  <rect x="10" y="10" width="220" height="90" rx="10" fill="#0f3460" stroke="#1e4d8c" stroke-width="0.5"/>
  <text x="30" y="38" font-family="system-ui,sans-serif" font-size="20" fill="#FF9933">🗺️</text>
  <text x="60" y="40" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">Choropleth Map</text>
  <text x="20" y="60" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">Interactive India map with</text>
  <text x="20" y="76" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">color-coded state metrics</text>
  <text x="20" y="92" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">hover • click • explore</text>

  <!-- Card 2: State Profiles -->
  <rect x="260" y="10" width="220" height="90" rx="10" fill="#0f3460" stroke="#1e4d8c" stroke-width="0.5"/>
  <text x="280" y="38" font-family="system-ui,sans-serif" font-size="20" fill="#4ade80">📊</text>
  <text x="310" y="40" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">State Profiles</text>
  <text x="270" y="60" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">GSDP, population, literacy,</text>
  <text x="270" y="76" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">area &amp; key indicators</text>
  <text x="270" y="92" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">28 states • 8 UTs</text>

  <!-- Card 3: AI News Analysis -->
  <rect x="510" y="10" width="220" height="90" rx="10" fill="#0f3460" stroke="#1e4d8c" stroke-width="0.5"/>
  <text x="530" y="38" font-family="system-ui,sans-serif" font-size="20" fill="#a78bfa">🤖</text>
  <text x="560" y="40" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">AI News Analysis</text>
  <text x="520" y="60" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">Groq-powered summaries</text>
  <text x="520" y="76" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">of state-specific stories</text>
  <text x="520" y="92" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">llama-3.1-8b-instant</text>

  <!-- Row 2: 3 cards -->
  <!-- Card 4: News Feed -->
  <rect x="10" y="120" width="220" height="90" rx="10" fill="#0f3460" stroke="#1e4d8c" stroke-width="0.5"/>
  <text x="30" y="148" font-family="system-ui,sans-serif" font-size="20" fill="#fb923c">📰</text>
  <text x="60" y="150" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">Live News Feed</text>
  <text x="20" y="170" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">GDELT-powered briefs with</text>
  <text x="20" y="186" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">image proxy fallback</text>
  <text x="20" y="202" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">state-scoped • real-time</text>

  <!-- Card 5: AI Chat -->
  <rect x="260" y="120" width="220" height="90" rx="10" fill="#0f3460" stroke="#1e4d8c" stroke-width="0.5"/>
  <text x="280" y="148" font-family="system-ui,sans-serif" font-size="20" fill="#38bdf8">💬</text>
  <text x="310" y="150" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">AI Chat Assistant</text>
  <text x="270" y="170" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">Ask questions about any</text>
  <text x="270" y="186" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">state, policy, or statistic</text>
  <text x="270" y="202" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">conversational • context-aware</text>

  <!-- Card 6: Themes -->
  <rect x="510" y="120" width="220" height="90" rx="10" fill="#0f3460" stroke="#1e4d8c" stroke-width="0.5"/>
  <text x="530" y="148" font-family="system-ui,sans-serif" font-size="20" fill="#f9a8d4">🎨</text>
  <text x="560" y="150" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">Light &amp; Dark Theme</text>
  <text x="520" y="170" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">Full theme toggle with</text>
  <text x="520" y="186" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">preference persistence</text>
  <text x="520" y="202" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">accessible • responsive</text>
</svg>

---

## Architecture

<!-- Architecture flow diagram -->
<svg width="100%" viewBox="0 0 740 310" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="370" y="22" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle" letter-spacing="1.5">SYSTEM ARCHITECTURE</text>

  <!-- CLIENT LAYER -->
  <rect x="10" y="38" width="720" height="82" rx="10" fill="#0f3460" stroke="#1e4d8c" stroke-width="0.5"/>
  <text x="22" y="56" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" letter-spacing="1">CLIENT</text>
  <!-- Browser box -->
  <rect x="20" y="60" width="180" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="110" y="82" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#e2e8f0" text-anchor="middle">Browser</text>
  <text x="110" y="98" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">HTML + CSS + JS</text>
  <!-- Map box -->
  <rect x="220" y="60" width="155" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="297" y="82" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#e2e8f0" text-anchor="middle">Choropleth Map</text>
  <text x="297" y="98" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">GeoJSON + D3/Leaflet</text>
  <!-- State drawer -->
  <rect x="393" y="60" width="155" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="470" y="82" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#e2e8f0" text-anchor="middle">State Drawer</text>
  <text x="470" y="98" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Profile + News</text>
  <!-- Chat UI -->
  <rect x="566" y="60" width="154" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="643" y="82" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#e2e8f0" text-anchor="middle">Chat UI</text>
  <text x="643" y="98" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Conversational AI</text>

  <!-- Arrows down -->
  <line x1="370" y1="122" x2="370" y2="148" stroke="#334155" stroke-width="1" marker-end="url(#arr)"/>

  <!-- SERVER LAYER -->
  <rect x="10" y="150" width="720" height="82" rx="10" fill="#0d2137" stroke="#1e4d8c" stroke-width="0.5"/>
  <text x="22" y="168" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" letter-spacing="1">SERVER · Express.js on Node.js</text>
  <!-- Routes -->
  <rect x="20" y="172" width="130" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="85" y="194" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#4ade80" text-anchor="middle">GET /health</text>
  <text x="85" y="210" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Status check</text>
  <rect x="165" y="172" width="130" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="230" y="194" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#38bdf8" text-anchor="middle">GET /news</text>
  <text x="230" y="210" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">State news feed</text>
  <rect x="310" y="172" width="130" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="375" y="194" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#fb923c" text-anchor="middle">GET /image</text>
  <text x="375" y="210" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Image proxy</text>
  <rect x="455" y="172" width="130" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="520" y="194" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#a78bfa" text-anchor="middle">POST /analyze</text>
  <text x="520" y="210" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Groq analysis</text>
  <rect x="600" y="172" width="130" height="50" rx="6" fill="#16213e" stroke="#334155" stroke-width="0.5"/>
  <text x="665" y="194" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#f9a8d4" text-anchor="middle">POST /chat</text>
  <text x="665" y="210" font-family="system-ui,sans-serif" font-size="10" fill="#64748b" text-anchor="middle">AI chat</text>

  <!-- Arrows down from server -->
  <line x1="230" y1="234" x2="230" y2="258" stroke="#334155" stroke-width="1" marker-end="url(#arr)"/>
  <line x1="520" y1="234" x2="520" y2="258" stroke="#334155" stroke-width="1" marker-end="url(#arr)"/>

  <!-- EXTERNAL LAYER -->
  <rect x="70" y="260" width="320" height="40" rx="8" fill="#0f2d1a" stroke="#15803d" stroke-width="0.5"/>
  <text x="230" y="285" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#4ade80" text-anchor="middle">GDELT News API</text>
  <rect x="420" y="260" width="320" height="40" rx="8" fill="#1e0a3c" stroke="#7c3aed" stroke-width="0.5"/>
  <text x="580" y="285" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#a78bfa" text-anchor="middle">Groq AI (LLaMA 3.1)</text>
</svg>

---

## Tech Stack

<!-- Tech stack visual -->
<svg width="100%" viewBox="0 0 740 70" xmlns="http://www.w3.org/2000/svg">
  <!-- HTML5 -->
  <rect x="10" y="10" width="100" height="50" rx="8" fill="#0f3460" stroke="#e2341d" stroke-width="0.5"/>
  <text x="60" y="32" font-family="system-ui,sans-serif" font-size="18" fill="#e2341d" text-anchor="middle">⬡</text>
  <text x="60" y="52" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">HTML / CSS / JS</text>

  <!-- Node.js -->
  <rect x="125" y="10" width="100" height="50" rx="8" fill="#0f3460" stroke="#339933" stroke-width="0.5"/>
  <text x="175" y="32" font-family="system-ui,sans-serif" font-size="18" fill="#339933" text-anchor="middle">⬡</text>
  <text x="175" y="52" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Node.js</text>

  <!-- Express -->
  <rect x="240" y="10" width="100" height="50" rx="8" fill="#0f3460" stroke="#ffffff" stroke-width="0.5"/>
  <text x="290" y="32" font-family="system-ui,sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">⬡</text>
  <text x="290" y="52" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Express</text>

  <!-- Groq -->
  <rect x="355" y="10" width="100" height="50" rx="8" fill="#0f3460" stroke="#FF6B35" stroke-width="0.5"/>
  <text x="405" y="32" font-family="system-ui,sans-serif" font-size="18" fill="#FF6B35" text-anchor="middle">⬡</text>
  <text x="405" y="52" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Groq API</text>

  <!-- GDELT -->
  <rect x="470" y="10" width="100" height="50" rx="8" fill="#0f3460" stroke="#4ade80" stroke-width="0.5"/>
  <text x="520" y="32" font-family="system-ui,sans-serif" font-size="18" fill="#4ade80" text-anchor="middle">⬡</text>
  <text x="520" y="52" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">GDELT</text>

  <!-- Render -->
  <rect x="585" y="10" width="145" height="50" rx="8" fill="#0f3460" stroke="#46E3B7" stroke-width="0.5"/>
  <text x="657" y="32" font-family="system-ui,sans-serif" font-size="18" fill="#46E3B7" text-anchor="middle">⬡</text>
  <text x="657" y="52" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Render (Cloud)</text>
</svg>

---

## Local Setup

**1. Clone and install**

```bash
git clone https://github.com/your-username/india-insight.git
cd india-insight
npm install
```

**2. Configure environment**

```bash
# Create .env in project root
GROQ_API_KEY=your_real_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
PORT=3000
```

**3. Run**

```bash
npm start
# Open http://127.0.0.1:3000
```

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | — | Groq API key for AI chat and news analysis |
| `GROQ_MODEL` | ❌ No | `llama-3.1-8b-instant` | Groq model identifier |
| `PORT` | ❌ No | `3000` | Server port (auto-set by Render in prod) |

---

## API Reference

<!-- API endpoints visual -->
<svg width="100%" viewBox="0 0 740 200" xmlns="http://www.w3.org/2000/svg">
  <!-- GET /api/health -->
  <rect x="10" y="10" width="340" height="52" rx="8" fill="#0f2d1a" stroke="#15803d" stroke-width="0.5"/>
  <rect x="18" y="22" width="42" height="18" rx="4" fill="#15803d"/>
  <text x="39" y="34" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">GET</text>
  <text x="72" y="34" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#4ade80">/api/health</text>
  <text x="18" y="54" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">Checks server status and Groq API configuration</text>

  <!-- GET /api/news -->
  <rect x="390" y="10" width="340" height="52" rx="8" fill="#0f2d1a" stroke="#15803d" stroke-width="0.5"/>
  <rect x="398" y="22" width="42" height="18" rx="4" fill="#15803d"/>
  <text x="419" y="34" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">GET</text>
  <text x="452" y="34" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#4ade80">/api/news</text>
  <text x="398" y="54" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">Fetches state news with fallback briefs</text>

  <!-- GET /api/image -->
  <rect x="10" y="80" width="340" height="52" rx="8" fill="#0f2d1a" stroke="#15803d" stroke-width="0.5"/>
  <rect x="18" y="92" width="42" height="18" rx="4" fill="#15803d"/>
  <text x="39" y="104" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">GET</text>
  <text x="72" y="104" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#4ade80">/api/image?url=…</text>
  <text x="18" y="124" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">Proxies news images to bypass CORS</text>

  <!-- POST /api/analyze-news -->
  <rect x="390" y="80" width="340" height="52" rx="8" fill="#1e0a3c" stroke="#7c3aed" stroke-width="0.5"/>
  <rect x="398" y="92" width="46" height="18" rx="4" fill="#7c3aed"/>
  <text x="421" y="104" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">POST</text>
  <text x="456" y="104" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#a78bfa">/api/analyze-news</text>
  <text x="398" y="124" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">Returns Groq analysis for a selected story</text>

  <!-- POST /api/chat -->
  <rect x="10" y="150" width="340" height="42" rx="8" fill="#1e0a3c" stroke="#7c3aed" stroke-width="0.5"/>
  <rect x="18" y="162" width="46" height="18" rx="4" fill="#7c3aed"/>
  <text x="41" y="174" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">POST</text>
  <text x="76" y="174" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#a78bfa">/api/chat</text>
  <text x="18" y="186" font-family="system-ui,sans-serif" font-size="11" fill="#64748b">Powers the AI chat assistant</text>
</svg>

---

## Deploying to Render

Create a **Web Service** with:

| Setting | Value |
|---|---|
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

Add these environment variables in the Render dashboard:

```
GROQ_API_KEY=your_real_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
NODE_VERSION=20
```

> **Never** commit your `.env` file. Render injects secrets from its dashboard automatically.

---

## Repository Structure

```
india-insight/
├── index.html              # Main frontend
├── script.js               # Client-side logic + map interaction
├── styles.css              # Theming + responsive layout
├── server.js               # Express server + API routes
├── package.json
├── package-lock.json
├── .env.example            # Template for local setup
├── .gitignore
├── README.md
└── map-data/
    ├── india-state.js
    ├── india-composite.js
    └── *.geojson           # State boundary data
```

**Do not commit:** `.env` · `node_modules/` · `server.out.log` · `server.err.log` · `.vscode/`

---

## Security

<!-- Security callout SVG -->
<svg width="100%" viewBox="0 0 740 60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="740" height="60" rx="10" fill="#1c0a0a" stroke="#dc2626" stroke-width="0.5"/>
  <text x="22" y="22" font-family="system-ui,sans-serif" font-size="16" fill="#ef4444">⚠</text>
  <text x="46" y="22" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#fca5a5">Never commit API keys to GitHub.</text>
  <text x="22" y="44" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">Keep your Groq API key in .env locally and in Render environment variables for production. The .env file</text>
  <text x="22" y="58" font-family="system-ui,sans-serif" font-size="11" fill="#94a3b8">is listed in .gitignore — never remove it from there.</text>
</svg>

---

<div align="center">

Made with ❤️ for Bharat &nbsp;·&nbsp; Powered by Groq + GDELT &nbsp;·&nbsp; Deployed on Render

</div>
