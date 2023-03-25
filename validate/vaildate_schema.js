const Joi = require('@hapi/joi');

const mealSchema = Joi.object({
	mealName: Joi.string().alphanum().required()
})

const cuisineSchema = Joi.object({
	cuisineName: Joi.string().alphanum().required()
})

module.exports = {mealSchema, cuisineSchema}