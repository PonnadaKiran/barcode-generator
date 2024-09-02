const express = require('express');
const bwipjs = require('bwip-js');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Assuming your model file is saved as User.js


require('dotenv').config(); // Load environment variables
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a new user
app.post('/create-user', async (req, res) => {
    try {
        const { name, email, phoneNumber, address } = req.body;

        const newUser = new User({
            name, email, phoneNumber, address
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Generate barcode and update user
app.post('/generate-barcode/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const text = `${user.name} ${user.email} ${user.phoneNumber} ${user.address}`;

        bwipjs.toBuffer({
            bcid: 'code128', // Barcode type
            text: text,      // Text to encode
            scale: 3,        // 3x scaling factor
            height: 10,      // Bar height, in millimeters
            includetext: true, // Show human-readable text
            textxalign: 'center', // Always good to set this
        }, async (err, png) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Convert barcode to base64 string
            const barcodeBase64 = `data:image/png;base64,${png.toString('base64')}`;

            user.barcode = barcodeBase64;
            user.isComplete = true;
            user.points += 10; // Increment points as needed
            await user.save();

            res.status(200).json(user);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
