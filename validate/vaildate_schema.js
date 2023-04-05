const Joi = require('@hapi/joi');

const mealSchema = Joi.object({
	mealName: Joi.string().alphanum().required()
})

const cuisineSchema = Joi.object({
	cuisineName: Joi.string().alphanum().required()
})

const recipeSchema = Joi.object({
	recipeName: Joi.string().alphanum().required(),
	ingredients: Joi.array().items(
		Joi.string().alphanum().required()
	).required(),
	directions: Joi.string().required(),
	isPrivate: Joi.boolean()
})

const userSchema = Joi.object({
	userName: Joi.string().alphanum().required(),
	password: Joi.string().required(),
	firstName: Joi.string().alphanum().required(),
	lastName: Joi.string().alphanum().required(),
	email: Joi.string().email().lowercase().required()
})

module.exports = {mealSchema, cuisineSchema, recipeSchema, userSchema}