import UserRepository from "../repositories/user.repository.js";
import ApiError from "../utils/apierror.utils.js";
import { Constants } from "../utils/constant.utils.js";
import PasswordHasher from "../utils/passwordhashing.utils.js";
class UserService {

    static async createUserDetails(userDetails){
        const {data,error}= await UserRepository.savedUserDetailsToSupbase(userDetails);
        if(error){
            throw new ApiError(Constants.HTTPINTERNALSERVERERROR,Constants.FAILED_STATUS,error.message);
        }else{
            const createUserDetails=await UserRepository.createUserDetails({
                fullName:data.user.user_metadata.display_name,
                email:data.user.email,
                userId:data.user.id
            });
            return createUserDetails;
        }
        
    }

    static async loginUser(userDetails){
        const {email,password}=userDetails;
        const getUserDetails=await UserRepository.getUserDetailsByUserEmail(email);
        const {data,error}=await UserRepository.signInWithSupbase(email,password);
        if(data?.user?.id !== getUserDetails.userId){
            throw new ApiError(Constants.HTTPBADREQUEST,Constants.FAILED_STATUS,"Invalid user");
        }else if(error){
            throw new ApiError(Constants.HTTPINTERNALSERVERERROR,Constants.FAILED_STATUS,error.message);
        }else{
            return {token:data.session.access_token,user:getUserDetails};
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
