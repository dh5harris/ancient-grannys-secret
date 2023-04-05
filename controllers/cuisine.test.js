const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { cuisineSchema } = require('../validate/vaildate_schema');

test('Cuisine Controller: Modules/Packages connect', ()=>{
  //ensure packages are not null
  expect(ObjectId).not.toBeNull;
  expect(cuisineSchema).not.toBeNull;
  expect(mongodb).not.toBeNull;

  //ensure packages are not undefined
  expect(ObjectId).not.toBeUndefined;
  expect(cuisineSchema).not.toBeUndefined;
  expect(mongodb).not.toBeUndefined;
});

//why this and not the connect.js module?
//the Jest-mongodb package uses a "test" mongoDB server, which never edits our original db.
//calling in a separate mongo client and the code below in the describe function is necessary
//for it to work.
const {MongoClient} = require('mongodb');

describe('MongoDB CRUD for Cuisines', () => {
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

  //a test cuisine to add to the db. All fields are validated correctly
  const mockCuisine = {
    _id: 'test-cuisine-id',
    cuisineName: 'Mexican',
}

//a test cuisine to update a previously added cuisine. All fields will validate correctly
  const updatedMockCuisine = {
    _id: 'test-cuisine-id',
    cuisineName: 'Updated by Jest',
  }


//test cuisine routes
//checks if a test cuisine can be created, read, updated, and deleted from the database.
it('should create and get a new cuisine from MongoDB', async () => {
    const cuisines = db.collection('Cuisine');
    
    //insert the mock cuisine to the db
    await cuisines.insertOne(mockCuisine);
    //find the mock cuisine using the test id. If found successfully, test will pass.
    const insertedCuisine = await cuisines.findOne({_id:'test-cuisine-id'});
    //finally, run the test that will trigger pass/fail with Jest. Pass requires the cuisine inserted to match one found in db afterwards
    expect(insertedCuisine).toEqual(mockCuisine);
})

it('should update a cuisine in MongoDB', async () => {
  const cuisines = db.collection('Cuisine');
  //will test the update against this string
  const updateName = 'Updated by Jest';

  //the cuisine was inserted in previous test
  const initialCuisine = await cuisines.findOne({_id:'test-cuisine-id'});

  await cuisines.replaceOne({_id: initialCuisine._id}, updatedMockCuisine);

  const updatedCuisine = await cuisines.findOne({_id:'test-cuisine-id'});

  expect(initialCuisine).not.toEqual(updatedCuisine);
  expect(updatedCuisine.cuisineName).toEqual(updateName);
});

it('should delete a cuisine in MongoDB', async () => {
  const cuisines = db.collection('Cuisine');
  //cuisine ID of the test cuisine
  const cuisineID = 'test-cuisine-id';

  //the cuisine was already inserted in previous test
  await cuisines.deleteOne({_id: cuisineID});

  //the cuisine cannot be found and should be null
  const Cuisine = await cuisines.findOne({_id:'test-cuisine-id'});

  expect(Cuisine).toBeNull();
});
}); //end testing MongoDB

