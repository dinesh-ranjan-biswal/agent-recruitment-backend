import multer from "multer";
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024;
const fileUpload=multer({
  limits:{fileSize:MAX_FILE_SIZE},
  storage:multer.memoryStorage(),
});
export default fileUpload;