import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
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
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        subCity: {
            type: String,
            enum: ['Addis Ketema', 'Akaky Kaliti', 'Arada', 'Bole', 'Gullele', 'Kiros', 'Kolfie Keranio', 'Lideta', 'Nifas Silk-Lafto', 'Yeka', 'Lemi Kura'],
            required: false,
        },
        deliveryLocation: {
            type: String,
            required: false,
        },
        deliveryStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed'],
            default: 'Pending',
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
    isNewUser: {
        type: Boolean,
        default: true,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
