"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");
const ShareDB = require("sharedb");
const express = require("express");
const http = require("http");
const backend = new ShareDB();
createDoc(startServer);
function createDoc(callback) {
    const connection = backend.connect();
    const doc = connection.get('all', 'plain');
    doc.fetch(function (err) {
        if (err)
            throw err;
        if (doc.type === null) {
            doc.create({ content: '' }, callback);
            return;
        }
        callback();
    });
}
function startServer() {
    const app = express();
    app.use(express.static('static'));
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server: server });
    wss.on('connection', function (ws) {
        const stream = new WebSocketJSONStream(ws);
        backend.listen(stream);
    });
    const PORT = process.env.SERVER_PORT || 8080;
    server.listen();
    console.log('Listening on port ' + PORT);
}
