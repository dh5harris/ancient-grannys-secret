const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Validation ?
// const { mealSchema } = require('../validate/validate_schema');

const getAll = async (req, res) => {
	try {
		const result = await mongodb
			.getDb()
			.db('AncientGrannySecret')
			.collection('Meal')
			.find();
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists);
		});
	}
	catch(err) {
		res.status(500).json(err);
	}
};

const getMeal = async (req, res) => {
	try {
		const mealId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDb()
			.db('AncientGrannySecret')
			.collection('Meal')
			.find({ _id: mealId });
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists[0]);
		});
	} catch(err) {
		res.status(500).json(err);
	}
};

const createMeal = async(req, res) => {
	try {
		let mealName = {
			mealName: req.body.mealName
		};
		// validation?
		// mealName = await mealSchema.validateAsync(mealName)
		const response = await mongodb.getDb().db('AncientGrannySecret').collection('Meal').insertOne(mealName);
		if (response.ackownledged) {
			res.status(201).json(response);
		} else {
			res.status(500).json(response.error || 'An error occured while creating the Meal category');
		}
	} catch(err) {
		res.status(500).json(err);
	}
}

//DELETE logic
const deleteMeal = async (req, res) => {
	try {
		//validation: test if passed ID is valid
		if(!ObjectId.isValid(req.params.id)){
			res.status(400).json('You must provide a valid Meal ID.');
		} else {
			//if passed ID is valid, this block deletes matching item from db
			const mealId = new ObjectId(req.params.id);
			const result = await mongodb
				.getDb()
				.db('AncientGrannySecret')
				.collection('Meal')
				.deleteOne({ _id: mealId });
			//error handling: ensure a record was successfully deleted
			if (result.deletedCount > 0) {
				res.status(200).send();
			  } else {
				res
				  .status(500)
				  .json(result.error || 'Error: Something went wrong while deleting the Meal.');
			  }
			}
	}
	catch(err) {
		res.status(500).json(err);
	}
};

module.exports = { 
    getAll,
    getMeal,
	createMeal,
	deleteMeal
  };