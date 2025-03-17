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
app.use("/users", userRoutes);
app.use("/obstacles", obstacleRoutes);
app.use("/gps", gpsRoutes);

setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
