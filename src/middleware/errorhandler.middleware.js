import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} from "@prisma/client/runtime/library.js";
import multer from 'multer';
import ApiError from "../utils/apierror.utils.js";
import { Constants } from "../utils/constant.utils.js";
import logger from "../utils/logger.utils.js";

const errorHandler = async (err, req, res, next) => {
  logger.error(`Enter into the errorHandler and the error is ${err.message}`);
  let responseError;

  // Handling Multer errors (e.g., file size limit exceeded)
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        responseError = {
          data: null,
          statusCode: Constants.HTTPBADREQUEST,
          status: Constants.FAILED_STATUS,
          message: `File size exceeds the limit of ${process.env.MAX_FILE_SIZE} bytes.`,
        };
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        responseError = {
          data: null,
          statusCode: Constants.HTTPBADREQUEST,
          status: Constants.FAILED_STATUS,
          message: 'Unexpected file type.',
        };
        break;
      default:
        responseError = {
          data: null,
          statusCode: Constants.HTTPBADREQUEST,
          status: Constants.FAILED_STATUS,
          message: err.message,
        };
        break;
    }
  }
  // Handling Prisma errors
  else if (err instanceof PrismaClientKnownRequestError || err instanceof PrismaClientValidationError || err instanceof PrismaClientInitializationError) {
    responseError = {
      data: null,
      statusCode: Constants.HTTPBADREQUEST,
      status: Constants.FAILED_STATUS,
      message: err.message,
    };
  }
  // Handling application-specific errors
  else if (err instanceof ApiError) {
    responseError = {
      data: null,
      statusCode: err.statusCode || Constants.HTTPBADREQUEST,
      status: err.status || Constants.FAILED_STATUS,
      message: err.message || Constants.BAD_REQUEST_ERROR_MESSAGE,
    };
  }
  // Handling runtime errors
  else if (err instanceof Error) {
    responseError = {
      data: null,
      statusCode: Constants.HTTPINTERNALSERVERERROR,
      status: Constants.FAILED_STATUS,
      message: err.message || Constants.INTERNALSERVERERROR_MESSAGE,
    };
  }
  // Default case for unhandled errors
  else {
    responseError = {
      data: null,
      statusCode: Constants.HTTPINTERNALSERVERERROR,
      status: Constants.FAILED_STATUS,
      message: err.message || Constants.UNKNOWN_ERROR_MESSAGE,
    };
  }

  // Send the formatted response to the client
  return res.status(responseError.statusCode).json(responseError);
};

export default errorHandler;
