//Jest testing mock functions for routes folder

const express = require('express');
const router = express.Router();

//mock user list
const mockUserList = [
    {
      _id: "640be1331293bc944376825c",
      userName: "testUser1",
      firstName: "Stanley",
      lastName: "Jablonski",
      email: "stan@jablonski.com",
      password: "ARW2388@2",
      bio: "Short description of user",
      image: "image link or other data",
      recipes: [
        {
          "id": "63f1be5d8d3384a384ba324b"
        }
      ]
    },
    {
        _id: "640be1331293bc944376825d",
        userName: "testUser2",
        firstName: "Stanley",
        lastName: "Jablonski",
        email: "stan@jablonski.com",
        password: "ARW2388@2",
        bio: "Short description of user",
        image: "image link or other data",
        recipes: [
            {
                "id": "63f1be5d8d3384a384ba324b"
            }
            ]
      }
  ]

//User
//mocks all routes for the User collection.
//does not test Database functions. That is available in controllers.test.js.
router.get('/test/user', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(mockUserList);});
router.get('/test/user/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(200).json(mockUserList[0]);
});
router.post('/test/user/', (req,res)=>{
    const mockUser = mockUserList[0];
    res.setHeader('Content-Type', 'application/json');
	res.status(201).json(mockUser);
});
router.put('/test/user/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(204).send();
});
router.delete('/test/user/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(200).send();
});

const mockRecipeList = [
    {
        recipeName: "Chocolate Milk",
        ingredients: [
          "Chocolate syrup"
        ],
        directions: "Mix chocolate syrup into milk.",
        isPrivate: true
      }
];
//RECIPE COLLECTION
router.get('/test/recipe', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(mockRecipeList);});
router.get('/test/recipe/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(200).json(mockRecipeList[0]);
});
router.post('/test/recipe/', (req,res)=>{
    const mockRecipe = mockRecipeList[0];
    res.setHeader('Content-Type', 'application/json');
	res.status(201).json(mockRecipe);
});
router.put('/test/recipe/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(204).send();
});
router.delete('/test/recipe/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(200).send();
});

const mockmealList = [
    {
        _id: "640be3721293bc944376825e",
        mealName: "Breakfast"
      }
]
//MEALS COLLECTION
router.get('/test/meal', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(mockmealList);});
router.get('/test/meal/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(200).json(mockmealList[0]);
});
router.post('/test/meal/', (req,res)=>{
    const mockmeal = mockmealList[0];
    res.setHeader('Content-Type', 'application/json');
	res.status(201).json(mockmeal);
});
router.put('/test/meal/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(204).send();
});
router.delete('/test/meal/:id', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
	res.status(200).send();
});


const mockCuisineList = [
    {
        _id: "640be3721293bc944376825e",
        cuisineName: "Italian"
      }
]

module.exports = router;