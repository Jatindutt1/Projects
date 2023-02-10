const users = require("../modals/usermodal");
const catchAsyncErrors = require("../middleware/catchAsyncError"); //for error
const ErrorHandler = require("../utils/errorhandler");
const { generateToken } = require("../config/jsonToken");

//register api
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  //user exist or not
  const email = req.body.email;
  const existuser = await users.findOne({ email: email });
  if (existuser) {
    return next(new ErrorHandler("user already exist", 404));
  } else {
    const result = await users.create(req.body);

    res.status(201).json({
      success: true,
      result,
    });
  }
});

//all user api
exports.allUser = catchAsyncErrors(async (req, res, next) => {
  const alluser = await users.find();

  res.status(201).json({
    success: true,
    alluser,
  });
});

//login user with existing credintial Api
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user exist or not
  const findUser = await users.findOne({ email });
  if (findUser && (await findUser.ispasswordMatched(password))) {
    res.status(200).json({
      success: true,
      _id: findUser?._id,
      email: findUser?.email,
      password: findUser?.password,
      token: generateToken(findUser?.id),
    });
  } else {
    return next(new ErrorHandler("Invalid credintials", 404));
  }
});

//fetch single user by id
exports.singleUser = catchAsyncErrors(async (req, res, next) => {
  const singleuser = await users.findById(req.params.id);

  if (!singleuser) {
    return next(new ErrorHandler("user not found", 404));
  }
  res.status(200).json({
    success: true,
    singleuser,
  });
});

//delete user Api
exports.deleteUser = catchAsyncErrors(async (req, res) => {
  const deleteuser = await users.findById(req.params.id);
  if (!deleteuser) {
    return next(new ErrorHandler("user not found", 404));
  }
  await deleteuser.delete();
  res.status(200).json({
    success: true,
    message: "user delete sucessfully",
  });
});

//update user api
exports.updateUserApi = catchAsyncErrors(
  async (req, res, next) => {
    //take let because we update (updateProduct) .
    let updateUser = await users.findById(req.params.id);

    if (!updateUser) {
      return next(new ErrorHandler("user not found", 404))
    }
    updateUser = await users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "user update successfully",
      updateUser,
    });
  }
);
