import UserService from "../services/user.service.js";
import ApiError from "../utils/apierror.utils.js";
import  {Constants}  from "../utils/constant.utils.js";
import { handelDataNotFound, handelLogin, handelServerDataCreated, handelServerDataGet, handelServerSuccess, handleServerError } from "../utils/responsehandler/index.utils.js";

class UserController {

  static async createUserDetails(req,res){
      const {userName,userEmail,userPassword}=req.body;
      if(!userName || !userEmail || !userPassword){
        throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Please provide all the required fields");
      }
      if(!userEmail.includes("@") || !userEmail.includes(".")){
        throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Please provide a valid email address");
      }else if(typeof userName !== "string" || userName==="" || userName===undefined){
        throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Please provide a valid username");
      }else{
        const createUserDetails=await UserService.createUserDetails({userName,userEmail,userPassword});
        createUserDetails? handelServerDataCreated(res,createUserDetails): handelDataInvalid(res);
      }
  }

  static async loginUser(req,res){
    const {userEmail,userPassword}=req.body;
    if(!userEmail || !userPassword){
      return handleServerError(res,"Please provide all the required fields",Constants.HTTPBADREQUEST);
    }else if(!userEmail.includes("@") || !userEmail.includes(".")){
      return handleServerError(res,"Please provide a valid email address",Constants.HTTPBADREQUEST);
    }else{
      const loginUserDetails=await UserService.loginUser({userEmail,userPassword}); 
      if(loginUserDetails){
        req.session.user=loginUserDetails;
      }
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
}

export default UserController;
