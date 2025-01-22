import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {Constants} from '../constant.utils.js';
import logger from '../logger.utils.js';
import ResponseEntity from './responseentity.utils.js';
dotenv.config();

/**
 * Create a response object.
 * @param {Object} data - The data to be included in the response.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} status - The status of the response.
 * @param {string} message - The message to be included in the response.
 * @returns {ResponseEntity} - The response entity object.
 */
const createResponse = (data, statusCode, status, message) => {
  return new ResponseEntity(data, statusCode, status, message);
};

/**
 * Handle server errors.
 * @param {Object} res - The response object.
 * @param {Error} error - The error object.
 * @param {number} [statusCode=500] - The HTTP status code.
 */
const handleServerError = async (
  res,
  error,
  statusCode = Constants.HTTPINTERNALSERVERERROR
) => {
  await logger.error(error);

    const response = createResponse(
        null,
        statusCode,
        Constants.FAILED_STATUS,
        error.message
    );

    res.status(statusCode ||Constants.HTTPINTERNALSERVERERROR).json(response);
};

/**
 * Handle image not found errors.
 * @param {Object} res - The response object.
 */
const handelImageNotFound = (res) => {
    const response = createResponse(
        null,
        Constants.HTTPNOTFOUND,
        Constants.FAILED_STATUS,
        Constants.NO_IMAGE_PROVIDED_MESSAGE
    );
    logger.writeLog(response);
    res.status(Constants.HTTPNOTFOUND).json(response);
};

/**
 * Handle successful data creation.
 * @param {Object} res - The response object.
 * @param {Object} data - The data to be included in the response.
 */
const handelServerDataCreated = (res, data) => {
    const response = createResponse(
        data,
        Constants.HTTPCREATED,
        Constants.SUCCESS_STATUS,
        Constants.DATA_SAVE_MESSAGE
    );
    res.status(Constants.HTTPCREATED).json(response);
};

/**
 * Handle successful data retrieval.
 * @param {Object} res - The response object.
 * @param {Object} data - The data to be included in the response.
 */
const handelServerDataGet = (res, data) => {
    const response = createResponse(
        data,
        Constants.HTTPOK,
        Constants.SUCCESS_STATUS,
        Constants.DATA_FETCH_MESSAGE
    );
    res.status(Constants.HTTPOK).json(response);
};

/**
 * Handle email existence error.
 * @param {Object} res - The response object.
 * @param {Object} data - The data to be included in the response.
 */
const handelExistEmail = (res, data) => {
    const response = createResponse(
        data,
        Constants.HTTPNOCONTENT,
        Constants.FAILED_STATUS,
        Constants.EXITED_EMAIL_MESSAGE
    );
    res.status(Constants.HTTPNOCONTENT).json(response);
};

/**
 * Handle data not found.
 * @param {Object} res - The response object.
 */
const handelDataNotFound = (res) => {
    const response = createResponse(
        null,
        Constants.HTTPNOTFOUND,
        Constants.FAILED_STATUS,
        Constants.DATA_NOT_FOUND_MESSAGE
    );
    res.status(Constants.HTTPNOTFOUND).json(response);
};

/**
 * Handle successful custom response.
 * @param {Object} res - The response object.
 * @param {string} message - The message to be included in the response.
 */
const handelServerSuccess = (res, data, message) => {
    const response = createResponse(
        data,
        Constants.HTTPOK,
        Constants.SUCCESS_STATUS,
        message
    );
    res.status(Constants.HTTPOK).json(response);
};

/**
 * Handle login responses with JWT token.
 * @param {Object} res - The response object.
 * @param {Object} user - The user object.
 */
const handelLogin = (res, user) => {
  //* Here You Can Store The User Data in The Token But This is Not Preferable User Express Session TO Store the data
  const users = {
    userId: user?.id
  };
  const authToken = jwt.sign(users, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d"
  });
    const response = createResponse(
        { authToken, user },
        Constants.HTTPOK,
        Constants.SUCCESS_STATUS,
        Constants.LOGIN_SUCCESS_MESSAGE
    );
    res.status(Constants.HTTPOK).json(response);
};

/**
 * Handle unauthorized access.
 * @param {Object} res - The response object.
 */
const handelUnauthorized = (res) => {
    const response = createResponse(
        null,
        Constants.UNAUTHORIZED,
        Constants.FAILED_STATUS,
        Constants.UNAUTHORIZED_MESSAGE
    );
    res.status(Constants.UNAUTHORIZED).json(response);
};

