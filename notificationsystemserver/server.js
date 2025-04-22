const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { WebSocketServer, WebSocket } = require('ws');

const wss = new WebSocketServer({ server });
const clients = new Set();
wss.on('connection', (socket) =>{
    socket.on('message', (message) => {
        const notification = JSON.parse(message)
        clients.add(socket);
        wss.clients.forEach((client) => {
            if(client.readyState == WebSocket.OPEN){
                client.send(JSON.stringify(notification));
            }
        })
    })
})

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

