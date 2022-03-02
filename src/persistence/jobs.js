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
    },

    async update(jobId, job) {
        const { title, salary_range, description, tags, company_name, company_logo } = job;

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
    },

    async find(id) {
        const {rows} = await db.query(sql`
        SELECT * FROM jobs WHERE id=${id} LIMIT 1;
        `);
        return rows[0];
    },
    
    async delete(jobId) {
        try {
            const {rows} = await db.query(sql`
            DELETE FROM jobs
            WHERE id = ${jobId}
            RETURNING id;
            `);
            const [jobDeleted] = rows;
            return jobDeleted;
        } catch (error) {
            if (error.constraint === 'jobs_title_key') return null;
            throw error;
        }
    }
}