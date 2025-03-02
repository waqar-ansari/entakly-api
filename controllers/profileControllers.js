const User = require("../models/userModel");

const editProfile = async (req, res) => {
  const { fullname, phonenumber, email, address } = req.body;
  console.log(
    fullname,
    phonenumber,
    email,
    address,
    "all details from frontend"
  );

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
    user.address = {
      street: address?.street ?? user.address.street,
      city: address?.city ?? user.address.city,
      state: address?.state ?? user.address.state,
      zip: address?.zip ?? user.address.zip,
      country: address?.country ?? user.address.country,
    };
    
console.log(user.address,"saved user addressss");

    // Save the updated user
    console.log(user.address, "User Address Before Saving");
    await user.save();
    console.log(await User.findById(userId), "User After Saving");

    return res.status(201).json({
      message: "Profile updated successfully",
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        address: user.address
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
  console.log(user,"useruseruseruser");
  
  
};

module.exports = { editProfile, getProfile };
