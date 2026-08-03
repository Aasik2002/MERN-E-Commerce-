// ============================================================
// Application Constants
// ============================================================

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER: 500,
  SERVICE_UNAVAILABLE: 503,
};

// User Roles
export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  GUEST: "guest",
};

// Order Statuses
export const ORDER_STATUS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  RETURNED: "Returned",
  REFUNDED: "Refunded",
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
};

// Product Constants
export const PRODUCT = {
  MAX_IMAGES: 5,
  MAX_NAME_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_PRICE: 0,
  MAX_PRICE: 10000000,
  MAX_STOCK: 99999,
};

// Review Constants
export const REVIEW = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  MAX_COMMENT_LENGTH: 1000,
  MAX_TITLE_LENGTH: 100,
};

// Cart Constants
export const CART = {
  MAX_ITEMS: 50,
  MAX_QUANTITY_PER_ITEM: 10,
  EXPIRATION_DAYS: 7,
};

// Coupon Types
export const COUPON_TYPE = {
  PERCENTAGE: "percentage",
  FIXED: "fixed",
};

// Sort Options
export const SORT_OPTIONS = {
  NEWEST: "-createdAt",
  OLDEST: "createdAt",
  PRICE_LOW: "price",
  PRICE_HIGH: "-price",
  RATING_HIGH: "-ratings",
  POPULAR: "-numOfReviews",
  NAME_AZ: "name",
  NAME_ZA: "-name",
};

// Error Messages
export const ERROR_MESSAGES = {
  // Auth
  UNAUTHORIZED: "Please login to access this resource",
  FORBIDDEN: "You do not have permission to perform this action",
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_NOT_FOUND: "User not found",
  USER_EXISTS: "User already exists with this email",
  TOKEN_EXPIRED: "Token has expired. Please login again",
  TOKEN_INVALID: "Invalid token. Please login again",
  EMAIL_NOT_VERIFIED: "Please verify your email first",

  // Product
  PRODUCT_NOT_FOUND: "Product not found",
  OUT_OF_STOCK: "Product is out of stock",

  // Order
  ORDER_NOT_FOUND: "Order not found",
  ORDER_ALREADY_DELIVERED: "Order has already been delivered",
  ORDER_ALREADY_CANCELLED: "Order has already been cancelled",

  // Cart
  CART_EMPTY: "Cart is empty",
  CART_ITEM_NOT_FOUND: "Item not found in cart",

  // General
  RESOURCE_NOT_FOUND: "Resource not found",
  INVALID_ID: "Invalid ID format",
  VALIDATION_ERROR: "Validation error",
  SERVER_ERROR: "Internal server error",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: "User registered successfully",
  USER_LOGGED_IN: "Login successful",
  USER_LOGGED_OUT: "Logged out successfully",
  PASSWORD_UPDATED: "Password updated successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  EMAIL_VERIFIED: "Email verified successfully",
  PASSWORD_RESET_SENT: "Password reset email sent",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",

  PRODUCT_CREATED: "Product created successfully",
  PRODUCT_UPDATED: "Product updated successfully",
  PRODUCT_DELETED: "Product deleted successfully",

  ORDER_CREATED: "Order placed successfully",
  ORDER_UPDATED: "Order updated successfully",
  ORDER_CANCELLED: "Order cancelled successfully",

  REVIEW_CREATED: "Review submitted successfully",
  REVIEW_UPDATED: "Review updated successfully",
  REVIEW_DELETED: "Review deleted successfully",

  CART_UPDATED: "Cart updated successfully",
  CART_CLEARED: "Cart cleared successfully",

  COUPON_APPLIED: "Coupon applied successfully",
  COUPON_CREATED: "Coupon created successfully",
};
