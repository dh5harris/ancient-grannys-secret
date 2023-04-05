const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const {recipeSchema} = require('../validate/vaildate_schema');

test('Recipe Controller: Modules/Packages connect', ()=>{
  //ensure packages are not null
  expect(ObjectId).not.toBeNull;
  expect(recipeSchema).not.toBeNull;
  expect(mongodb).not.toBeNull;

  //ensure packages are not undefined
  expect(ObjectId).not.toBeUndefined;
  expect(recipeSchema).not.toBeUndefined;
  expect(mongodb).not.toBeUndefined;
});

//why this and not the connect.js module?
//the Jest-mongodb package uses a "test" mongoDB server, which never edits our original db.
//calling in a separate mongo client and the code below in the describe function is necessary
//for it to work.
const {MongoClient} = require('mongodb');

describe('MongoDB CRUD for Recipes', () => {
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

  //a test recipe to add to the db. All fields are validated correctly
  const mockRecipe = {
    _id: 'test-recipe-id',
    recipeName: 'Just Chocolate',
    ingredients: [
        'Chocolate'
    ],
    directions: 'Literally just a bar of chocolate.',
    isPrivate: true
}

//a test recipe to update a previously added recipe. All fields will validate correctly
  const updatedMockRecipe = {
    _id: 'test-recipe-id',
    recipeName: 'Just Chocolate',
    ingredients: [
        'Chocolate'
    ],
    directions: 'This recipe was UPDATED by Jest testing',
    isPrivate: true
  }


//test recipe routes
//checks if a test recipe can be created, read, updated, and deleted from the database.
it('should create and get a new recipe from MongoDB', async () => {
    const recipes = db.collection('Recipe');
    
    //insert the mock recipe to the db
    await recipes.insertOne(mockRecipe);
    //find the mock recipe using the test id. If found successfully, test will pass.
    const insertedRecipe = await recipes.findOne({_id:'test-recipe-id'});
    //finally, run the test that will trigger pass/fail with Jest. Pass requires the recipe inserted to match one found in db afterwards
    expect(insertedRecipe).toEqual(mockRecipe);
})

it('should update a recipe in MongoDB', async () => {
  const recipes = db.collection('Recipe');
  //will test the update against this string
  const updateDirections = 'This recipe was UPDATED by Jest testing';

  //the recipe was inserted in previous test
  const initialRecipe = await recipes.findOne({_id:'test-recipe-id'});

  await recipes.replaceOne({_id: initialRecipe._id}, updatedMockRecipe);

  const updatedRecipe = await recipes.findOne({_id:'test-recipe-id'});

  expect(initialRecipe).not.toEqual(updatedRecipe);
  expect(updatedRecipe.directions).toEqual(updateDirections);
});

it('should delete a recipe in MongoDB', async () => {
  const recipes = db.collection('Recipe');
  //recipe ID of the test recipe
  const recipeID = 'test-recipe-id';

  //the recipe was already inserted in previous test
  await recipes.deleteOne({_id: recipeID});

  //the recipe cannot be found and should be null
  const Recipe = await recipes.findOne({_id:'test-recipe-id'});

  expect(Recipe).toBeNull();
});
}); //end testing MongoDB

