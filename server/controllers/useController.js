const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Handle user registration

const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, address, email, password } = req.body;

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        const user = new User({
            firstname,
            lastname,
            address,
            email,
            password: hashedPassword, // Store the hashed password
        });

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to create a new user" });
        console.error(error);
    }
};

// Handle user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', {
            expiresIn: '1h', // Token expiration time
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = {
    registerUser,
    loginUser,
}