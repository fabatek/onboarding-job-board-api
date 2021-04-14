const {Router} = require('express');
const Job = require('../persistence/jobs');
const {validate: uuidValidate } = require('uuid');

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

router.put('/:id', async (request, response) => {
  try {
    const {id} = request.params;
    if (!uuidValidate(id)) {
      return response.status(400).json({message: 'Invalid job id'});
    }

    const job = await Job.find(id);
    if (!job) {
      return response.status(400).json({message: 'Job not found.'});
    }

    const updatedJob = await Job.update(id, request.body);
    if (!updatedJob) {
      return response.status(500).json({message: 'Something error when updating job.'});
    }

    return response.status(200).json(updatedJob);
  } catch (error) {
    console.error(
        `updateJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const {id} = request.params;
    if (!uuidValidate(id)) {
      return response.status(400).json({message: 'Invalid job id'});
    }

    const job = await Job.find(id);
    if (!job) {
      return response.status(400).json({message: 'Job not found.'});
    }

    const deletedJob = await Job.delete(id);
    if (!deletedJob) {
      return response.status(500).json({message: 'Something error when deleting job.'});
    }

    return response.status(200).json();
  } catch (error) {
    console.error(
        `deleteJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});

router.get('/', async (request, response) => {
  try {
    const {limit, offset} = request.query;
    const jobs = await Job.get(limit, offset);
    if (!jobs) {
      return response.status(500).json({message: 'Something error when listing job.'});
    }

    return response.status(201).json(jobs);
  } catch (error) {
    console.error(
        `listJob({ title: ${request.body.title} }) >> Error: ${error.stack}`
    );

    response.status(500).json();
  }
});

module.exports = router;
