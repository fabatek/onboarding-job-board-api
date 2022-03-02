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
        const jobCheck = await Job.find(id);
        if (!jobCheck) {
            return response.status(400).json({message: 'Job not found.'});
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

router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!uuidValidate(id)) {
            return response.status(400).json({message: 'Invalid request.'});
        }
        const jobCheck = await Job.find(id);
        if (!jobCheck) {
            return response.status(400).json({message: 'Job not found.'});
        }
        const job = await Job.delete(id);
        if (!job) {
            return response.status(400).json({message: 'Unable to delete job.'});
        }

        return response.status(200).json(job);
    } catch (error) {
        console.error(
            `deleteJob({ id: ${request.params.id} }) >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});

router.get('/all', async (request, response) => {
    try {
        const jobs = await Job.getAllJobs();
        if (!jobs) {
            return response.status(400).json({message: 'Unable to get jobs'});
        }

        return response.status(201).json(jobs);
    } catch (error) {
        console.error(
            `getAllJobs >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});

router.get('/', async (request, response) => {
    const { offset, limit } = request.query;
    try {
        const jobs = await Job.getJobs(offset, limit);
        if (!jobs) {
            return response.status(400).json({message: 'Unable to get jobs'});
        }

        return response.status(201).json(jobs);
    } catch (error) {
        console.error(
            `getJobs >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});

module.exports = router;