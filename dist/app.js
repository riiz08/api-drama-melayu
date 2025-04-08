"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dramaLatestRelease_1 = __importDefault(require("./routes/dramaLatestRelease"));
const getAllDrama_1 = __importDefault(require("./routes/getAllDrama"));
const detailEpisode_1 = __importDefault(require("./routes/detailEpisode"));
const search_1 = __importDefault(require("./routes/search"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/v1/drama-terbaru", dramaLatestRelease_1.default);
app.use("/api/v1/drama", getAllDrama_1.default);
app.use("/api/v1/watch", detailEpisode_1.default);
app.use("/api/v1/search", search_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
