const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const db = require('./db');

module.exports = {
  async create(params) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO jobs (id, title, salary_range, description, created_at, tags, company, company_logo_url)
        VALUES (${uuidv4()}, ${params.title}, ${params.salary_range}, ${params.description}, current_timestamp,
        ${params.tags}, ${params.company}, ${params.company_logo_url})
        RETURNING *;
      `);

      const [job] = rows;
      return job;
    } catch (error) {
      throw error;
    }
  },
  async update(id, params) {
    try {
      const {rows} = await db.query(sql`
        UPDATE jobs SET title=${params.title}, salary_range=${params.salary_range}, description=${params.description},
        tags=${params.tags}, company=${params.company}, company_logo_url=${params.company_logo_url}
        WHERE id=${id}
        RETURNING *;
      `);

      const [job] = rows;
      return job;
    } catch (error) {
      throw error;
    }
  },
  async delete(id) {
    try {
      const {rows} = await db.query(sql`
        DELETE FROM jobs WHERE id=${id}
        RETURNING true
    `);

      const [job] = rows;
      return job;
    } catch (error) {
      throw error;
    }
  },
  async get(limit, offset) {
    const {rows} = await db.query(sql`
        SELECT * FROM jobs LIMIT ${limit || 10} OFFSET ${offset || 0}
    `);
    
    return rows;
  },
  async find(id) {
    const {rows} = await db.query(sql`
    SELECT * FROM jobs WHERE id=${id} LIMIT 1;
    `);
    return rows[0];
  }
};
