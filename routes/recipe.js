const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipe');
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipe);
router.post('/', recipeController.createRecipe);
router.delete('/:id', recipeController.deleteRecipe);
router.put('/:id', recipeController.updateRecipe);

module.exports = router;