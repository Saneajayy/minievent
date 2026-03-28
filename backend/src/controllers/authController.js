const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        
        const existingInfo = await UserModel.findByEmail(email);
        if (existingInfo) return res.status(400).json({ error: 'Email already registered' });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Count users. If this is the first user ever (or whatever logic), maybe we can make them admin automatically.
        // But let's just default to 'user'. We will create an admin manually for testing.
        const insertId = await UserModel.create({ name, email, password: hashedPassword, role: 'user' });
        
        res.status(201).json({ message: 'User registered successfully', userId: insertId });
    } catch(err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
        
        const user = await UserModel.findByEmail(email);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
        
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, name: user.name }, 
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '24h' }
        );
        
        res.status(200).json({ token, role: user.role, name: user.name, id: user.id });
    } catch(err) {
        next(err);
    }
};
