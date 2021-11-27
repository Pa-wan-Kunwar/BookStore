const Joi = require('joi');


module.exports.schemaValidate = Joi.object({
    id: Joi.string().required(),
    bookName: Joi.string().required().min(2),
    publication: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required().min(0),
    quantity: Joi.number().default(1)

});

module.exports.sellData = Joi.object({
    id : Joi.string().required(),
    quantity: Joi.number().required()
})