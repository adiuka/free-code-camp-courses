import express from "express";
import weatherRouter from "./weather.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/status", (req, res) => {
	res.status(200).json({
		status: "true"
	})
});

app.get("/api/info", (req, res) => {
	res.json({
		name: "weather-api",
		version: "1.0.0",
		endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"],
	});
});

app.get("/docs", (req, res) => {
	res.redirect("/api/info");
});

app.get("/api/greet/:name", (req, res) => {
	const { name } = req.params;
	res.json({
		message: `Hello ${name}`
	});
});

app.route("/api/data")
	.get((req, res) => {
		res.json({});
	})
	.post((req, res) => {
		res.status(201).json({
			message: "Created"
		});
	});

app.use("/api/weather", weatherRouter);

app.listen(PORT, () => {
	console.log(`Server listeing to responses on http://localhost:${PORT}`);
});