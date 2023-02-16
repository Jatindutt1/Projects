const express=require("express");
const { createProduct,getAllProducts,updateProductApi,deleteproduct,viewsingleproduct } = require("../controllers/ProdutController");
const { isAuthenticate ,adminRole } = require("../middleware/authentication");

const router=express.Router();

// router.route("/product").get(getAllProduct)

//create product route
router.route("/createproduct").post(createProduct)
//get all product route
router.route("/Products").get(isAuthenticate,adminRole("admin"), getAllProducts)
//update product route
router.route("/updateProducts/:id").put(isAuthenticate,adminRole("admin"),updateProductApi)
//delete product Api route
router.route("/deleteProducts/:id").delete(isAuthenticate,adminRole("admin"),deleteproduct)
//view single product route
router.route("/viewsingleProducts/:id").get(viewsingleproduct)




module.exports=router