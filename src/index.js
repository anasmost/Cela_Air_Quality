import "dotenv/config";
import server from "./http-server.js";
import job from "./cron-job.js";

// HTTP server
const PORT = process.env.PORT || 9000;
const listener = server.listen(PORT, () => {
  console.info("Server is listening on port " + PORT);
});

// CRON
job.start();
["beforeExit", "exit", "SIGINT", "SIGKILL", "SIGABRT"].forEach((e) => {
  process.on(e, (err) => {
    if (err) console.error(err);
    job.stop();
    listener.close();
    process.exit(err.code);
  });
});
