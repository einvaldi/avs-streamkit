const NodeMediaServer = require('node-media-server');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// ── RTMP Server config ──────────────────────────────────────────────
const nms = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
});

// ── Sesiones activas ─────────────────────────────────────────────────
const sessions = {};

nms.on('prePublish', (id, StreamPath, args) => {
  const key = StreamPath.split('/').pop();
  sessions[key] = { id, start: Date.now(), viewers: 0 };
  io.emit('stream:start', { key });
  console.log(`[AVS StreamKit] Stream iniciado: ${key}`);
});

nms.on('donePublish', (id, StreamPath) => {
  const key = StreamPath.split('/').pop();
  delete sessions[key];
  io.emit('stream:stop', { key });
  console.log(`[AVS StreamKit] Stream terminado: ${key}`);
});

// ── API REST ─────────────────────────────────────────────────────────
app.get('/api/status', (req, res) => {
  res.json({
    active: Object.keys(sessions).length,
    sessions: Object.keys(sessions).map(k => ({
      key: k,
      duration: Math.floor((Date.now() - sessions[k].start) / 1000)
    }))
  });
});

// ── Socket.IO — stats en tiempo real ─────────────────────────────────
io.on('connection', (socket) => {
  socket.on('stats:update', (data) => {
    io.emit('stats:broadcast', data);
  });
});

// ── Arranque ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`[AVS StreamKit] HTTP en puerto ${PORT}`);
});
nms.run();
