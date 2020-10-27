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
        RETURNING *;
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
  },
  async update(job, jobParameters) {
    try {
      let newTitle = jobParameters.title.trim();
      let newSalaryRange = jobParameters.salaryRange.trim();
      let newDescription = jobParameters.description.trim();
      let newTags = jobParameters.tags;
      let newCompany = jobParameters.company.trim();
      let newLogoURL = jobParameters.logoURL.trim();
      if (newTitle === '') {
        newTitle = job.title;
      }

      if (newSalaryRange.trim() === '') {
        newSalaryRange = job.salaryRange;
      }

      if (newDescription.trim() === '') {
        newDescription = job.description;
      }

      if (newTags.length === 0) {
        newTags = job.tags;
      }

      if (newCompany.trim() === '') {
        newCompany = job.company;
      }

      if (newLogoURL.trim() === '') {
        newLogoURL = job.logoURL;
      }

      const {rows} = await db.query(sql`
        UPDATE jobs SET title = ${newTitle}, salary_range = ${newSalaryRange}, description = ${newDescription}, tags = ${newTags}, company = ${newCompany}, logo_url = ${newLogoURL} WHERE id = ${job.id}
          RETURNING id, title, salary_range, description, create_at, tags, company, logo_url ;
        `);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
};
