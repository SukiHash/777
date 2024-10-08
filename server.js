const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 8080 });

server.on('connection', socket => {
    socket.on('message', message => {
        // Broadcast the message to all connected clients
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
