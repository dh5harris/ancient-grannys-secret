const express = require('express');
const router = express.Router();

const cuisineController = require('../controllers/cuisine');

router.get('/', cuisineController.getAll);
router.get('/:id', cuisineController.getCuisine);
router.post('/', cuisineController.createCuisine);

module.exports = router;