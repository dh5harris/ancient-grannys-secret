const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipe');

//Add back in when logic created
// router.get('/', recipeController.getRecipe);
// router.get('/:id', recipeController.getRecipe);

router.delete('/:id', recipeController.deleteRecipe);
router.put('/:id', recipeController.updateRecipe);

module.exports = router;