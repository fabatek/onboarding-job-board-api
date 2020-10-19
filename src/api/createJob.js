const {Router} = require('express');
const createJob = require('../persistence/createJob');

const router = new Router();

router.post('/', async (request, response) => {
    try {
        const {title, salaryRange, description, tags, company, logoURL} = request.body;
        if (!title || !salaryRange || !description || !tags || !company || !logoURL) {
            return response
                .status(400)
                .json({message: 'All information must be provided!'});
        }

        const job = await createJob.create(title, salaryRange, description, tags, company, logoURL);
        if (!job) {
            return response.status(400).json({message: 'Create job failed!'});
        }

        return response.status(201).json({message: "Create job got the ID: '" + job[0]['id'] + "' and title: '" + job[0]['title'] + "' successful!"});
    } catch (error) {
        console.error(
            `createJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});

module.exports = router;
