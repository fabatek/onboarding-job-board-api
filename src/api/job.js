const {Router} = require('express');
const Job = require('../persistence/jobs');

const router = new Router();

/**
 *  Create new job
 *  @param title string, salary_range string, description string,
    tags array of string, company_name string, company_logo string
 *  @return information job
 */
router.post('/', async (request, response) => {
    try {
        const infoJob = request.body;
        //Validate job title
        if (!infoJob.title) {
            return response.status(400).json({message: 'Job title is required.'});
        }

        const job = await Job.create(infoJob);
        if (!job) {
            return response.status(400).json({message: 'Job already exists.'});
        }

        return response.status(201).json(job);
    } catch (error) {
        console.error(
            `createJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});

/**
 *  Update job
 *  @param title string, salary_range string, description string,
 tags array of string, company_name string, company_logo string
 *  @return information job
 */
router.put('/:id', async (request, response) => {
    try {
        const jobId = request.params.id;
        const infoJob = request.body;
        if (!jobId) {
            return response.status(400).json({message: 'Invalid request.'});
        }

        const job = await Job.update(jobId, infoJob);
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
