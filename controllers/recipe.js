const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

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

module.exports = {
    deleteRecipe
}