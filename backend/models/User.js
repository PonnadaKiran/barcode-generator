const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    barcode: { type: String },
    points: { type: Number, default: 0 },
    isComplete: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
