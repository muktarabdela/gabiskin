import express from 'express';
const router = express.Router();

import { getCategoryStickers, updateSticker, postCustomData, updatePaymentStatus, updateDeliveryStatus, fetchImages } from '../controllers/stickerController.js'
// upload Custom
router.get('/stickers-withCategory', getCategoryStickers)
router.put('/get-custom', postCustomData);

// create sticker
router.get('/create', fetchImages)

// update sticker
router.put('/update/:sticker_Id', updateSticker);

// upload sticker
// router.post('/upload', uploadMultiple)

router.put('/update-payment-status/:userId', updatePaymentStatus)
router.put('/update-delivery-status/:userId', updateDeliveryStatus)
export default router;