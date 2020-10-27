const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const db = require('./db');

module.exports = {
  async create(jobParameters) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO jobs
        VALUES (${uuidv4()}, ${jobParameters.title}, ${
        jobParameters.salaryRange
      }, ${jobParameters.description}, current_date, ${jobParameters.tags}, ${
        jobParameters.company
      }, ${jobParameters.logoURL})
        RETURNING id, title, tags;
      `);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  async find(id) {
    const {rows} = await db.query(sql`
    SELECT * FROM jobs WHERE id=${id} LIMIT 1;
    `);
    return rows[0];
  }
};
