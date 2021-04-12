'use strict';

const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS jobs (
    id uuid PRIMARY KEY,
    title text NOT NULL,
    salary_range text,
    description text,
    created_at timestamp,
    tags text [],
    company text,
    company_logo_url text
  );
  `);
  
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE jobs;
  `);

  await client.release(true);

  next();
};
