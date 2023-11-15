import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
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
    confirmPassword: {
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
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },

    paymentMethod: {
        type: String,
        enum: ['Telebirr', 'CBE', 'BOA'], // Add other payment methods as needed
    },

    receiptScreenshot: {
        type: String, // Assuming you store the image URL/path
    },
});

const User = mongoose.model('User', userSchema);

export default User;
