const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
  //   console.log(req.user);
  req.params.id = req.user.id;
  const user = await User.findById(req.params.id).populate("tasks");
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  // 1) Create error if user Posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update please use /updateMyPassword route ",
        400
      )
    );
  }
  // 2) Filtered out unwanted field names that are not allowed to be updated
  const filterBody = filterObj(req.body, "name", "email");

  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  // 3) Update user document
  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});
