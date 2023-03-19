const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//GET logic
const getAllRecipes = async (req, res) => {
	try {
		const result = await mongodb.getDb().db('AncientGrannySecret').collection('Recipe').find();
		result.toArray().then((lists) => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(lists);
	 });
	}
	catch(err) {
		res.status(500).json(err);
	}
  };
  
const getRecipe = async (req, res) => {
	try {
		const recipeId = new ObjectId(req.params.id);
		const result = await mongodb
	  	.getDb()
	  	.db('AncientGrannySecret')
	  	.collection('Recipe')
	  	.find({ _id: recipeId });
		result.toArray().then((lists) => {
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(lists[0]);
	});
	}
	catch(err) {
		res.status(500).json(err);
	}
};

//POST logic
const createRecipe = async (req, res) => {
	try {
	  const recipe = {
		recipeName: req.body.recipeName,
		//ingredients: ?
		directions: req.body.directions,
		//isPrivate: ? 	
		};
	  if (!req.body.recipeName) {
		res.status(400).send({ message: 'Content can not be empty!' });
		return;
	  }
	  const response = await mongodb.getDb().db('AncientGrannySecret').collection('Recipe').insertOne(recipe);
		  if (response.acknowledged) {
			  res.status(201).json(response);
		  } else {
			  res.status(500).json(response.error || 'Some error occurred while creating the recipe.');
		  }
	} catch(err) {
		res.status(500).json(err);
    }
};

//DELETE logic
const deleteRecipe = async (req, res) => {
	try {
		//validation: test if passed ID is valid
		if(!ObjectId.isValid(req.params.id)){
			res.status(400).json('You must provide a valid Recipe ID.');
		} else {
			//if passed ID is valid, this block deletes matching item from db
			const recipeId = new ObjectId(req.params.id);
			const result = await mongodb
				.getDb()
				.db('AncientGrannySecret')
				.collection('Recipe')
				.deleteOne({ _id: recipeId });
                //error handling: ensure a record was successfully deleted
                if (result.deletedCount > 0) {
                    res.status(200).send();
                } else {
                    res
                    .status(500)
                    .json(result.error || 'Error: Something went wrong while deleting the Recipe.');
                }
            }
	}
	catch(err) {
		res.status(500).json(err);
	}
};

// PUT Logic for updating recipe
const updateRecipe = async (req, res) => {
	const recipeId = new ObjectId(req.params.id);
	// be aware of updateOne if you only want to update specific fields
	const recipe = {
	  recipeName: req.body.recipeName,
	  ingredient01: req.body.ingredient01,
	  ingredient02: req.body.ingredient02,
	  ingredient03: req.body.ingredient03,
	  ingredient04: req.body.ingredient04,
	  ingredient05: req.body.ingredient05,
	  ingredient06: req.body.ingredient06,
	  ingredient07: req.body.ingredient07,
	  ingredient08: req.body.ingredient08,
	  ingredient09: req.body.ingredient09,
	  ingredient10: req.body.ingredient10,
	  instructions: req.body.instructions,
	  privateFlag: req.body.privateFlag,
	};
	const response = await mongodb
	  .getDb()
	  .db()
	  .collection('Recipe')
	  .replaceOne({ _id: recipeId }, recipe);
	console.log(response);
	if (response.modifiedCount > 0) {
	  res.status(204).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while updating the recipe.');
	}
  };

module.exports = {
	getAllRecipes,
	getRecipe,
	createRecipe,
    deleteRecipe,
	updateRecipe
}