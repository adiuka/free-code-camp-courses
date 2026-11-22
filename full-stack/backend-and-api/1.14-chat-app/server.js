import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {
	const files = {
  		"/": { path: "./public/index.html", contextType: "text/html" },
  		"/script.js": { path: "./public/script.js", contextType: "text/javascript" },
  		"/style.css": { path: "./public/style.css", contextType: "text/css" },
	};
	const file = files[req.url];

	if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

	fs.readFile(file.path, (err, data) => {
		if (err) {
			res.writeHead(500);
			res.end("Error loading page");
			return;
		}
		res.writeHead(200, { "Content-Type": file.contextType });
		res.end(data);
	})
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
	console.log("Client connected");
	const username = new URL(req.url, "http://localhost").searchParams.get("username");

	wss.clients.forEach((client) => {
  	client.send(JSON.stringify({ type: "system", text: `${username} joined` }));
	});

	socket.on("message", (data) => {
		const { username, text } = JSON.parse(data.toString());
		wss.clients.forEach((client) => {
			client.send(JSON.stringify({ type: "chat", username, text }));
		});
	});

	socket.on("close", () => {
		wss.clients.forEach((client) => {
			client.send(JSON.stringify({ type: "system", text: `${username} left` }));
		});
	});
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});