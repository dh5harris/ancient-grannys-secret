const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Validation
const { cuisineSchema } = require('../validate/vaildate_schema');

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
		// validation
		cuisineName = await cuisineSchema.validateAsync(cuisineName)
		const response = await mongodb.getDb().db('AncientGrannySecret').collection('Cuisine').insertOne(cuisineName);
		if (response.ackownledged) {
			res.status(201).json(response);
		} else {
			res.status(500).json(response.error || 'An error occured while creating the Cuisine category');
		}
	} catch(err) {
		if(err.isJoi === true){
			res.status(422).json(err.message);
		} else {
			res.status(500).json(err);
		}
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

// PUT Logic for updating cuisine
const updateCuisine = async (req, res) => {
	const cuisineId = new ObjectId(req.params.id);
	// be aware of updateOne if you only want to update specific fields
	const cuisine = {
		// cusineFrench:req.body.cusineFrench,
		// cuisineAmerican:req.body.cuisineAmerican,
		// cuisineItalian:req.body.cuisineItalian,
		// cuisineMexican:req.body.cuisineMexican,
		cuisineName: req.body.cuisineName
	};
	//validation via Joi
	cuisineName = await cuisineSchema.validateAsync(cuisineName)

	const response = await mongodb
	  .getDb()
	  .db()
	  .collection('Cuisine')
	  .replaceOne({ _id: cuisineId }, cuisine);
	console.log(response);
	if (response.modifiedCount > 0) {
	  res.status(204).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while updating the cuisine.');
	}
  };

module.exports = { 
    getAll,
    getCuisine,
		createCuisine,
		deleteCuisine,
		updateCuisine
  };