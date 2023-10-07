import server from "./http-server.js";
import job from "./cron.js";

// HTTP server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.info("Server is listening on port " + PORT);
});

// CRON
job.start();
[
  "beforeExit",
  "exit",
  "SIGINT",
  "unhandledRejection",
  "uncaughtException",
  "SIGKILL",
  "SIGABRT",
].forEach((e) => {
  process.on(e, (err) => {
    if (err) console.error(err);
    job.stop();
  });
});
