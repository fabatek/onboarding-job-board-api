const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    email text UNIQUE,
    password text
  );
  CREATE TABLE IF NOT EXISTS jobs (
    id uuid PRIMARY KEY,
    title text,
    salaryRange text,
    description text,
    createAt timestamp DEFAULT CURRENT_TIMESTAMP,
    tags text[],
    company text,
    logoURL text DEFAULT 'https://unsplash.com/photos/g2E2NQ5SWSU'
  );
  CREATE TABLE IF NOT EXISTS sessions (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users (id) ON DELETE CASCADE
  );
  `);

  await client.query(`
  CREATE INDEX users_email on users (email);
  CREATE INDEX sessions_user on sessions (user_id);
  `);

  await client.release(true);

  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE sessions;
  DROP TABLE users;
  `);

  await client.release(true);

  next();
};
