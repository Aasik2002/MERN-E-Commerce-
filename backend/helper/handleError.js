// ============================================================
// Backward-compatible wrapper — delegates to AppError
// Existing controllers import HandeleError; this re-exports AppError
// ============================================================
import { AppError } from "../middleware/error.js";

export default AppError;