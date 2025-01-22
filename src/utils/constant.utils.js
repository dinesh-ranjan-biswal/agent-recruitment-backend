
export const Constants={

    //api related error messages
    SUCCESS_MESSAGE : 'Api over all success status',
    FAILED_MESSAGE :'Api over all error status',
    UNAUTHORIZED_MESSAGE : 'You are not authorized', 
    DATA_FETCH_MESSAGE : 'Data fetch successfully',
    DATA_SAVE_MESSAGE : 'Data saved successfully',
    DATA_DELETE_MESSAGE : 'Data delete successfully',
    DATA_NOT_FOUND_MESSAGE : 'Data not found',
    DATA_UPDATE_SUCCESS_MESSAGE : 'Data update successfully',
    DATA_ACTIVE_SUCCESS_MESSAGE:'Data successfully actived',
    DATA_INACTIVE_SUCCESS_MESSAGE:'Data successfully deactived',
    DATA_REVOKE_SUCCESS_MESSAGE:'Data successfully revoked',
    DATA_NOT_DELETED_MESSAGE:'Data not deleted',
    INTERNALSERVERERROR_MESSAGE : 'Internal server error',
    LOGIN_SUCCESS_MESSAGE : 'Login success',
    INVALID_CREDENTIALS_MESSAGE : 'Invalid credentials',
    DATA_NOT_UPDATED_MESSAGE : 'Data not updated',
    PACKAGE_SAVED_MESSAGE : 'Package saved successfully',
    IMAGE_ERROR_MESSAGE : 'Error uploading image',
    NO_IMAGE_PROVIDED_MESSAGE : 'No image provided',
    DEFAULT_ERROR_MESSAGE : 'Something wrong',
    INVALID_DATA_ERROR_MESSAGE : 'Please enter valid Data',
    UNPROCESSABLE_CONTENT_ERROR_MESSAGE : "Unprocessable Content",
    ACCESS_DENIED_ERROR_MESSAGE : 'Access denied',
    PASSWORD_MISSMATCHED_ERROR_MESSAGE : 'Password miss match',
    TOO_MANY_REQUESTS_ERROR_MESSAGE:'Too many requests',
    RANDOM_KEY_FETCH_ERROR_MESSAGE:"Can't get randomkey",
    BAD_REQUEST_ERROR_MESSAGE:'Bad request',
    UNKNOWN_ERROR_MESSAGE:'An unknown error occurred',

    //email related error messages

    EMAIL_SEND_MESSAGE : 'Email send successfully',
    EMAIL_VERIFICATION_OR_OTP_FAILED_ERROR_MESSAGE : "The otp or email address is wrong",
    DOMAIN_NOT_FOUND_MESSAGE : 'Domain not found',
    INVALID_MESSAGE_STRUCTURE_MESSAGE : 'Invalid email structure',
    NO_MX_RECORDS_MESSAGE : 'No MX records for the domain',
    SMTP_CONNECTION_TIMEOUT_ERROR_MESSAGE : 'SMTP connection timeout',
    SMTP_CONNECTION_ERROR_MESSAGE :'SMTP connection error',
    EMAIL_VERIFICATION_FAILED_ERROR_MESSAGE : 'Email verification failed',
    INVALID_EMAIL_ERROR_MESSAGE : 'Invalid email address',
    EXITED_EMAIL_MESSAGE : 'Email already exist',
    
    EMAIL_FINISHED_VERIFICATION: 1,
    EMAIL_INVALID_EMAIL_STRUCTURE: 2,
    NO_MX_RECORDS : 3,
    SMTP_CONNECTION_TIMEOUT: 4,
    DOMAIN_NOT_FOUND : 5,
    SMTP_CONNECTION_ERROR : 6,
    EMAIL_REGX : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,

    //http status codes
    HTTPOK : 200,
    HTTPCREATED : 201,
    HTTPNOCONTENT : 204,
    HTTPINTERNALSERVERERROR : 500,
    HTTPBADREQUEST : 400,
    UNAUTHORIZED : 401,
    HTTPFORBIDDEN : 403,
    HTTPNOTFOUND:404,
    HTTPTOOMANYREQUEST:429,

    //status values
    SUCCESS_STATUS : true,
    FAILED_STATUS :false,


}
