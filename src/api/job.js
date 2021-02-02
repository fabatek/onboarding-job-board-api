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


module.exports = router;
