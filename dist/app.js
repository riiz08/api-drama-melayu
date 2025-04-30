"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dramaStreaming_1 = __importDefault(require("./routes/dramaStreaming"));
const home_1 = __importDefault(require("./routes/home"));
const proxy_1 = __importDefault(require("./routes/proxy"));
const allDrama_1 = __importDefault(require("./routes/allDrama"));
const episodeDetail_1 = __importDefault(require("./routes/episodeDetail"));
const dotenv_1 = __importDefault(require("dotenv"));
const dramaDetail_1 = __importDefault(require("./routes/dramaDetail"));
const latestUpdate_1 = __importDefault(require("./routes/latestUpdate"));
const searchDrama_1 = __importDefault(require("./routes/searchDrama"));
require("./scripts/batchScrape");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/", home_1.default);
app.use("/api/v1/watch", dramaStreaming_1.default);
app.use("/api/v1/proxy", proxy_1.default);
app.use("/api/v1/dramas/latest-update", latestUpdate_1.default);
app.use("/api/v1", allDrama_1.default);
app.use("/api/v1/drama", dramaDetail_1.default);
app.use("/api/v1", episodeDetail_1.default);
app.use("/api/v1/search", searchDrama_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
