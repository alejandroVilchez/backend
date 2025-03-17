require("dotenv").config();
const express = require("express");
const mongoose = require("./db");
const http = require("http");
const { setupWebSocket } = require("./services/websocket");
const userRoutes = require("./routes/userRoutes");
const obstacleRoutes = require("./routes/obstacleRoutes");
const gpsRoutes = require("./routes/gpsRoutes");

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send("Hello world!");
  });
  
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/obstacles", obstacleRoutes);
app.use("/gps", gpsRoutes);

setupWebSocket(server);

// Captura errores globales
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});

