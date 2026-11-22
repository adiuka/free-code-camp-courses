# Real-Time Chat App

A small chat room built with Node.js and WebSockets. Several browser tabs can connect, send messages, and see each other's messages instantly.

## Files

- `server.js`: HTTP server plus WebSocket server (Node, `ws` package)
- `public/index.html`: the chat page the browser loads (with its frontend JavaScript)

## How It Works

1. **HTTP server** (`http.createServer`) serves `./public/index.html` when you open `http://localhost:3001`.
2. **WebSocket server** (`new WebSocketServer({ server })`) shares the same port and handles live connections.
3. **Connecting:** the browser opens `ws://localhost:3001?username=Alice`. The server reads `username` from the query string.
4. **Joining:** the server sends `{ type: "system", text: "Alice joined" }` to every connected client.
5. **Chatting:** the browser sends `{ username, text }`. The server parses it and sends `{ type: "chat", username, text }` to every client, including the sender.
6. **Leaving:** when a socket closes, the server sends `{ type: "system", text: "Alice left" }` to the remaining clients.

## Key Ideas

- **Broadcast** means looping over `wss.clients` and calling `client.send(...)` on each one.
- **`JSON.stringify` / `JSON.parse`:** WebSockets send text, so objects are turned into strings before sending and back into objects after receiving.
- **Message `type`:** a label the server adds so the browser knows how to display a message.
  - `system`: server announcement (joined/left), shown as plain text
  - `chat`: a user's message, shown as `username: text`
- **`escapeHtml` (frontend):** shows user input as plain text so nobody can inject HTML or scripts into other users' pages.

## Message Flow

```
Browser A ──{ username, text }──▶ Server ──{ type: "chat", username, text }──▶ Browser A
                                         └─────────────────────────────────▶ Browser B
```

## Run It

```bash
npm install ws
node server.js
```

Open `http://localhost:3001` in two tabs, connect with different usernames, and send messages.