/**
 * Handle invalid email errors.
 * @param {Object} res - The response object.
 */
const handelInvalidEmail = (res) => {
    const response = createResponse(
        null,
        Constants.HTTPBADREQUEST,
        Constants.FAILED_STATUS,
        Constants.INVALID_EMAIL_ERROR_MESSAGE
    );
    res.status(Constants.HTTPBADREQUEST).json(response);
};

/**
 * Handle unverified email errors.
 * @param {Object} res - The response object.
 */
const handelUnverifyEmail = (res) => {
    const response = createResponse(
        null,
        Constants.HTTPBADREQUEST,
        Constants.FAILED_STATUS,
        Constants.EMAIL_VERIFICATION_FAILED_ERROR_MESSAGE
    );
    res.status(Constants.HTTPBADREQUEST).json(response);
};

/**
 * Handle data deletion.
 * @param {Object} res - The response object.
 */
const handelDataDelete = (res) => {
    const response = createResponse(
        null,
        Constants.HTTPNOCONTENT,
        Constants.SUCCESS_STATUS,
        Constants.DATA_DELETE_MESSAGE
    );
    res.status(Constants.HTTPNOCONTENT).json(response);
};

/**
 * Handle data update.
 * @param {Object} res - The response object.
 */
const handelDataUpdate = (res) => {
    const response = createResponse(
        null,
        Constants.HTTPOK,
        Constants.SUCCESS_STATUS,
        Constants.DATA_UPDATE_SUCCESS_MESSAGE
    );
    res.status(Constants.HTTPOK).json(response);
};

/**
 * Handle unique constraint errors.
 * @param {Object} res - The response object.
 * @param {string} unique - The unique constraint field.
 */
const handelDataUnique = (res, unique) => {
    const response = createResponse(
        null,
        Constants.HTTPINTERNALSERVERERROR,
        Constants.FAILED_STATUS,
        `${unique} must be unique`
    );
    res.status(Constants.HTTPINTERNALSERVERERROR).json(response);
};

/**
 * Handle invalid data errors.
 * @param {Object} res - The response object.
 */
const handelDataInvalid = (res) => {
    const response = createResponse(
        null,
        Constants.HTTPBADREQUEST,
        Constants.FAILED_STATUS,
        Constants.INVALID_DATA_ERROR_MESSAGE
    );
    res.status(Constants.HTTPBADREQUEST).json(response);
};

/**
 * Handle success with a custom message.
 * @param {Object} res - The response object.
 * @param {string} message - The message to be included in the response.
 */
const handleSuccessCustomResponse = (res, message) => {
    const response = createResponse(
        null,
        Constants.HTTPOK,
        Constants.SUCCESS_STATUS,
        message
    );
    res.status(Constants.HTTPOK).json(response);
};

/**
 * Handle custom error responses.
 * @param {Object} res - The response object.
 * @param {number} httpStatusCode - The HTTP status code.
 * @param {string} message - The error message.
 */
const handleCustomErrorResponse =(res, httpStatusCode, message) => {
    const response = new ResponseEntity(null, httpStatusCode, Constants.FAILED_STATUS, message);
    res.status(httpStatusCode).json(response);
};

/**
 * Handle custom error responses.
 * @param {Object} res - The response object.
 */
const handelBadRequest = async (res) => {
    const response = new ResponseEntity(null, Constants.HTTPBADREQUEST, Constants.FAILED_STATUS, Constants.INVALID_DATA_ERROR_MESSAGE);
    res.status(Constants.HTTPBADREQUEST).json(response);
}

/**
 * Handle custom error responses.
 * @param {Object} res - The response object.
 */
const handelTooMayRequest = async (res) => {
    const response = new ResponseEntity(null, Constants.HTTPTOOMANYREQUEST, Constants.FAILED_STATUS, Constants.TOO_MANY_REQUESTS_ERROR_MESSAGE);
    res.status( Constants.HTTPTOOMANYREQUEST).json(response);
}

//* Export all functions
export {
  createResponse,
  handelBadRequest,
  handelDataDelete,
  handelDataInvalid,
  handelDataNotFound,
  handelDataUnique,
  handelDataUpdate,
  handelExistEmail,
  handelImageNotFound,
  handelInvalidEmail,
  handelLogin,
  handelServerDataCreated,
  handelServerDataGet,
  handelServerSuccess,
  handelTooMayRequest,
  handelUnauthorized,
  handelUnverifyEmail,
  handleCustomErrorResponse,
  handleServerError,
  handleSuccessCustomResponse
};
