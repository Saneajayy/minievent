const express = require('express');
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
    '/',
    verifyToken,
    [
        body('event_id').isInt().withMessage('Valid event_id is required')
    ],
    bookingController.bookTicket
);

module.exports = router;
