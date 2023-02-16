const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../modals/usermodal");


exports.isAuthenticate = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("please login", 401))
    };

    const decodeddata = jwt.verify(token, process.env.JWT_SECRETKEY);

    //save all data in req.user with decodeddata.id

    req.user = await User.findById(decodeddata.id);
    next();
})

exports.adminRole = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role:${req.user.role} is not allow to access this`, 403));
        }
        next();
    }
   

}
