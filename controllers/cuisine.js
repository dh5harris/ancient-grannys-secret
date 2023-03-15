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

module.exports = { 
    getAll,
    getCuisine,
		createCuisine
  };