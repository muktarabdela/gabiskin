import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50, // Adjust the max length based on your requirements
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 15,
    },
    password: {
        type: String,
        required: true,
    },
    deliveryInfo: {
        firstName: {
            type: String,
            required: true,
            maxlength: 50, 
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 50,
        },
        phone: {
            type: String,
            required: true,
            maxlength: 15,
        },
        subCity: {
            type: String,
            enum: ['Addis Ketema', 'Akaky Kaliti', 'Arada', 'Bole', 'Gullele', 'Kiros', 'Kolfie Keranio', 'Lideta', 'Nifas Silk-Lafto', 'Yeka', 'Lemi Kura'],
            required: true,
        },
        deliveryLocation: {
            type: String,
            required: true,
            maxlength: 255,
        },
    },
    orders: [
        {
            stickers: [
                {
                    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sticker' },
                    price: Number,
                    size: String,
                    quantity: Number,
                    totalPrice: Number,
                    category: String,
                    imageUrl: String,
                },
            ],
        }
    ],
});

const User = mongoose.model('User', userSchema);

export default User