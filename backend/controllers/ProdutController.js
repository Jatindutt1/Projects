const products = require("../modals/Productmodal");

//Create product Api ---only admin
exports.createProduct = async (req, res, next) => {
  const product = await products.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

//Get all product Api

exports.getAllProducts = async (req, res, next) => {
  const allProducts = await products.find();

  res.status(200).json({
    success: true,
    allProducts,
  });
};

//Update Product Api

exports.updateProductApi = async (req, res, next) => {
  let updateProduct = await products.findById(req.params.id);

  if (!updateProduct) {
    res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  updateProduct = await products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "product update successfully",
    updateProduct,
  });
};

//delete product Api

exports.deleteproduct = async (req, res, next) => {
  const deleteproduct = await products.findById(req.params.id);

  if (!deleteproduct) {
    res.status(500).json({
      success: false,
      message: "product not found",
    });
  }

  await products.remove();
  res.status(200).json({
    success: true,
    message: "product delete successfully",
  });
};

//single view product
exports.viewsingleproduct = async (req, res, next) => {
  const singleproduct = await products.findById(req.params.id);

  if (!singleproduct) {
    res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  res.status(200).json({
    success:true,
    singleproduct
  })
};
