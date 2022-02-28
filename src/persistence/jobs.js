const sql = require('sql-template-strings');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async create(job) {
        const { title, salary_range, description, tags: arrayTags, company_name, company_logo } = job;

        try {
            const { rows } = await db.query(sql `
            INSERT INTO jobs (id, title, salary_range, description, tags, company_name, company_logo)
            VALUES (${uuidv4()} ,${title}, ${salary_range}, ${description}, ARRAY[${arrayTags}], ${company_name}, ${company_logo})
            RETURNING *;
            `);
            const [job] = rows;
            return job;
        } catch (error) {
            if (error.constraint === 'jobs_title_key') return null;
            throw error;
        }
    }
}