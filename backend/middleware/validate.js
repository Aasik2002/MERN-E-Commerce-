// ============================================================
// Joi Validation Middleware
// ============================================================
import { HTTP_STATUS } from "../constants/index.js";

/**
 * Validate request data against a Joi schema
 * @param {Object} schema - Joi schema object with optional body, params, query keys
 * @returns {Function} Express middleware
 *
 * Usage:
 *   validate({ body: registerSchema })
 *   validate({ params: idSchema, query: paginationSchema })
 */
const validate = (schema) => {
  return (req, res, next) => {
    const errors = [];

    // Validate each part of the request
    for (const [key, joiSchema] of Object.entries(schema)) {
      if (!["body", "params", "query"].includes(key)) continue;

      const { error, value } = joiSchema.validate(req[key], {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: key === "query", // Allow extra query params for filtering
      });

      if (error) {
        error.details.forEach((detail) => {
          errors.push({
            field: detail.path.join("."),
            message: detail.message.replace(/"/g, ""),
            location: key,
          });
        });
      } else {
        // Replace request data with validated/sanitized values
        req[key] = value;
      }
    }

    if (errors.length > 0) {
      return res.status(HTTP_STATUS.UNPROCESSABLE).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    next();
  };
};

export default validate;
