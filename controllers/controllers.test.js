//import cuisine.js, meal.js, recipe.js, and user.js controllers from controllers folder
const cuisine = require('./cuisine');
const meal = require('./meal');
const recipe = require('./recipe');
const user = require('./user');

// const mongodb = require('../db/connect');
const {MongoClient} = require('mongodb');

describe('insert', () => {
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
  //will test the update against this string
  const userID = 'test-user-id';

  //the user was already inserted in previous test
  const testUser = await users.findOne({_id:'test-user-id'});

  await users.deleteOne({_id: userID});

  //reformat next line too test for a deleted user
  const User = await users.findOne({_id:'test-user-id'});

  //TODO: Expect clause that deals with the error of "finding" a deleted/non-existent user. This test will run after logic has proved that a user can be added and found.
});
}); //end testing