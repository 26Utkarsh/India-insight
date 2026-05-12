import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 3000;
const groqModel = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

function getGroqKey() {
  return String(process.env.GROQ_API_KEY || "").trim();
}

async function askGroq(messages, options = {}) {
  const apiKey = getGroqKey();
  if (!apiKey) {
    const err = new Error("GROQ_API_KEY is not configured");
    err.statusCode = 400;
    throw err;
  }

  const groq = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options.model || groqModel,
      temperature: options.temperature ?? 0.45,
      max_tokens: options.max_tokens || 520,
      messages,
    }),
  });

  const text = await groq.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!groq.ok) {
    const err = new Error(data.error?.message || data.message || text || `Groq failed with HTTP ${groq.status}`);
    err.statusCode = groq.status;
    err.details = data;
    throw err;
  }

  return data.choices?.[0]?.message?.content?.trim() || "";
}

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    groqConfigured: Boolean(getGroqKey()),
    groqModel,
  });
});

const englishOnly = (text = "") => /^[\x00-\x7F]*$/.test(text) && /[a-z]/i.test(text);
let newsCache = { timestamp: 0, news: [] };

const curatedNews = [
  {
    title: "Maharashtra and Tamil Nadu draw fresh electronics and EV investment proposals",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Delhi NCR pollution response pushes new clean transport and construction monitoring steps",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Uttar Pradesh expressway and logistics corridor projects remain central to state growth",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Karnataka education and startup ecosystem indicators continue to support high-value jobs",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Odisha and Gujarat ports-linked mega projects strengthen export and industrial output outlook",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Kerala health and digital public service indicators keep improving district-level resilience",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Tamil Nadu manufacturing growth keeps automobile and electronics clusters in national focus",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Assam infrastructure push strengthens logistics links across the North East growth corridor",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=320&q=75",
  },
];

app.get("/api/image", async (req, res) => {
  const rawUrl = String(req.query.url || "");
  if (!/^https?:\/\//i.test(rawUrl)) return res.status(400).send("Invalid image URL");

  try {
    const image = await fetch(rawUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 IndiaInsight/1.0",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });
    if (!image.ok) throw new Error(`Image fetch failed: ${image.status}`);

    const contentType = image.headers.get("content-type") || "image/jpeg";
    if (!contentType.startsWith("image/")) throw new Error("URL did not return an image");

    const buffer = Buffer.from(await image.arrayBuffer());
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(buffer);
  } catch {
    res.status(404).send("Image unavailable");
  }
});

app.get("/api/news", async (_req, res) => {
  const query = 'sourcelang:english India states (GDP OR pollution OR education OR infrastructure OR "mega project" OR expressway OR metro)';
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=ArtList&format=json&maxrecords=30&timespan=7d&sort=HybridRel`;
  const cacheAgeMs = Date.now() - newsCache.timestamp;

  if (newsCache.news.length && cacheAgeMs < 10 * 60 * 1000) {
    return res.json({ news: newsCache.news, cached: true });
  }

  try {
    const gdelt = await fetch(url);
    if (!gdelt.ok) throw new Error(`GDELT failed: ${gdelt.status}`);
    const data = await gdelt.json();
    const seen = new Set();
    const news = (data.articles || [])
      .filter(item => item.title && item.url && englishOnly(item.title))
      .filter(item => {
        const key = item.title.toLowerCase().replace(/\W+/g, " ").trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 12)
      .map(item => ({
        title: item.title,
        url: item.url,
        source: item.sourceCommonName || item.domain || "GDELT",
        image: item.socialimage || "",
        seenAt: item.seendate || "",
      }));

    if (!news.length) throw new Error("GDELT returned no readable English state headlines");
    newsCache = { timestamp: Date.now(), news };
    res.json({ news });
  } catch (error) {
    const fallbackNews = newsCache.news.length ? newsCache.news : curatedNews;
    res.json({
      error: error.message,
      fallback: true,
      cached: Boolean(newsCache.news.length),
      news: fallbackNews,
    });
  }
});

app.post("/api/analyze-news", async (req, res) => {
  const news = req.body?.news || {};
  const state = req.body?.state || "India";

  try {
    const analysis = await askGroq([
      {
        role: "system",
        content: "You are an India state intelligence analyst. Give concise, practical analysis in English only. Avoid hype. Mention likely impact, affected sectors, risks, and what to watch next.",
      },
      {
        role: "user",
        content: `State: ${state}\nHeadline: ${news.title || "No title"}\nSource: ${news.source || "Unknown"}\nURL: ${news.url || "N/A"}`,
      },
    ], { temperature: 0.35, max_tokens: 420 });
    res.json({ analysis });
  } catch (error) {
    res.status(error.statusCode || 502).json({ error: error.message, details: error.details || null });
  }
});

app.post("/api/chat", async (req, res) => {
  const message = String(req.body?.message || "").trim();
  const context = req.body?.context || {};
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const answer = await askGroq([
      {
        role: "system",
        content: "You are India Insight's friendly AI assistant. Answer casual human chat naturally. For dashboard/data questions, use the supplied context first and say when the context is limited. Be concise, clear, and helpful.",
      },
      {
        role: "user",
        content: `Dashboard context JSON:\n${JSON.stringify(context).slice(0, 12000)}\n\nUser message:\n${message}`,
      },
    ], { temperature: 0.55, max_tokens: 520 });
    res.json({ answer: answer || "I could not generate a response." });
  } catch (error) {
    res.status(error.statusCode || 502).json({ error: error.message, details: error.details || null });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`India Insight running on port ${port}`);
});
