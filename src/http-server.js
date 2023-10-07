import "dotenv/config";
import express from "express";
import * as iqair from "./apis/iqair.js";
import * as db from "./apis/db.js";

const server = express();

export default server
  .get("/air-quality", async (req, res, next) => {
    try {
      const { lat, lon } = req.query;
      const data = await iqair.getAirQuality({ lat, lon });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  })
  .get("/max-timestamp", async (req, res, next) => {
    try {
      return res.json(await db.getDirtiestTimestamp());
    } catch (err) {
      next(err);
    }
  })
  // eslint-disable-next-line no-unused-vars
  .use(async (err, req, res, _next) => {
    const { error, ...response } = err;
    console.error(error);
    return res.status(500).json(response);
  });
