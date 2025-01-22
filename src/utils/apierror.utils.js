import { Constants } from "./constant.utils.js";

class ApiError extends Error {
  constructor(
    statusCode = 500,
    status = false,
    message = Constants.DEFAULT_ERROR_MESSAGE
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
  }
}

export default ApiError;
