'use strict'
const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title text unique,
    salary_range text,
    description text,
    created_at timestamp,
    tags text[],
    company_name text,
    company_logo text
  );
  ALTER TABLE jobs ALTER COLUMN created_at SET DEFAULT now();
  `);
  await client.release(true);
  next();
}

module.exports.down = async function (next) {
  const client = await db.connect();
  await client.query(`DROP TABLE IF EXISTS jobs;`);
  await client.release(true);
  next();
}
