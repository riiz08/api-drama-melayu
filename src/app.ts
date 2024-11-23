import express, { Application } from "express";
import anime from "./routes/anime.route";
import search from "./routes/search.route";
import animeDetail from "./routes/animeDetail.route";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/anime", anime);
app.use("/api/v1/", search);
app.use("/api/v1/anime/", animeDetail);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
