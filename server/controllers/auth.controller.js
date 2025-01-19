import Profiles from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword, role } = req.body;

    if (!userName || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      userName: userName,
      email: email,
      password: hashedPassword,
      role: role,
    });

    const newProfile = await Profiles.create({
      user: newUser._id,
      img: null,
      bio: null,
    });

    return res.status(200).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(`Error in registerg the new User ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email does not exist || Need to register" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const payload = {
      id: user._id,
      role: user.role,
      user: user.userName,
      email: user.email,
      
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: user,
        token: token,
      });
  } catch (error) {
    console.log(`Error in Logging the User ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findByIdAndDelete(id);
    const profile = await Profiles.findOneAndDelete({ user: id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(`Error in Deleting the User ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { userName, bio, instagram, twitter, linkedin, personalWebsite } =
      req.body;

    const profile = await Profiles.findOne({ user: id });
    const user = await User.findById(id);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    profile.bio = bio || profile.bio;
    profile.instagram = instagram || profile.instagram;
    profile.linkedin = linkedin || profile.linkedin;
    profile.twitter = twitter || profile.twitter;
    profile.personalWebsite = personalWebsite || profile.personalWebsite;
    user.userName = userName || user.userName;

    await profile.save();
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      profile,
      user,
    });
  } catch (error) {
    console.log(`Error in updating the profile: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};


const authController = {
  register,
  login,
  deleteAccount,
  updateProfile,
  getUser
};

export default authController;
