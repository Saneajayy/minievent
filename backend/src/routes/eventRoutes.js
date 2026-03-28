const express = require('express');
const { body } = require('express-validator');
const eventController = require('../controllers/eventController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', eventController.getAllEvents);

router.post(
    '/',
    verifyToken,
    isAdmin,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('date').isISO8601().withMessage('Valid date is required'),
        body('total_capacity').isInt({ min: 1 }).withMessage('Total capacity must be at least 1')
    ],
    eventController.createEvent
);

// Attendance logic is specified under /events/:id/attendance
const attendanceController = require('../controllers/attendanceController');

router.post(
    '/:id/attendance',
    [
        body('booking_code').notEmpty().withMessage('Booking code is required')
    ],
    attendanceController.markAttendance
);

module.exports = router;
