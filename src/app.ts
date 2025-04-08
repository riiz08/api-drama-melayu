import cors from "cors";
import express, { Application, response } from "express";
import dramaLatestRelease from "./routes/dramaLatestRelease";
import getAllDrama from "./routes/getAllDrama";
import detailEpisode from "./routes/detailEpisode";
import search from "./routes/search";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/drama-terbaru", dramaLatestRelease);
app.use("/api/v1/drama", getAllDrama);
app.use("/api/v1/watch", detailEpisode);
app.use("/api/v1/search", search);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
