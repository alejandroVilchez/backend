const { Server } = require("socket.io");
function setupWebSocket(server) {
    const io = new Server(server, {
        cors: { origin: "*" },
    });
    io.on("connection", (socket) => {
        console.log("Cliente conectado");
        socket.on("gpsData", (data) => {
            console.log("Datos GPS recibidos:", data);
            io.emit("gpsUpdate", data);
        });
        socket.on("disconnect", () => {
            console.log("Cliente desconectado");
        });
    });
}
module.exports = { setupWebSocket };
