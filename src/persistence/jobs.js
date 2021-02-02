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
  async update(id, title, salary_range, description, tags, company, company_logo) {
    try {

      const {rows} = await db.query(sql`
        UPDATE jobs SET title=${title}, salary_range=${salary_range}, description=${description}, tags=${tags}, company=${company}, company_logo=${company_logo}
        WHERE id=${id}
        RETURNING id;
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
  async delete(id) {
    try {

      const {rows} = await db.query(sql`
        DELETE FROM jobs WHERE id=${id}
        RETURNING true
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
  async getAllJobs() {
    try {
      const {rows} = await db.query(sql`
        SELECT * FROM jobs
      `);

      return rows;
    } catch (error) {
      if (error.constraint === 'jobs_title_key') {
        return null;
      }

      throw error;
    }
  },
  async getJobsPagination(offset = 0, limit = 10) {
    try {
      const {rows} = await db.query(sql`
        SELECT * FROM jobs LIMIT ${limit} OFFSET ${offset}
      `);
      
      return rows;
    } catch (error) {
      if (error.constraint === 'jobs_title_key') {
        return null;
      }

      throw error;
    }
  },
};
