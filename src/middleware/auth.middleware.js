import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; //* Import the entire CommonJS module
import {Constants} from '../utils/constant.utils.js';
import logger from '../utils/logger.utils.js';
import { handelUnauthorized, handleServerError } from '../utils/responsehandler/index.utils.js';
dotenv.config();
const { verify } = jwt; //* Destructure the `verify` function from the imported module

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return handelUnauthorized(res);
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      logger.error(err);
      return handleServerError(res, err, Constants.HTTPFORBIDDEN);
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
