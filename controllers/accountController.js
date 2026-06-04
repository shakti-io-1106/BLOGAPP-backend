const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.updatePassword = async (req, res) => {
  try {
    let user;
    const { email, username, password, newPassword } = req.body;
    if (email) {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User Does not exist",
        });
      }
    } else if (username) {
      user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          message: "User Does not exist",
        });
      }
    } else {
      return res.status(400).json({
        message: "email or username is required",
      });
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    if (!newPassword) {
      return res.status(400).json({
        message: "New password is required",
      });
    }
    const samePassword = await bcrypt.compare(newPassword, user.password);

    if (samePassword) {
      return res.status(400).json({
        message: "New password must be different",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
      },
    );

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
