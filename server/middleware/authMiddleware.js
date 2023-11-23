// authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import * as dotenv from 'dotenv';
dotenv.config();

const authenticateUser = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Authorization token not provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;

        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access forbidden. Admin role required.' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default authenticateUser;
