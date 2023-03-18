const express = require('express');
const router = express.Router();

const mealController = require('../controllers/meal')

router.get('/', mealController.getAll);
router.get('/:id', mealController.getMeal);
router.post('/', mealController.createMeal);
router.delete('/:id', mealController.deleteMeal);
router.put('/:id', mealController.updateMeal);

module.exports = router;