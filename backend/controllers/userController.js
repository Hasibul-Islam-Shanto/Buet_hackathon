let ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/ModelUser");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { confirmMail } = require("../utils/confirmMail");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
exports.createUser = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError("Please fill all the required fields", 400));
  }
  const user = await User.create({
    email,
    password,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: email,
    },
    process.env.EMAIL_SECRET,
    { expiresIn: "6h" }
  );
  console.log(token);
  const confirmUser = {
    email: email,
    token: token,
  };
  await confirmMail(confirmUser);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } else {
    return next(new appError("No user found with this id", 401));
  }
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    totalUser: users.length,
    data: {
      users,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  //these fields are not updatable by user or should use other methods to update
  const invalidkey = ["password", "createdAt", "updatedAt"];
  let flag = false;
  invalidkey.forEach((el) => {
    flag = flag || Object.keys(req.body).includes(el);
  });
  if (flag) {
    return next(new appError("Invalid key for update operation", 400));
  } else {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (user) {
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } else {
      return next(new appError("No user found with this Id", 404));
    }
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } else {
    return next(new appError("No user found with this Id", 404));
  }
});
exports.confirmUser = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const user = jwt.verify(token, process.env.EMAIL_SECRET);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.loginUser = catchAsync(async(req,res,next)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError("Please fill all the required fields", 400));
  }
  const user = await User.findOne({'email':email})
  console.log(user)
});
exports.logoutUser = catchAsync(async (req, res, next) => {
  
  console.log(user);
});