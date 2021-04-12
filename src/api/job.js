const {Router} = require('express');
const Job = require('../persistence/jobs');

const router = new Router();

router.post('/', async (request, response) => {
  try {
    const job = await Job.create(request.body);
    if (!job) {
      return response.status(500).json({message: 'Something error when creating job.'});
    }

    return response.status(201).json(job);
  } catch (error) {
    console.error(
      `createJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});

module.exports = router;
