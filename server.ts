import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // simple in-memory store for demo
  let userData = {
    id: "u123",
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    status: "Gold Member",
    points: 1250,
    phone: "081-234-5678",
    memberSince: "Oct 2023",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIDFcNL30ANmtFeZvId77liOGm-hldUn_1lp8yH5eBv4kFz4SR1HhZSctGjqiwrSE_f1VEvKTycCDy_eQxXfSnO-HSf_StZBltt_n2kgD5Q-fkEeM46y8VEH1FVX-bsQsdoGwnMS83LqPYYP3CUX7joDw3YOB1Zfe5oOk4FWgM7PFvlPQRrHhqBl4ElHd_r8nTELSmpTK_5iIbwnF24LiCt4sHqt6zQJXIvUMgKNyoIm7eXJ2UyDKKMw2R7_ART0xGLpHOGCzUpjo"
  };

  // API routes
  app.get("/api/user", (req, res) => {
    res.json(userData);
  });

  app.post("/api/user", (req, res) => {
    userData = { ...userData, ...req.body };
    res.json(userData);
  });

  app.get("/api/activity", (req, res) => {
    res.json([
      { id: "1", title: "Coffee Purchase", date: "Today, 08:30 AM", points: "+25 pts", icon: "Coffee" },
      { id: "2", title: "Merchandise Store", date: "Yesterday, 14:15 PM", points: "+120 pts", icon: "ShoppingBag" },
      { id: "3", title: "Reward Claimed", date: "Oct 12, 2023", points: "-500 pts", icon: "Gift" }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
