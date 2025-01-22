import UserRepository from "../repositories/user.repository.js";
import ApiError from "../utils/apierror.utils.js";
import { Constants } from "../utils/constant.utils.js";
import PasswordHasher from "../utils/passwordhashing.utils.js";
class UserService {

    static async createUserDetails(userDetails){
        const{userPassword,...otherUserDetails}=userDetails;
        const hashedPassword=await PasswordHasher.hashPassword(userPassword);
        const createUserDetails=await UserRepository.createUserDetails({...otherUserDetails,userPassword:hashedPassword});
        return createUserDetails;
    }

    static async loginUser(userDetails){
        const {userEmail,userPassword}=userDetails;
        const getUserDetails=await UserRepository.getUserDetailsByUserEmail(userEmail);
        if(!getUserDetails){
            return null;
        }else{
            const isMatchedPassword=await PasswordHasher.verifyPassword(userPassword,getUserDetails.userPassword);
            if(!isMatchedPassword){
                throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Invalid Password");
            }else{
                const {userPassword,...otherUserDetails}=getUserDetails;
                return otherUserDetails;
            }
        }
    }

    static async getAllUsers(page,limit){
        const getAllDetailsData=await UserRepository.getAllUsers(page,limit);
        return getAllDetailsData;
    }

    static async getUserDetailsById(userId){
        const getUserDetails=await UserRepository.getUserDetailsById(userId);
        return getUserDetails || null;
    }

    static async updateUserDetails(userId,userDetails){
        const getUserDetails=await UserRepository.getUserDetailsById(userId);
        if(!getUserDetails){
            return null;
        }
        const{userPassword,...otherUserDetails}=userDetails;  
        const hashedPassword=await PasswordHasher.hashPassword(userPassword);  
        const updatedUserDetails=await UserRepository.updateUserDetails(userId,{...otherUserDetails,userPassword:hashedPassword});
        return updatedUserDetails;   
    }

}

export default UserService;
