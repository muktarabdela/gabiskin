import cloudinary from "../config/clouddinary.config.js";
import Stickers from "../models/stickerModel.js";

const uploadMultiple = async (req, res) => {
    const stickerData = req.body.stickers;
    try {
        const insertedStickers = [];

        for (const Stickers of stickerData) {
            const result = await cloudinary.uploader.upload(Stickers.imagePath);
            const imageUrl = result.url;
            const newSticker = new Stickers({
                name: Stickers.name,
                category: Stickers.category,
                size: Stickers.size,
                price: Stickers.price,
                imageUrl: imageUrl
            });
            // save sticker to database
            const savedStickers = await newSticker.save();
            insertedStickers.push(savedStickers);
        }
        res.status(200).json({ stickers: insertedStickers });

    } catch (error) {
        res.status(500).json({ error: "Error while uploading image" });
    }

}
export default uploadMultiple;

