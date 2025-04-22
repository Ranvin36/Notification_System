const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { WebSocketServer, WebSocket } = require('ws');
const connectDb = require('./utils/dbConnection')();
const wss = new WebSocketServer({ server });
const clients = new Set();
wss.on('connection', (socket) =>{
    socket.on('message', (message) => {
        const notificationPayload = JSON.parse(message)
        if(notificationPayload.type === "sendNotification"){
            const query = "INSERT INTO notifications (message) VALUES (?)";
            connectDb.query(query,[notificationPayload.message],(err,results) => {
                console.log(results,"RESULTS")
                if(err){
                    console.log("Error inserting notification",err);
                }else{
                    console.log("Notification inserted successfully");
                }
            })
            wss.clients.forEach((client) => {
                if(client.readyState == WebSocket.OPEN){
                    client.send(JSON.stringify(notificationPayload));
                }
            })
        }
        if(notificationPayload.type === "getMessages"){
            const query = "SELECT * FROM notifications";
            connectDb.query(query, (err,results) => {
                if(err){
                    console.log("Error fetching notifications",err);
                }else{
                    socket.send(JSON.stringify({type:"getMessages",message:results}));
                }
            })
        }
    })
})

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

