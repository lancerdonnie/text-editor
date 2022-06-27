import { useEffect, useRef } from 'react';
import './App.css';
import { Connection } from 'sharedb/lib/client';
import StringBinding from 'sharedb-string-binding';
import ReconnectingWebSocket from 'reconnecting-websocket';
import type { Socket } from 'sharedb/lib/sharedb';
import { BASE_URL } from './config';

function App() {
  const textRef = useRef(null);

  useEffect(() => {
    const socket = new ReconnectingWebSocket(BASE_URL);
    const connection = new Connection(socket as Socket);
    const doc = connection.get('all', 'plain');
    doc.subscribe(function (err) {
      if (err) throw err;
      const binding = new StringBinding(textRef.current, doc, ['content']);
      binding.setup();
    });
  }, []);

  return (
    <div className="App">
      <h1 className="title">Text Editor</h1>
      <textarea className="paper" ref={textRef}></textarea>
    </div>
  );
}

export default App;
