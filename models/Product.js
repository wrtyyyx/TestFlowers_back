const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name:       { type: String, required: true },
    imageUrl:   { type: String, required: true },
    price:      { type: Number, required: true },
    category:   { type: String, enum: ['Flowers','Compositions','Gifts'], required: true },
    description:{ type: String },
}, { timestamps: true });

module.exports = model('Product', productSchema)