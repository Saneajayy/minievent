const EventModel = require('../models/EventModel');
const { validationResult } = require('express-validator');

exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await EventModel.findAll();
        res.status(200).json(events);
    } catch (err) {
        next(err);
    }
};

exports.createEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const insertId = await EventModel.create(req.body);
        const newEvent = await EventModel.findById(insertId);
        
        res.status(201).json(newEvent);
    } catch (err) {
        next(err);
    }
};
