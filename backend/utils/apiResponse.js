// ============================================================
// Standardized API Response Helpers
// ============================================================
import { HTTP_STATUS } from "../constants/index.js";

/**
 * Send a standardized success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {Object} data - Response data
 * @param {Object} meta - Pagination/extra metadata
 */
export const sendSuccess = (res, statusCode = HTTP_STATUS.OK, message = "Success", data = null, meta = null) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a standardized error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Array} errors - Validation errors array
 */
export const sendError = (res, statusCode = HTTP_STATUS.INTERNAL_SERVER, message = "Something went wrong", errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors !== null) {
    response.errors = errors;
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = new Error().stack;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a paginated response
 * @param {Object} res - Express response object
 * @param {Array} data - Array of items
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items count
 * @param {string} message - Success message
 */
export const sendPaginated = (res, data, page, limit, total, message = "Success") => {
  const totalPages = Math.ceil(total / limit);

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message,
    data,
    meta: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
};
