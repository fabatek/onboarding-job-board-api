const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');
const session = require('./session');
const createJob = require('./createJob');
// const viewJob = require('./viewJob');
// const updateJob = require('./updateJob');
// const deleteJob = require('./deleteJob');

router.use('/api/health', (request, response) => {
  response.status(400).json();
});
router.use('/api/users', user);
router.use('/api/sessions', session);
router.use('/api/createJob', createJob);
// router.use('/api/updateJob', updateJob);
// router.use('/api/deleteJob', deleteJob);
// router.use('/api/viewJob', viewJob);

module.exports = router;
