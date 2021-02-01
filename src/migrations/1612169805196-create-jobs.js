const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS jobs (
    id uuid PRIMARY KEY,
    title text UNIQUE,
    salary_range text,
    description text,
    created_at text,
    tags text,
    company text,
    company_logo text
  );
  `);
  
  await client.release(true);

  next();
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE jobs;
  `);

  await client.release(true);

  next();
};
