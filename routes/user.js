const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
router.get('/', userController.getAll);
router.get('/:id', userController.getUser);

module.exports = router;