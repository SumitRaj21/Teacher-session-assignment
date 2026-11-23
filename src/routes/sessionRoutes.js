const express = require('express');

const Joi = require('joi');

const {
    createSession,
    getAvailableSessions,
    bookSession,
    completeSession
} = require('../controllers/sessionController');

const validate = require('../middleware/validate.middleware');

const {
    createSessionSchema,
    getAvailableSessionsSchema,
    bookSessionSchema,
    completeSessionSchema
} = require('../validations/sessionValidations');

const router = express.Router();

// Create a new session
router.post(
    '/',
    validate({ body: createSessionSchema }),
    createSession
);

// Get available sessions
router.get(
    '/available',
    validate({ query: getAvailableSessionsSchema }),
    getAvailableSessions
);

// Book a session
router.post(
    '/:id/book',
    validate({
        params: Joi.object({
            id: Joi.string().hex().length(24).required()
        }),
        body: bookSessionSchema
    }),
    bookSession
);

// Complete a session
router.patch(
    '/:id/complete',
    validate({
        params: Joi.object({
            id: Joi.string().hex().length(24).required()
        })
    }),
    completeSession
);

module.exports = router;
