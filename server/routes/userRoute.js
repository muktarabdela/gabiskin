import express from 'express';
const router = express.Router();
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';

// Define your routes here
import { registerUser, loginUser, paymentInfo, getUserInfo, updateUserData, updateAdminEmail, updateAdminPassword, adminLogin } from '../controllers/useController.js';
import authenticateToken from '../middleware/authenticateToken.js';

router.post('/register', registerUser);

router.post('/login', loginUser);

// get user info  
router.post('/paymentInfo', authenticateToken, paymentInfo)

// Update user data
router.patch('/:userId', updateUserData);

// protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
})

// user info 
router.get('/get-user-info/:userId', authenticateToken, getUserInfo)

// Update admin email
router.patch('/update-admin-email', updateAdminEmail);

// Update admin password
router.patch('/update-admin-password', authenticateToken, updateAdminPassword);

// Admin login route
router.post('/admin/login', adminLogin);


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