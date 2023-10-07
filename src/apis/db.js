import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    charset: "utf8",
  },
  pool: { min: 0, max: 10 },
});

await db.schema.hasTable("paris").then(function (exists) {
  if (!exists) {
    return db.schema.createTable("paris", function (t) {
      t.increments("id").primary();
      t.float("air_quality");
      t.dateTime("timestamp");
    });
  }
});

export async function saveAirQuality({ timestamp, air_quality }) {
  await db("paris").insert({ timestamp, air_quality });
}

export async function getDirtiestTimestamp() {
  const { rows } = await db.raw(
    'SELECT MAX("timestamp") FROM paris WHERE air_quality = (select MAX(air_quality) FROM paris)'
  );

  return { timestamp: rows[0].max };
}
