//import cuisine.js, meal.js, recipe.js, and user.js controllers from controllers folder
const cuisine = require('./cuisine');
const meal = require('./meal');
const recipe = require('./recipe');
const user = require('./user');

//why this and not the connect.js module?
//the Jest-mongodb package uses a "test" mongoDB server, which never edits our original db.
//calling in a separate mongo client and the code below in the describe function is necessary
//for it to work.
const {MongoClient} = require('mongodb');

describe('MongoDB CRUD', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  //a test user to add to the db. All fields are validated correctly
  const mockUser = {
    _id: 'test-user-id',
    firstName: 'New',
    lastName: 'Guy',
    userName: 'newGuy2',
    email: 'newGuy@test.com',
    password: 'AnewGuy@2',
    bio: 'This user was added by Jest testing',
    image: 'base64 img placeholder',
    recipes: [
        {id: '63f1be5d8d3384a384ba324b'}
    ]
}

//a test user to update a previously added user. All fields will validate correctly
  const updatedMockUser = {
    _id: 'test-user-id',
    firstName: 'New',
    lastName: 'Guy',
    userName: 'newGuy3',
    email: 'newGuy@test.com',
    password: 'AnewGuy@3',
    bio: 'This user was UPDATED by Jest testing',
    image: 'base64 img placeholder',
    recipes: [
        {id: '63f1be5d8d3384a384ba324b'}
    ]
  }

//a test user that will NOT validate correctly, to test validation and error handling
//TODO: error user template

  //TODO: Might be able to add Joi validation checks to the tests
  //TODO: add error checks.



//test USER routes
//checks if a test user can be created, read, updated, and deleted from the database.
it('should create and get a new user from MongoDB', async () => {
    const users = db.collection('User');
    
    //insert the mock user to the db
    await users.insertOne(mockUser);
    //find the mock user using the test id. If found successfully, test will pass.
    const insertedUser = await users.findOne({_id:'test-user-id'});
    //finally, run the test that will trigger pass/fail with Jest. Pass requires the user inserted to match one found in db afterwards
    expect(insertedUser).toEqual(mockUser);
})

it('should update a User in MongoDB', async () => {
  const users = db.collection('User');
  //will test the update against this string
  const updateBio = 'This user was UPDATED by Jest testing';

  //the user was inserted in previous test
  const initialUser = await users.findOne({_id:'test-user-id'});

  await users.replaceOne({_id: initialUser._id}, updatedMockUser);

  const updatedUser = await users.findOne({_id:'test-user-id'});

  expect(initialUser).not.toEqual(updatedUser);
  expect(updatedUser.bio).toEqual(updateBio);
});

it('should delete a User in MongoDB', async () => {
  const users = db.collection('User');
  //user ID of the test user
  const userID = 'test-user-id';

  //the user was already inserted in previous test
  await users.deleteOne({_id: userID});

  //the user cannot be found and should be null
  const User = await users.findOne({_id:'test-user-id'});

  expect(User).toBeNull();
});
}); //end testing MongoDB

