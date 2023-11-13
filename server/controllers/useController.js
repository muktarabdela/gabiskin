import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as dotenv from 'dotenv';
dotenv.config();

// Handle user registration
const registerUser = async (req, res) => {
    try {
        // Extract user registration data from the request body
        const { name, email, phone, password, deliveryInfo, orders } = req.body;

        // Check if required fields are provided
        if (!email || !phone || !password || !name || !deliveryInfo || !orders) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email
        const emailPattern = /^\S+@\S+\.\S+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email or phone already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Combine user registration data with additional details
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            deliveryInfo,
            orders,
        });

        await newUser.save();

        // You can add additional logic here based on your needs

        const token = jwt.sign({ email, phone }, process.env.JWT_KEY);
        return res.status(201).json({ message: 'User registered successfully', token, newUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Failed to create a new user' });
    }
};

// Handle user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.status(201).json({
            message: 'login success',
            token,
            user: {
                email: user.email,
                password: user.password,
                userId: user._id
            }
        })
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// GetUserInfo
const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { userInfo, deliveryInfo, orders } = req.query;

        let responseData = {};

        if (userInfo) {
            responseData.userInfo = {
                name: user.name,
                email: user.email,
                phone: user.phone,
            };
        }
        if (deliveryInfo) {
            responseData.deliveryInfo = user.deliveryInfo;
        }

        if (orders) {
            responseData.orders = user.orders;
        }
        return res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { registerUser, loginUser, getUserInfo }