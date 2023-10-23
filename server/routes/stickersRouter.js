const express = require('express');
const router = express.Router();

// upload stickers
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage });

// Define your routes here
const { createStickers } = require('../controllers/stickerController');
router.post('/upload-stickers', upload.array('stickers', 10), createStickers);

const { getLaptopFullSkin } = require('../controllers/stickerController');

router.get('/laptop-full-skin', getLaptopFullSkin);

// get phone full skin
const { getphoneFullSkin } = require('../controllers/stickerController');
router.get('/phone-full-skin', getphoneFullSkin);

// get programing stickers
const { getProgramingStickers } = require('../controllers/stickerController');
router.get('/programing-stickers', getProgramingStickers);

// get hot stickers
const { getHotStickers } = require('../controllers/stickerController');
router.get('/hot-stickers', getHotStickers);

// get music stickers
const { getMusicStickers } = require('../controllers/stickerController');
router.get('/music-stickers', getMusicStickers);

// get amharic stickers
const { getAmharicStickers } = require('../controllers/stickerController');
router.get('/amharic-stickers', getAmharicStickers);


module.exports = router;