import { supabase } from "../config/supabaseclient.config.js";
import ApiError from "../utils/apierror.utils.js";
import { Constants } from "../utils/constant.utils.js";

// Middleware for authentication
const authenticateUser = async (req, _, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Ensure the token is present
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(Constants.UNAUTHORIZED,Constants.FAILED_STATUS,"Authorization token is missing or invalid");
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    // Verify the token using Supabase
    const { data: user, error } = await supabase.auth.getUser(token);
    

    if (error || !user) {
      throw new ApiError(Constants.UNAUTHORIZED,Constants.FAILED_STATUS,"Invalid or expired token");
    }

    // Attach user info to the request object for further use
    req.user = user.user;

    next(); // Move to the next middleware or route handler
  } catch (err) {
    throw new ApiError(Constants.HTTPINTERNALSERVERERROR,Constants.FAILED_STATUS,err.message|| "Internal server error");
  }
};

export default authenticateUser;
