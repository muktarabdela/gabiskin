const stickers = require('../models/stickerModel'); // Import your FullSkin model
const { validationResult } = require('express-validator'); // You can add validation if needed

// Route controller for uploading full skin images
const createStickers = async (req, res) => {
    // Log the request body and uploaded files
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    // Use express-validator or custom validation logic to validate the request data here

    // Check if any validation errors occurred
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if no file was uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Please upload one or more files' });
        }

        // Extract the 'type' field from the request body
        const { type } = req.body;

        // Validate the 'type' field
        if (!type || (type !== 'laptop' && type !== 'phone')) {
            return res.status(400).json({ error: 'Invalid or missing "type" field' });
        }

        // Create an array to store new FullSkin documents
        const newFullSkins = [];

        // Iterate through the uploaded files
        for (const file of req.files) {
            const newFullSkin = new FullSkin({
                type: file.type,
                image_name: file.image_name,
                image: file.image,
                category: file.category,
                price: file.price,
            });

            newFullSkins.push(newFullSkin);
        }

        // Save the documents to the database
        await stickers.insertMany(newFullSkins);
        // Respond with a success message and the saved documents
        res.status(201).json(newFullSkins);
    } catch (error) {
        // Handle errors and respond with a server error message
        console.error(error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Route controller for getting laptop full skin images (you can implement a similar one for phone full skin)
const getLaptopFullSkin = async (req, res) => {
    try {
        const laptopFullSkins = await FullSkin.find({ type: 'laptop' });

        // Send the laptop full skin images as a response
        res.json(laptopFullSkins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch laptop full skin images' });
    }
}

module.exports = {
    createStickers,
    getLaptopFullSkin,
};
