const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Validation ?
// const { cuisineSchema } = require('../validate/validate_schema');

const getAll = async (req, res) => {
	try {
		const result = await mongodb
			.getDb()
			.db('AncientGrannySecret')
			.collection('Cuisine')
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

const getCuisine = async (req, res) => {
	try {
		const cuisineId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDb()
			.db('AncientGrannySecret')
			.collection('Cuisine')
			.find({ _id: cuisineId });
		result.toArray().then((lists) => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(lists[0]);
		});
	}
	catch(err) {
		res.status(500).json(err);
	}
};

const createCuisine = async(req, res) => {
	try {
		let cuisineName = {
			cuisineName: req.body.cuisineName
		};
		// validation?
		// cuisineName = await cuisineSchema.validateAsync(cuisineName)
		const response = await mongodb.getDb().db('AncientGrannySecret').collection('Cuisine').insertOne(cuisineName);
		if (response.ackownledged) {
			res.status(201).json(response);
		} else {
			res.status(500).json(response.error || 'An error occured while creating the Cuisine category');
		}
	} catch(err) {
		res.status(500).json(err);
	}
}

//DELETE logic
const deleteCuisine = async (req, res) => {
	try {
		//validation: test if passed ID is valid
		if(!ObjectId.isValid(req.params.id)){
			res.status(400).json('You must provide a valid Cuisine ID.');
		} else {
			//if passed ID is valid, this block deletes matching item from db
			const cuisineId = new ObjectId(req.params.id);
			const result = await mongodb
				.getDb()
				.db('AncientGrannySecret')
				.collection('Cuisine')
				.deleteOne({ _id: cuisineId });
			//error handling: ensure a record was successfully deleted
			if (result.deletedCount > 0) {
				res.status(200).send();
			  } else {
				res
				  .status(500)
				  .json(result.error || 'Error: Something went wrong while deleting the Cuisine.');
			  }
			}
	}
	catch(err) {
		res.status(500).json(err);
	}
};

module.exports = { 
    getAll,
    getCuisine,
		createCuisine,
		deleteCuisine
  };