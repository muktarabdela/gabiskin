const mongoose = require('mongoose');

// Schema for phone-full-skin images
const stickersSchema = new mongoose.Schema({
    type: String,
    image_name: String,
    image: String,
    category: String,
    price: Number,
});


// Create models
const stickers = mongoose.model('stickers', stickersSchema);

module.exports = stickers;
