const {Router} = require('express');
const Job = require('../persistence/jobs');

const router = new Router();

/**
 *  Get all jobs
 *  @return list jobs
 */
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
            `createJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});
/**
 *  Delete job
 *  @param jobId
 *  @return id of job deleted
 */
router.delete('/:id', async (request, response) => {
    try {
        const jobId = request.params.id;
        if (!jobId) {
            return response.status(400).json({message: 'Invalid request.'});
        }

        const job = await Job.delete(jobId);
        if (!job) {
            return response.status(400).json({message: 'Unable to delete job.'});
        }

        return response.status(201).json(job);
    } catch (error) {
        console.error(
            `deleteJob({ id: ${request.params.id} }) >> Error: ${error.stack}`
        );

        response.status(500).json();
    }
});
module.exports = router;
