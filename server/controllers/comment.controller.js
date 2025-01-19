import Blogs from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, user } = req.body;
    const blog = await Blogs.findById(id);

    const newComment = await Comment.create({
      comment,
      blog: blog._id,
      user: user
    })
    res.json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getAllComment = async (req, res) => {
  try {
    const { id } = req.params; // blogId from request parameters

    // Find all comments where the `blog` field matches the provided blogId
    const comments = await Comment.find({ blog: id }).populate("user");

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments found for this blog" });
    }

    res.json(comments); // Send the comments as the response
  } catch (error) {
    console.log("Error in getting the Comments: ", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

const commentController = {
  createComment,
  getAllComment
}

export default commentController;