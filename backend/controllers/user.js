const User = require("../models/user");

//user signup controller
module.exports.userSignupPost = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose another.",
      });
    }
    
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: registeredUser,
      });
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

//user login controller
module.exports.userLoginPost = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome back!",
    user: req.user,
  });
};

//user logout controller
module.exports.userLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  });
};
