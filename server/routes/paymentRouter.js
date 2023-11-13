import express from 'express';
import { initializePayment, verifyPayment } from '../controllers/paymentController.js';
const router = express.Router();


router.post("/", initializePayment)

router.get('/verify-payment/:id', verifyPayment)


export default router