const Joi = require('joi');

exports.productSchema = Joi.object({
    name:       Joi.string().required(),
    imageUrl:   Joi.string().uri().required(),
    price:      Joi.number().required(),
    category:   Joi.string().valid('Flowers','Compositions','Gifts').required(),
    description:Joi.string().optional(),
});

exports.regestrationSchema = Joi.object({
    email:    Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName:  Joi.string().required(),
    phone:     Joi.string().required(),
});
exports.loginSchema = Joi.object({
    email:    Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

exports.orderSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    address: Joi.string().required(),
    paymentType: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            product:  Joi.string().hex().length(24).required(),
            quantity: Joi.number().integer().min(1).required(),
        })
    ).min(1).required(),
});