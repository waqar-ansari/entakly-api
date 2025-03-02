const User = require("../models/userModel");
const { checkForAuthentication } = require("../middlewares/authentication");
const { Schema } = require("mongoose");

const saveSignupData = async (req, res) => {
  const { registerEmail, registerPassword } = req.body;
  await User.create({ email:registerEmail, password:registerPassword });
  res.status(201).json({ message: "User created successfully" });
};
const processLoginData = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);

    const user = await User.findOne({ email })
      .select("-createdAt -updatedAt -__v -salt")
      .lean();


    user.token = token;
    if (user) {
      user.id = user._id;
      delete user._id;
    }

    return res.json({
      status: "success",
      message: "Login successful.",
      user,
    });
  } catch (error) {
    return res.send({
      error: "Invalid email or password",
    });
  }
};

module.exports = { saveSignupData, processLoginData };
