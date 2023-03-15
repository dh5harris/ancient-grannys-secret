const Joi = require('@hapi/joi');

const mealSchema = Joi.object({
	mealName: Joi.string().alphamun().required()
})

const cuisineSchema = Joi.object({
	cuisineName: Joi.string().alphamun().required()
})

module.exports = {mealSchema, cuisineSchema}