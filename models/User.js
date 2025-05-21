const mongoose = require('mongoose');
const { Types } = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    phone:     { type: String, required: true, trim: true },
    orders: [
        {
            type: Types.ObjectId,
            ref: 'Order',
            required: false
        }
    ]
}, {
    timestamps: true
});

module.exports = model('User', userSchema);
