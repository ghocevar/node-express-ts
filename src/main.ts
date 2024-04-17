import app from "./app.js";
import { createEnv } from "./env.js";

const env = createEnv();

const port = env.PORT || 8000;

const server = app.listen(port, async () => {
	console.log(`🚀 Server ready at: http://localhost:${port}`);
});

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
	console.log(err.name, err.message);
	process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
	console.log("UNHANDLED REJECTION! 💥 Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

process.on("SIGTERM", () => {
	console.log("👋 SIGTERM RECEIVED. Shutting down gracefully.");
	server.close(() => {
		console.log("💥 Process terminated!");
	});
});

process.on("SIGINT", () => {
	console.log("👋 SIGINT RECEIVED. Shutting down gracefully.");
	server.close(() => {
		console.log("💥 Process terminated!");
	});
});
