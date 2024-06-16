const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../utils/JwtToken");
const registerController = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password, pic } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    // throw new Error("User already exists")
    next("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    // throw new Error("Invalid user data")
    next("Invalid user data");
  }
});

const loginController = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    // throw new Error("Invalid email or password")
    next("Invalid email or password");
  }
});
module.exports = { registerController, loginController };
