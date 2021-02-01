const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = {
  async create(title, salary_range, description, created_at, tags, company, company_logo) {
    try {

      const {rows} = await db.query(sql`
      INSERT INTO jobs (id, title, salary_range, description, created_at, tags, company, company_logo)
        VALUES (${uuidv4()}, ${title}, ${salary_range}, ${description}, ${created_at}, ${tags}, ${company}, ${company_logo})
        RETURNING id, title;
      `);

      const [job] = rows;
      return job;
    } catch (error) {
      if (error.constraint === 'jobs_title_key') {
        return null;
      }

      throw error;
    }
  },
};