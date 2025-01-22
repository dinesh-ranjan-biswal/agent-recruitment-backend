import prisma from "../config/prismaclient.config.js"; 

class UserRepository {

  static async createUserDetails(userDetails){
    const createUserDetails=await prisma.user.create({
      data:userDetails
    });
    return createUserDetails;
  }

  static async getUserDetailsByUserEmail(userEmail){
    const getUserDetails=await prisma.user.findFirst({
      where:{
        userEmail
      }
    });
    return getUserDetails;
  }

  static async getAllUsers(page,limit){

    const pageNo=parseInt(page) || 1;
    const limitNo=parseInt(limit) || 10;
    const offset=(pageNo-1)* limitNo;

    // this is for the total count of users details
    const totalCount=await prisma.user.count({});

    // this is the paginated users data
    const getAllUserDetails=await prisma.user.findMany({
        skip:offset,
        take:limitNo,
        orderBy:{
          id:'asc'
        },
        select:{
          id:true,
          userName:true,
          userEmail:true,
          profileInfo:true,
          createdAt:true,
        },
    });
    const totalPages=Math.ceil(totalCount/limitNo);
    if(pageNo>totalPages){
      return null;
    }else{
      const paginationDetails={
        result:getAllUserDetails,
        totalCount,
        totalPages,
        currentPage:pageNo,
        perPage:limitNo
      }
      return paginationDetails;
    }
    
    
  }

  static async getUserDetailsById(userId){
    

    const getUserDetails=await prisma.user.findUniqueOrThrow({
      where:{
        id:parseInt(userId), 
      },
      select:{
        id:true,
          userName:true,
          userEmail:true,
          profileInfo:true,
          createdAt:true,
      }
    });
    return getUserDetails;
  }

  static async updateUserDetails(userId,userDetails){
    const updatedUserDetails=await prisma.user.update({
      where:{
        id:parseInt(userId)
      },
      data:{
        ...userDetails
      }
    });
    return updatedUserDetails;
  }
  
}

export default UserRepository;
