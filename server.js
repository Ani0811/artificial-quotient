const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const parsedPort = !isNaN(Number(port)) ? Number(port) : 3000;

const app = next({ dev, port: parsedPort });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling request", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${port}`);

      // Background periodic YouTube stats auto-refresh
      const triggerAutoSync = () => {
        const http = require("http");
        const req = http.get(`http://127.0.0.1:${port}/api/admin/data`, (res) => {
          res.resume();
        });
        req.on("error", (e) => {
          // Non-critical background ping
        });
      };

      // Trigger warm-up sync 5 seconds after server start
      setTimeout(triggerAutoSync, 5000);
      // Periodic 1-hour maintenance refresh
      setInterval(triggerAutoSync, 60 * 60 * 1000);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js server:", err);
    process.exit(1);
  });
