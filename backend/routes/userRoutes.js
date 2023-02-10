const express=require("express");
const { createUser,allUser,userLogin,singleUser,deleteUser ,updateUserApi} = require("../controllers/userController");

const router=express.Router();



//user resgister route
router.route("/register").post(createUser)
//all user route
router.route("/allusers").get(allUser)
//user login routes
router.route("/login").post(userLogin)
//fetch single user routes
router.route("/singleuser/:id").get(singleUser)
//delete user route
router.route("/delete/:id").delete(deleteUser)
//update user route
router.route("/update/:id").put(updateUserApi)



module.exports=router