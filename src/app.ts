import express, { Application } from "express";
import search from "./routes/search.route";
import dotenv from "dotenv";
import animeStreaming from "./routes/animeStreaming.route";
import latestRelease from "./routes/latestRelease.route";
import animeDetail from "./routes/animeDetail.route";
import cors from "cors";
import filteringAnime from "./routes/filteringAnime.route";
import mostPopularWeekly from "./routes/mostPopularWeekly.route";

dotenv.config();

const app: Application = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/anime/filter", filteringAnime);
app.use("/api/v1/anime/latest-release", latestRelease);
app.use("/api/v1/anime", search);
app.use("/api/v1/anime/watch", animeStreaming);
app.use("/api/v1/anime", animeDetail);
app.use("/api/v1/anime/popular/weekly", mostPopularWeekly);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
