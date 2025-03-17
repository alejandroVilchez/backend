const WebSocket = require("ws");

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("Cliente WebSocket conectado");

        ws.on("message", (message) => {
            console.log("Mensaje recibido:", message);
        });

        ws.on("close", () => {
            console.log("Cliente desconectado");
        });
    });

    return wss;
}

module.exports = { setupWebSocket };
