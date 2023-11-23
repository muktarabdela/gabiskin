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
    const plainTextPassword = '12345678';



    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

    // Create the admin user
    const admin = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        confirmPassword: plainTextPassword,
        role: 'admin',
    });

    // Save the admin user
    await admin.save();
    console.log('Admin user seeded successfully');
};

seedAdmin()
    .then(() => {
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error seeding admin:', error);
        mongoose.connection.close();
    });
