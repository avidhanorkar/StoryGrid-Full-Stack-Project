import Blogs from "../models/blog.model.js";
import User from "../models/user.model.js";
import LikeModel from "../models/like.model.js";

const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body;

    const user = await User.findById(userId);
    const blog = await Blogs.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isLiked = await blog.Like.includes(userId);

    if (isLiked) {
      await blog.Like.pull(userId);
      await blog.save();

      const Like = await LikeModel.findOneAndDelete({
        user: userId,
        blog: id,
      });

      return res.status(200).json({
        message: "You have successfully unliked the blog",
        isLiked: false,
        Like: Like,
      });
    } else {
      await blog.Like.push(userId);
      await blog.save();

      const newLike = await LikeModel.create({
        user: userId,
        blog: id,
      });

      return res.status(200).json({
        message: "You have successfully liked the blog",
        isLiked: true,
        like: newLike,
      });
    }
  } catch (error) {
    console.log(`Error in like controller: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const allLikes = await LikeModel.find({
      blog: id,
    }).populate("blog").populate("user");

    if (!allLikes) {
      return res.status(404).json({ message: "No likes found" });
    }
    return res.status(200).json(allLikes);
  } catch (error) {
    console.log(`Error in like controller: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const likeController = {
  toggleLike,
  getAllLikes,
};

export default likeController;
