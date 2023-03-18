const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/recipes', require('./recipe'));
router.use('/meals', require('./meal'));
router.use('/cuisine', require('./cuisine'));

module.exports = router;