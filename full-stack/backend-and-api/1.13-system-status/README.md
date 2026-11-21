# Real-Time System Metrics Dashboard

A small Node.js app that streams server metrics (memory usage and load average) to a browser over WebSockets, updating once per second.

## How it works

```
Browser (public/index.html + script.js)
        |  1. GET /            -> HTML page
        |  2. GET /script.js   -> client code
        |  3. WebSocket upgrade on the same port
        v
Node server (server.js)
        |  every 1000 ms, per connected client:
        |  socket.send(JSON.stringify(getMetrics()))
        v
Browser updates the DOM with the new values
```

## Project structure

```
.
├── package.json        # needs "type": "module" and the "ws" dependency
├── server.js           # HTTP server + WebSocket server
└── public/
    ├── index.html      # dashboard markup
    └── script.js       # WebSocket client + DOM updates
```

## Server (`server.js`)

- **ES modules**: uses `import` for `http`, `fs`, `os`, and `ws`. Requires `"type": "module"` in `package.json`.
- **Static file serving**: `http.createServer()` stored in `server`. A lookup table maps `/`, `/index.html`, and `/script.js` to files in `./public` with the right `Content-Type`. Unknown paths return `404`, read failures return `500`.
- **WebSocket server**: `new WebSocketServer({ server })` attaches to the same HTTP server, so HTTP and WebSocket share one port.
- **`getMetrics()`**: returns `loadAvg` (1/5/15 min), `freeMemMB`, `totalMemMB`, and `memUsagePct` using Node's `os` module.
- **Per-connection handler**:
  - Starts a `setInterval` (stored in `const interval`) that sends `JSON.stringify(getMetrics())` every 1000 ms.
  - Logs incoming messages with `data.toString()`, since `ws` v8+ delivers `Buffer`s.
  - On `close`, calls `clearInterval(interval)` so timers don't leak.
  - On `error`, logs the error.

## Client (`public/script.js`)

- Opens a WebSocket with the browser's built-in `WebSocket` class.
- `onopen` sets the status to "Connected", `onclose` sets it to "Disconnected", `onerror` logs the error.
- `onmessage` parses the JSON and passes it to the provided `updateMetrics()` helper, which writes values into the page.

## Running it

```bash
npm install ws
node server.js
```

Then open `http://localhost:<PORT>` (the port is set by `PORT` in `server.js`).

## Lessons learned / gotchas

- **`message` events fire on the individual socket**, not on the `WebSocketServer`. Attach `socket.on("message", ...)` inside the `connection` handler.
- **WebSocket messages are strings or binary**, so objects must be serialized with `JSON.stringify` before `socket.send`.
- **Stale processes**: Node doesn't hot-reload. An old server holding the port will answer instead of the new code. Restart after every change.
- **GitHub Codespaces**: the browser reaches the app through a forwarded URL (`https://<name>-<port>.app.github.dev`), not `localhost`, so a hardcoded `ws://localhost:PORT` fails. Private forwarded ports can also reject WebSocket handshakes. Fixes: build the URL from `location.host` and use `wss:` on HTTPS pages, and set the port's visibility to Public.
- **Dynamic client URL (optional)**, which works both locally and in Codespaces:

  ```javascript
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const socket = new WebSocket(`${protocol}//${location.host}`);
  ```