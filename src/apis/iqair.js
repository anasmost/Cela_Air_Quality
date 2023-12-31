import axios from "axios";

const iqair = axios.create({
  baseURL: process.env.IQAIR_URL,
  params: {
    key: process.env.IQAIR_KEY,
  },
});

export async function getAirQuality({ lat = 48.856613, lon = 2.352222 }) {
  try {
    const {
      data: {
        data: {
          current: { pollution },
        },
      },
    } = await iqair.get("/nearest_city", { params: { lat, lon } });

    return { result: { pollution } };
  } catch (err) {
    if (err.response) {
      throw {
        error: err,
        message: err.response.data.data.message,
        statusText: err.response.data.data.status,
      };
    } else {
      throw {
        error: err,
        message: err.message,
        statusText: err.code,
      };
    }
  }
}
