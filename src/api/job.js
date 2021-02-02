const {Router} = require('express');
const Job = require('../persistence/jobs');

const router = new Router();

router.post('/', async (request, response) => {
  try {
    const {title, salary_range, description, created_at, tags, company, company_logo} = request.body;
    if (!title) {
      return response
        .status(400)
        .json({message: 'title must be provided'});
    }

    const job = await Job.create(title, salary_range, description, created_at, tags, company, company_logo);
    if (!job) {
      return response.status(400).json({message: 'Job already exists'});
    }

    return response.status(201).json(job);
  } catch (error) {
    console.error(
      `createJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});

router.put('/update', async (request, response) => {
  try {
    const {id, title, salary_range, description, tags, company, company_logo} = request.body;
    if (!id) {
      return response
        .status(400)
        .json({message: 'id not found'});
    }

    const job = await Job.update(id, title, salary_range, description, tags, company, company_logo);
    if (!job) {
      return response.status(400).json({message: 'Job update fail'});
    }

    return response.status(201).json(job);
  } catch (error) {
    console.error(
      `updateJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});
router.delete('/delete', async (request, response) => {
  try {
    const {id} = request.query;
    if (!id) {
      return response
        .status(400)
        .json({message: 'id not found'});
    }

    const job = await Job.delete(id);
    if (!job) {
      return response.status(400).json({message: 'Job delete fail'});
    }

    return response.status(201).json({message: 'Job deleted'});
  } catch (error) {
    console.error(
      `deleteJob({ id: ${request.query.id} }) >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});
router.get('/', async (request, response) => {
  try {
    const jobs = await Job.getAllJobs();
    if (!jobs) {
      return response.status(400).json({message: 'get all jobs fail'});
    }

    return response.status(201).json(jobs);
  } catch (error) {
    console.error(
      `getAllJobs() >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});

router.get('/pagination', async (request, response) => {
  const {offset, limit} = request.query;
  try {
    const jobs = await Job.getJobsPagination(offset, limit);
    if (!jobs) {
      return response.status(400).json({message: 'get jobs fail'});
    }

    return response.status(201).json(jobs);
  } catch (error) {
    console.error(
      `getJobsPagination() >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});
router.get('/:id', async (request, response) => {
  const {id} = request.params;
  try {
    if (!id) {
      return response
        .status(400)
        .json({message: 'id not found'});
    }

    const job = await Job.getJobDetails(id);
    if (!job) {
      return response.status(400).json({message: 'get job details fail'});
    }

    return response.status(201).json(job);
  } catch (error) {
    console.error(
      `getJobDetails({ id: ${request.params.id} }) >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});

module.exports = router;
