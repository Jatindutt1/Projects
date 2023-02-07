const express=require("express");
const { createProduct,getAllProducts,updateProductApi,deleteproduct,viewsingleproduct } = require("../controllers/ProdutController");

const router=express.Router();

// router.route("/product").get(getAllProduct)

//create product route
router.route("/createproduct").post(createProduct)
//get all product route
router.route("/Products").get(getAllProducts)
//update product route
router.route("/updateProducts/:id").put(updateProductApi)
//delete product Api route
router.route("/deleteProducts/:id").delete(deleteproduct)
//view single product route
router.route("/viewsingleProducts/:id").get(viewsingleproduct)

module.exports=router