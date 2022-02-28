const { Router } = require('express');
const Job = require('../persistence/jobs');
const {validate: uuidValidate } = require('uuid');
const router = new Router();

router.post('/', async(request, response) => {
    try {
        const infoJob = request.body;

        if (!infoJob.title) {
            return response.status(400).json({ message: 'Job title is required.' });
        }

        const job = await Job.create(infoJob);
        if (!job) {
            return response.status(400).json({ message: 'Job already exists.' });
        }

        return response.status(201).json(job);
    } catch (error) {
        console.error(
            `createJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});

router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!uuidValidate(id)) {
            return response.status(400).json({message: 'Invalid request.'});
        }
        const job = await Job.update(id, request.body);
        if (!job) {
            return response.status(400).json({message: 'Unable to update job.'});
        }

        return response.status(201).json(job);
    } catch (error) {
        console.error(
            `updateJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});

module.exports = router;