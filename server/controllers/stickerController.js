import Stickers from "../models/stickerModel.js";
import Cloudinary from '../config/clouddinary.config.js';
import { uploadToCloudinary } from '../config/clouddinary.config.js';
import mongoose from 'mongoose';
import User from "../models/userModel.js";

// Get all stickers

const getCategoryStickers = async (req, res) => {
    const { category } = req.query;
    let query = {};

    if (category) {
        query.category = category;
    }
    try {
        const stickers = await Stickers.find(query).exec();
        return res.status(200).json({ stickers });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const fetchImages = async (req, res) => {
    let allImages = [];
    let nextCursor = null;
    try {
        do {
            const options = {
                type: 'upload',
                prefix: 'mouckup/Qoute/',
                max_results: 500,
                next_cursor: nextCursor,
            };
            const result = await Cloudinary.api.resources(options);
            allImages = allImages.concat(result.resources);
            nextCursor = result.next_cursor;
        } while (nextCursor);

        const insertedImages = [];
        for (const image of allImages) {
            const newSticker = new Stickers({
                name: "mouckup",
                category: "Qoute",
                imageUrl: image.secure_url,
            });
            const savedImage = await newSticker.save();
            insertedImages.push(savedImage);
        }

        res.json({ images: insertedImages });
    } catch (error) {
        console.error("Error during database save:", error);
        res.status(500).json({ error: "An error occurred during database save." });
    }
};

// const uploadMultiple = async (req, res) => {
//     const stickerData = req.body.stickers;
//     try {
//         const insertedStickers = [];
//         for (const sticker of stickerData) {
//             // Upload the image to Cloudinary and get the secure URL
//             const imageUrl = await uploadToCloudinary(sticker.imagPath, "half/");

//             const newSticker = new Stickers({
//                 name: "mini-stickers",
//                 category: "New_stickers",
//                 size: sticker.size,
//                 price: sticker.price,
//                 imageUrl: imageUrl,
//             });

//             // Save the sticker to the database
//             const savedSticker = await newSticker.save();
//             insertedStickers.push(savedSticker);
//         }
//         res.status(200).json({ stickers: insertedStickers });
//     } catch (error) {
//         console.error("Error during database save:", error);
//         res.status(500).json({ error: "An error occurred during database save." });
//     }
// };

// update sticker
const updateSticker = async (req, res) => {
    const { sticker_Id } = req.params;
    const { size, price } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(sticker_Id)) {
            return res.status(400).json({ message: 'Invalid sticker id' });
        }

        // Update sticker size and price
        await Stickers.updateOne(
            { _id: new mongoose.Types.ObjectId(sticker_Id) },
            { $set: { size, price } }
        );

        // Check inserted size and price
        if (!size || !price) {
            return res.status(400).json({ message: 'Please enter size and price' });
        }

        // Fetch the updated sticker data
        const updatedStickerData = await Stickers.findById(sticker_Id);

        if (!updatedStickerData) {
            return res.status(400).json({ message: 'Sticker not found' });
        }
        return res.status(200).json({
            message: 'Sticker updated successfully',
            sticker: updatedStickerData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const postCustomData = async (req, res) => {
    try {
        const { imageUrl, price, size } = req.body;

        const newSticker = new Stickers({
            imageUrl: imageUrl,
            price,
            size
        });

        // Save the new sticker to the database
        await newSticker.save();

        res.status(201).json({ message: 'Custom sticker created successfully!', newSticker });
    } catch (error) {
        console.error('Error creating custom sticker:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePaymentStatus = async (req, res) => {
    const { userId } = req.params;
    const { newPaymentStatus } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                paymentStatus: newPaymentStatus,
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Payment and delivery status updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating payment and delivery status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const updateDeliveryStatus = async (req, res) => {
    const { userId } = req.params;
    const { newDeliveryStatus } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                deliveryStatus: newDeliveryStatus,
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Payment and delivery status updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating payment and delivery status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    getCategoryStickers,
    updateSticker,
    fetchImages,
    postCustomData,
    updatePaymentStatus,
    updateDeliveryStatus,
}