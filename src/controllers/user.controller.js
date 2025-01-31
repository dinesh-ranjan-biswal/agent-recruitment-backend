import UserService from "../services/user.service.js";
import ApiError from "../utils/apierror.utils.js";
import  {Constants}  from "../utils/constant.utils.js";
import { handelDataNotFound, handelLogin, handelServerDataCreated, handelServerDataGet, handelServerSuccess, handleCustomErrorResponse, handleServerError, handleSuccessCustomResponse } from "../utils/responsehandler/index.utils.js";

class UserController {

  static async createUserDetails(req,res){
      const {fullName,email,password}=req.body;
      if(!fullName || !email || !password){
        throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Please provide all the required fields");
      }
      if(!email.includes("@") || !email.includes(".")){
        throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Please provide a valid email address");
      }else if(typeof fullName !== "string" || fullName==="" || fullName===undefined){
        throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Please provide a valid name");
      }else{
        const createUserDetails=await UserService.createUserDetails({fullName,email,password});
        createUserDetails? handelServerDataCreated(res,createUserDetails): handelDataInvalid(res);
      }
  }

  static async loginUser(req,res){
    const {email,password}=req.body;
    if(!email || !password){
      return handleServerError(res,"Please provide all the required fields",Constants.HTTPBADREQUEST);
    }else if(!email.includes("@") || !email.includes(".")){
      return handleServerError(res,"Please provide a valid email address",Constants.HTTPBADREQUEST);
    }else{
      const loginUserDetails=await UserService.loginUser({email,password});
      loginUserDetails? handelLogin(res,loginUserDetails): handelDataNotFound(res);
    }
  }

  static async getAllUsers(req,res){

      const page=Number(req.query.page || 1);
      const limit=Number(req.query.limit || 10);
      const  getAllUsersData=await UserService.getAllUsers(page,limit);
      getAllUsersData? handelServerDataGet(res,getAllUsersData) : handelDataNotFound(res);
  }

  static async getUserDetailsById(req,res){
    const userId=req.params.userId;
    const getUserDetails=await UserService.getUserDetailsById(userId);
    getUserDetails? handelServerDataGet(res,getUserDetails): handelDataNotFound(res);
  }

  static async updateUserDetails(req,res){
    const userId=req.params.userId;
    const {userName,userEmail,userPassword}=req.body;
    if(!userName || !userEmail || !userPassword){
      throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Please provide all the required fields");
    }
    if(!userEmail.includes("@") || !userEmail.includes(".")){
      throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Please provide a valid email address");
     
    }else if(typeof userName !== "string" || userName==="" || userName===undefined){
      return handleServerError(res,"Please provide a valid username",Constants.HTTPBADREQUEST);
    }else{
      const updatedUserDetails=await UserService.updateUserDetails(userId,{userName,userEmail,userPassword});
      updatedUserDetails? handelServerSuccess(res,updatedUserDetails,Constants.DATA_UPDATE_SUCCESS_MESSAGE): handelDataNotFound(res);
    }
  }

  static async signoutUser(req,res){
    const getLogoutUserStatus=await UserService.signoutUser();
    getLogoutUserStatus?  handleSuccessCustomResponse(res,"User logged out successfully") : handleCustomErrorResponse(res,Constants.HTTPINTERNALSERVERERROR,"Failed to log out user")
}
}

export default UserController;
