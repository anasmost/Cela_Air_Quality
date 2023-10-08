import "dotenv/config";
import request from "supertest";
import app from "../src/http-server";

function isTimeStamp(str) {
  return /^[\d-]+[T\s][\d:]*[.\dZ]*$/i.test(str);
}

describe("Test HTTP Server", () => {
  test("should GET latest Timestamp of the biggest recorded value of Paris' air pollution", (done) => {
    request(app)
      .get("/max-timestamp")
      .expect("Content-Type", /json/)
      .then(({ status, body }) => {
        if (status == 200) {
          expect(body).toHaveProperty("timestamp");
          expect(isTimeStamp(body.timestamp)).toBe(true);
        } else {
          expect(body).toHaveProperty("message");
          expect(body).toHaveProperty("statusText");
        }
      })
      .finally(done);
  });

  test("should GET the latest recorded pollution data of Paris", (done) => {
    request(app)
      .get("/air-quality?lat=48.856613&lon=2.352222")
      .expect("Content-Type", /json/)
      .then(({ status, body }) => {
        if (status == 200) {
          expect(body).toHaveProperty("result");
          for (const prop of ["ts", "aqius", "mainus", "aqicn", "maincn"]) {
            expect(body.result.pollution).toHaveProperty(prop);
          }
        } else {
          expect(body).toHaveProperty("message");
          expect(body).toHaveProperty("statusText");
        }
      })
      .finally(done);
  });

  test("should GET error on bad request", (done) => {
    request(app)
      .get("/air-quality?lat=48.856613")
      .expect("Content-Type", /json/)
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty("message");
        expect(body).toHaveProperty("statusText");
      })
      .finally(done);
  });
});
