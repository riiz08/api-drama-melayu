"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_route_1 = __importDefault(require("./routes/search.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const animeStreaming_route_1 = __importDefault(require("./routes/animeStreaming.route"));
const latestRelease_route_1 = __importDefault(require("./routes/latestRelease.route"));
const animeDetail_route_1 = __importDefault(require("./routes/animeDetail.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/v1/anime/latest-release", latestRelease_route_1.default);
app.use("/api/v1/anime", search_route_1.default);
app.use("/api/v1/anime/watch", animeStreaming_route_1.default);
app.use("/api/v1/anime", animeDetail_route_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
