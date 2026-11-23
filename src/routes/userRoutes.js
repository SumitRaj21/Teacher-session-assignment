const express = require('express');
const { createUser, getUserSessions } = require('../controllers/userController');
const validate = require('../middleware/validate.middleware');
const { createUserSchema, getUserSessionsSchema } = require('../validations/userValidations');

const router = express.Router();

// Create a new user
router.post(
    '/',
    validate({ body: createUserSchema }),
    createUser
);

// Get user sessions
router.get(
    '/:id/sessions',
    validate({ params: getUserSessionsSchema }),
    getUserSessions
);

module.exports = router;
