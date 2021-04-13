const sql = require('sql-template-strings');

const db = require('./db');

module.exports = {
    async create(jobInfo) {
        const { title, salary_range, description, tags: arrayTags, company_name, company_logo } = jobInfo;

        try {
            const {rows} = await db.query(sql`
            INSERT INTO jobs (title, salary_range, description, tags, company_name, company_logo)
            VALUES (${title}, ${salary_range}, ${description}, ARRAY[${arrayTags}], ${company_name}, ${company_logo})
            RETURNING *;
            `);
            const [jobInfo] = rows;
            return jobInfo;
        } catch (error) {
            if (error.constraint === 'jobs_title_key') return null;
            throw error;
        }
    },

    async update(jobId, jobInfo) {
        const { title, salary_range, description, tags, company_name, company_logo } = jobInfo;

        try {
            const {rows} = await db.query(sql`
            UPDATE jobs
            SET title = ${title}, salary_range = ${salary_range}, description = ${description}, 
            tags = ${tags}, company_name = ${company_name}, company_logo = ${company_logo}
            WHERE id = ${jobId}
            RETURNING *;
            `);
            const [jobUpdated] = rows;
            return jobUpdated;
        } catch (error) {
            if (error.constraint === 'jobs_title_key') return null;
            throw error;
        }
    }
}