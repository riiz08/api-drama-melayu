import cors from "cors";
import express, { Application } from "express";
import dramaStreaming from "./routes/dramaStreaming";
import home from "./routes/home";
import proxyRouter from "./routes/proxy";
import allDrama from "./routes/allDrama";
import episodeDetail from "./routes/episodeDetail";
import dotenv from "dotenv";
import dramaDetail from "./routes/dramaDetail";
import latestUpdate from "./routes/latestUpdate";
import searchDrama from "./routes/searchDrama";
import streamRewrite from "./routes/streamRewrite";
import "./scripts/batchScrape";

dotenv.config();

const app: Application = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", home);
app.use("/api/v1/watch", dramaStreaming);
app.use("/api/v1/proxy", proxyRouter);
app.use("/api/v1/dramas/latest-update", latestUpdate);
app.use("/api/v1", allDrama);
app.use("/api/v1/drama", dramaDetail);
app.use("/api/v1", episodeDetail);
app.use("/api/v1/search", searchDrama);
app.use("/api/v1/proxy/stream", streamRewrite);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
