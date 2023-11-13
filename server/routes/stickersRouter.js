import express from 'express';
const router = express.Router();

import { getCategoryStickers, updateSticker, postCustomData, uploadMultiple, fetchImages } from '../controllers/stickerController.js'
// upload Custom

router.get('/stickers-withCategory', getCategoryStickers)

router.put('/get-custom', postCustomData);

// create sticker
router.get('/create', fetchImages)

// update sticker
router.put('/update/:sticker_Id', updateSticker);

// upload sticker
router.post('/upload', uploadMultiple)


export default router;
