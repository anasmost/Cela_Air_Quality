import "dotenv/config";
import job from "../src/cron-job.js";
import db from "../src/apis/db.js";

describe("Test CRON Job", () => {
  function delay(timeout) {
    return new Promise((res) => {
      setTimeout(res, timeout);
    });
  }

  beforeAll(() => {
    job.start();
  });
  afterAll(() => {
    job.stop();
  });

  test("should have been executed once after 1 minute", async () => {
    const [{ count: initialCount }] = await db("paris").count({ count: "*" });
    expect(job.running).toBe(true);

    await delay(job.nextDate().toMillis() - Date.now() + 5000);

    expect(job.lastDate()).toBeTruthy();
    const [{ count: newCount }] = await db("paris").count({ count: "*" });
    expect(+newCount).toBeGreaterThan(+initialCount);
  }, 70000);
});
