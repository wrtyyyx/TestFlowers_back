const { Schema, model, Types } = require('mongoose');

const orderItemSchema = new Schema({
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
});

const orderSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    address: { type: String, required: true, trim: true },
    paymentType: { type: String, required: true, enum: ['cash', 'card', 'online'] },
}, { timestamps: true });

module.exports = model('Order', orderSchema);
