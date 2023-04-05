const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../validate/passwordCheck');

// Validation
const { userSchema } = require('../validate/vaildate_schema');

//GET logic
const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db('AncientGrannySecret')
    .collection('User')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('AncientGrannySecret')
    .collection('User')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//POST logic
const createUser = async (req, res) => {
  try {
    let user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
			userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
      image: req.body.image
		};
    if (!req.body.userName || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
		// validation via Joi
		user = await userSchema.validateAsync(user);
    const response = await mongodb.getDb().db('AncientGrannySecret').collection('User').insertOne(user);
		if (response.acknowledged) {
			res.status(201).json(response);
		} else {
			res.status(500).json(response.error || 'Some error occurred while creating the user.');
		}
	} catch(err) {
		res.status(500).json(err);
	}
};

//DELETE logic
const deleteUser = async (req, res) => {
	try {
		//validation: test if passed ID is valid
		if(!ObjectId.isValid(req.params.id)){
			res.status(400).json('You must provide a valid User ID.');
		} else {
			//if passed ID is valid, this block deletes matching item from db
			const userId = new ObjectId(req.params.id);
			const result = await mongodb
				.getDb()
				.db('AncientGrannySecret')
				.collection('User')
				.deleteOne({ _id: userId });
        //error handling: ensure a record was successfully deleted
        if (result.deletedCount > 0) {
          res.status(200).send();
        } else {
          res
            .status(500)
            .json(result.error || 'Error: Something went wrong while deleting the User.');
        }
      }
	}
	catch(err) {
		res.status(500).json(err);
	}
};

// PUT Logic for updating user
const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  let user = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio,
    image: req.body.image
  };
  if (!req.body.userName || !req.body.password) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  const password = req.body.password;
  const passwordCheck = passwordUtil.passwordPass(password);
  if (passwordCheck.error) {
    res.status(400).send({ message: passwordCheck.error });
    return;
  };
	// validation via Joi
	user = await userSchema.validateAsync(user);
  const response = await mongodb
    .getDb()
    .db()
    .collection('User')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

module.exports = { 
    getAll,
    getUser,
    createUser,
    deleteUser,
    updateUser
  };