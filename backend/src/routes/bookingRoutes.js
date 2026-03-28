const express = require('express');
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post(
    '/',
    [
        body('user_id').isInt().withMessage('Valid user_id is required'),
        body('event_id').isInt().withMessage('Valid event_id is required')
    ],
    bookingController.bookTicket
);

module.exports = router;
