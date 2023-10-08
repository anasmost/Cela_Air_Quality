import { CronJob } from "cron";
import * as iqair from "./apis/iqair.js";
import * as db from "./apis/db.js";

const job = new CronJob(
  "0 * * * * *",
  async function () {
    const {
      result: { pollution },
    } = await iqair.getAirQuality({ lat: 48.856613, lon: 2.352222 });

    await db.saveAirQuality({ timestamp: pollution.ts, air_quality: pollution.aqius });
  },
  null,
  false,
  "America/Los_Angeles"
);

export default job;
// job.start() - See note below when to use this
