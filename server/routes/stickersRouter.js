const express = require('express');
const router = express.Router();
// Define your routes here
const { createStickers } = require('../controllers/stickerController');
router.post('/create-stickers', createStickers);

const { getLaptopFullSkin } = require('../controllers/stickerController');

router.get('/laptop-full-skin', getLaptopFullSkin);



module.exports = router;