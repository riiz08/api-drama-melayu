"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dramaLatestUpdate_1 = __importDefault(require("./routes/dramaLatestUpdate"));
const dramaStreaming_1 = __importDefault(require("./routes/dramaStreaming"));
const allDrama_1 = __importDefault(require("./routes/allDrama"));
const allKomedi_1 = __importDefault(require("./routes/allKomedi"));
const dramaSearch_1 = __importDefault(require("./routes/dramaSearch"));
const home_1 = __importDefault(require("./routes/home"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/", home_1.default);
app.use("/api/v1/latest-update", dramaLatestUpdate_1.default);
app.use("/api/v1/watch", dramaStreaming_1.default);
app.use("/api/v1/drama", allDrama_1.default);
app.use("/api/v1/komedi", allKomedi_1.default);
app.use("/api/v1/", dramaSearch_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
