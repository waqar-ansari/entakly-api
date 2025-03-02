const User = require("../models/userModel");

const editProfile = async (req, res) => {
  const { fullname, phonenumber, email, address } = req.body;
  console.log(
    fullname,
    phonenumber,
    email,
    address,
    "fullname, mobilenumber, email, address "
  );
console.log(fullname, phonenumber, email, address ,"details received by the user ");

  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user profile fields

    user.fullname = fullname || user.fullname;
    user.phonenumber = phonenumber || user.phonenumber;
    user.email = email || user.email;

    // Save the updated user
    await user.save();

    return res.status(201).json({
      message: "Profile updated successfully",
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, try again later" });
  }
};

const getProfile = async (req, res) => {

  const user = await User.findById(req.user._id);
  res.send(user)
 
  
  
};

module.exports = { editProfile, getProfile };
