import * as WebSocket from 'ws';
import * as WebSocketJSONStream from '@teamwork/websocket-json-stream';
import * as ShareDB from 'sharedb';
import * as express from 'express';
import * as http from 'http';

const backend = new ShareDB();
createDoc(startServer);

function createDoc(callback: () => void) {
  const connection = backend.connect();
  const doc = connection.get('all', 'plain');
  doc.fetch(function (err) {
    if (err) throw err;
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

  const PORT = process.env.PORT || 8080;
  server.listen(PORT);
  console.log('Listening on port ' + PORT);
}
