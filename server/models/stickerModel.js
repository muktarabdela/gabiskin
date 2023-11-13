import mongoose from 'mongoose';

// Define a schema for your stickers
const stickerSchema = new mongoose.Schema({
    name: String,
    category: {
        type: String,
        default: 'custom', 
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
    },
    price: Number,
    imageUrl: String,
});

// Create a model for the stickers
const Stickers = mongoose.model('Stickers', stickerSchema);

export default Stickers;
