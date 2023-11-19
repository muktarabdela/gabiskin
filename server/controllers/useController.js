import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// Handle user registration
const registerUser = async (req, res) => {
    try {
        // Extract user registration data from the request body
        const { name, email, phone, password, confirmPassword, deliveryInfo, orders } = req.body;

        // Check if required fields are provided
        if (!email) {
            return res.status(400).json({ error: 'Email required' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password required' });
        }
        if (!confirmPassword) {
            return res.status(400).json({ error: 'Confirm password required' });
        }
        // if (!phone) {
        //     return res.status(400).json({ error: 'Phone number required' });
        // }
        // if (!name) {
        //     return res.status(400).json({ error: 'Name required' });
        // }

        // Validate email
        const emailPattern = /^\S+@\S+\.\S+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate password
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Password and Confirm password do not match' });
        }

        // Check if the email already exists
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Check if the phone number already exists
        const existingUserPhone = await User.findOne({ phone });
        if (existingUserPhone) {
            return res.status(409).json({ error: 'User with this phone number already exists' });
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
            confirmPassword,
            deliveryInfo,
            orders,
            isNewUser: true,
        });

        console.log('New user ID:', newUser._id);

        await newUser.save();
        const expirationTime = '1d';


        const token = jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY, { expiresIn: expirationTime });

        return res.status(200).json({ message: 'User registered successfully', token, newUser });

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

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        let isNewUser = false;

        const expirationTime = '1d';

        const token = jwt.sign({ email, userId: user._id }, process.env.JWT_KEY, { expiresIn: expirationTime });

        res.status(200).json({
            message: 'login success',
            token,
            user: {
                email: user.email,
                userId: user._id
            }
        });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};


// post payment info
const paymentInfo = async (req, res) => {
    try {
        // Extract payment information from the request body
        const { userId, paymentStatus, paymentMethod, receiptScreenshot } = req.body;
        // Find the user in the database by userId
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Update the user's payment information
        user.paymentStatus = paymentStatus;
        user.paymentMethod = paymentMethod;
        user.receiptScreenshot = receiptScreenshot;

        // Save the updated user information
        await user.save();

        // Send a success response
        res.status(200).json({ success: true, message: 'Payment information updated successfully.' });
    } catch (error) {
        console.error('Error updating payment information:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


// server/controllers/userController.js

const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('userId:', userId);

        const userInfo = await User.findById(userId).populate('orders.stickers');
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (!userInfo) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// updateUserData

// controllers/userController.js


const updateUserData = async (req, res) => {
    const userId = req.params.userId;
    const userData = req.body;

    try {
        // Find the user by ID and update the data
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export { registerUser, loginUser, paymentInfo, getUserInfo, updateUserData }


