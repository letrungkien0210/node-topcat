'use strict';

/**
 * This file boots up a web server which accepts HTTP and Web Socket connections.
 * The `ws` package provides our web socket server, while `express` provides a convenient HTTP application framework.
 */

const WebSocketServer = require('ws').Server;
const express = require('express');
const app = express();

/**
 * Express will serve the static files from our `public` directory.
 */
app.use(express.static(__dirname + '/public'));

/**
 * Our HTTP server will listen on port 8080
 */
app.listen(8085);

/**
 * Our Web Socket server will listen on port 8081
 */
const server = new WebSocketServer({ port: 8086 });

/**
 * We need a place to keep track of the open Web Socket connections
 */
var connections = [];

// Setup complete!

/**
 * Register an event handler to be called every time a new client connects.
 */
server.on('connection', (ws) => {
    connections.push(ws);

    console.log(`Client connected. Active users: ${connections.length}`);

    updateClients();

    /**
     * This handler will be called every we *receive* a message from the client
     */
    ws.on('message', (message) => {
        console.log(message);
        connections.forEach((socket) => {
            socket.send(message);
        });
    });

    /**
     * This handler will be called when the client closes the connection.
     */
    ws.on('close', (code, message) => {
        //Remove the client's socket from our connection pool
        connections = connections.filter((el) => el !== ws);

        console.log(`Client disconnected: [${code}] ${message} Active users: ${connections.length}`);

        //Update remaining users
        updateClients();
    });
});

/**
 * This function pushes a status message to each connected socket indicating how many active connections there are.
 */
function updateClients() {
    if(!connections.length) {
        return;
    }

    let message = connections.length > 1 ? `Welcome to the Node JS workshop! There are currently ${connections.length} active users.` : 'You\'re all alone! :(';

    for(let i = 0; i < connections.length; i++) {
        connections[i].send(JSON.stringify({
            type: 'status',
            text: message
        }));
    }
}