const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        if (!email || !password || !firstName || !lastName || !phone) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: 'User already exists.' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashed, firstName, lastName, phone });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            access_token: token,
            user: {
                id:        user._id,
                email:     user.email,
                firstName: user.firstName,
                lastName:  user.lastName,
                phone:     user.phone
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            access_token: token,
            user: {
                id:        user._id,
                email:     user.email,
                firstName: user.firstName,
                lastName:  user.lastName,
                phone:     user.phone
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleted = await User.findByIdAndDelete(userId);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'User successfully deleted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
