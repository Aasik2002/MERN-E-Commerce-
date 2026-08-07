import multer from "multer";

// Configure storage for uploaded files (temporary memory storage)
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;