const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');
const session = require('./session');
const jobs = require('./job');

router.use('/api/health', (request, response) => {
  response.status(200).json();
});
router.use('/api/users', user);
router.use('/api/sessions', session);
router.use('/api/jobs', jobs);

module.exports = router;
