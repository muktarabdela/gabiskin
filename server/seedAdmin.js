// Import necessary modules and connect to MongoDB
import mongoose from 'mongoose';
import User from './models/userModel.js'; // Adjust the path accordingly
import bcrypt from 'bcrypt';

// Connect to MongoDB (ensure your MongoDB server is running)
mongoose.connect('mongodb+srv://gabiadmin:sHmguDJClRAev5uj@gabiskin.e248ek4.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create an admin user and save it to the database
const seedAdmin = async () => {
    // Define the plain text password
    const plainTextPassword = '12345678';

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

    // Create the admin user
    const admin = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        confirmPassword: plainTextPassword, // You may want to remove this from the model/schema
        role: 'admin',
    });

    // Save the admin user
    await admin.save();
    console.log('Admin user seeded successfully');
};

// Run the seedAdmin function
seedAdmin()
    .then(() => {
        // Close the MongoDB connection after seeding
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error seeding admin:', error);
        mongoose.connection.close();
    });
