import express from 'express';
const router = express.Router();
import User from '../models/userModel.js';

// Define your routes here
import { registerUser, loginUser, paymentInfo, getUserInfo, } from '../controllers/useController.js';
import authenticateToken from '../middleware/authenticateToken.js';
router.post('/register', registerUser);

router.post('/login', loginUser);

// get user info  
router.post('/paymentInfo', paymentInfo)
// protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
})


// user info re

router.get('/get-user-info/:userId', getUserInfo)

// admin route
router.get('/admin', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude the password field
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.post('/collect-delivery-info', collectDeliveryInfo)

export default router;