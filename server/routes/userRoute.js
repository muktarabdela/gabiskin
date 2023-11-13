import express from 'express';
const router = express.Router();

// Define your routes here
import { registerUser, loginUser, getUserInfo, } from '../controllers/useController.js';
import authenticateToken from '../middleware/authenticateToken.js';
router.post('/register', registerUser);

router.post('/login', loginUser);

// get user info  

router.get('/get-user-info/:userId', getUserInfo)
// protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
})

// router.post('/collect-delivery-info', collectDeliveryInfo)

export default router;