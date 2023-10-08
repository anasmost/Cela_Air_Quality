import express from "express";
import * as iqair from "./apis/iqair.js";
import * as db from "./apis/db.js";

const server = express();

function queryValidator(req, res, next) {
  if ("lat" in req.query && "lon" in req.query) {
    for (const [key, value] of Object.entries(req.query)) {
      if (!/\d+\.?\d*/.test(value))
        return next({
          error: new Error(`Bad query param: ${key}=${value}`),
          status: 400,
          statusText: "Bad Request",
        });
    }
    next();
  } else
    next({
      error: new Error('Missing query params: we need both "lat" and "lon"'),
      status: 400,
      statusText: "Bad Request",
    });
}

export default server
  .get("/air-quality", queryValidator, async (req, res, next) => {
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
      return res.status(200).json(await db.getDirtiestTimestamp());
    } catch (err) {
      next(err);
    }
  })
  // eslint-disable-next-line no-unused-vars
  .use(async (err, req, res, _next) => {
    const { error, status, ...response } = err;
    console.error(error);
    return res.status(status || 500).json({ ...response, message: error.message });
  });
