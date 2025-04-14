import cors from "cors";
import express, { Application } from "express";
import dramaLatestUpdate from "./routes/dramaLatestUpdate";
import dramaStreaming from "./routes/dramaStreaming";
import dramaDetail from "./routes/dramaDetail";
import dramaSearch from "./routes/dramaSearch";
import home from "./routes/home";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", home);
app.use("/api/v1/latest-update", dramaLatestUpdate);
app.use("/api/v1/watch", dramaStreaming);
app.use("/api/v1/category", dramaDetail);
app.use("/api/v1/", dramaSearch);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
