
const Joi = require('joi');
const ApiError = require('../utils/AppError');

/**
 * Validate request data using Joi schemas.
 *
 * Supported request properties:
 * - params
 * - query
 * - body
 *
 * Example:
 * validate({
 *     body: createSessionSchema
 * })
 */

const validate = (schema) => (req, res, next) => {
    try {
        const validSchema = {};

        // Compile only provided validation schemas
        ['params', 'query', 'body'].forEach((key) => {
            if (schema[key]) {
                validSchema[key] = schema[key];
            }
        });

        const object = {};

        // Extract request data
        Object.keys(validSchema).forEach((key) => {
            object[key] = req[key];
        });

        // Validate request data
        const { value, error } = Joi.object(validSchema)
            .prefs({
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: {
                    objects: true
                }
            })
            .validate(object);

        // Handle validation errors
        if (error) {
            const errorMessage = error.details
                .map((detail) => {
                    return detail.message
                        .replace(/["]/g, '');
                })
                .join(', ');

            return next(new ApiError(400, errorMessage));
        }

        // Store sanitized and validated request data
        req.validated = value;

        // Update request properties where supported
        if (value.body !== undefined) {
            req.body = value.body;
        }

        if (value.params !== undefined) {
            req.params = value.params;
        }

        // Use req.validated.query for validated query data.

        return next();

    } catch (error) {
        return next(error);
    }
};

module.exports = validate;
