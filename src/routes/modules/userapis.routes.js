import UserController from "../../controllers/user.controller.js";


export default (router)=>{
    router.post('/users/createuser',UserController.createUserDetails);
    router.post('/users/login',UserController.loginUser);
    router.get('/users/getallusers',UserController.getAllUsers);
    router.get('/users/getuserinfo/:userId',UserController.getUserDetailsById);
    router.put('/users/updateuser/:userId',UserController.updateUserDetails);
}