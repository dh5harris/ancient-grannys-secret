const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { mealSchema } = require('../validate/vaildate_schema');

test('Meal Controller: Modules/Packages connect', ()=>{
  //ensure packages are not null
  expect(ObjectId).not.toBeNull;
  expect(mealSchema).not.toBeNull;
  expect(mongodb).not.toBeNull;

  //ensure packages are not undefined
  expect(ObjectId).not.toBeUndefined;
  expect(mealSchema).not.toBeUndefined;
  expect(mongodb).not.toBeUndefined;
});

//why this and not the connect.js module?
//the Jest-mongodb package uses a "test" mongoDB server, which never edits our original db.
//calling in a separate mongo client and the code below in the describe function is necessary
//for it to work.
const {MongoClient} = require('mongodb');

describe('MongoDB CRUD for Meals', () => {
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

  //a test meal to add to the db. All fields are validated correctly
  const mockMeal = {
    _id: 'test-meal-id',
    mealName: 'Breakfast',
}

//a test meal to update a previously added meal. All fields will validate correctly
  const updatedMockMeal = {
    _id: 'test-meal-id',
    mealName: 'This meal was UPDATED by Jest testing',
  }


//test meal routes
//checks if a test meal can be created, read, updated, and deleted from the database.
it('should create and get a new meal from MongoDB', async () => {
    const meals = db.collection('Meal');
    
    //insert the mock meal to the db
    await meals.insertOne(mockMeal);
    //find the mock meal using the test id. If found successfully, test will pass.
    const insertedMeal = await meals.findOne({_id:'test-meal-id'});
    //finally, run the test that will trigger pass/fail with Jest. Pass requires the meal inserted to match one found in db afterwards
    expect(insertedMeal).toEqual(mockMeal);
})

it('should update a meal in MongoDB', async () => {
  const meals = db.collection('Meal');
  //will test the update against this string
  const updateName = 'This meal was UPDATED by Jest testing';

  //the meal was inserted in previous test
  const initialMeal = await meals.findOne({_id:'test-meal-id'});

  await meals.replaceOne({_id: initialMeal._id}, updatedMockMeal);

  const updatedMeal = await meals.findOne({_id:'test-meal-id'});

  expect(initialMeal).not.toEqual(updatedMeal);
  expect(updatedMeal.mealName).toEqual(updateName);
});

it('should delete a meal in MongoDB', async () => {
  const meals = db.collection('Meal');
  //meal ID of the test meal
  const mealID = 'test-meal-id';

  //the meal was already inserted in previous test
  await meals.deleteOne({_id: mealID});

  //the meal cannot be found and should be null
  const Meal = await meals.findOne({_id:'test-meal-id'});

  expect(Meal).toBeNull();
});
}); //end testing MongoDB

