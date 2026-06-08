const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");

// Register
exports.registerUser = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
   
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    console.log("User save to mongodb");
    res.json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error("Register Error Found", error);
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.json({
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      token: generateToken(foundUser._id),
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};