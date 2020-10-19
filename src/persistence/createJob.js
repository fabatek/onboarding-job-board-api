const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = {
    async create(title, salary, description, tags, company, logoURL) {
        try {
            const {rows} = await db.query(sql`
      INSERT INTO jobs
        VALUES (${uuidv4()}, ${title}, ${salary}, ${description}, current_date, ${tags}, ${company}, ${logoURL})
        RETURNING id, title;
      `);
            return rows;
        } catch (error) {
            if (error.constraint === 'users_email_key') {
                return null;
            }

            throw error;
        }
    },
    async find(id) {
        const {rows} = await db.query(sql`
    SELECT * FROM jobs WHERE id=${id} LIMIT 1;
    `);
        return rows;
    }
};
