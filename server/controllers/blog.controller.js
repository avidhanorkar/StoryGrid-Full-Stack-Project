import Blogs from "../models/blog.model.js";
import User from "../models/user.model.js";

const createBlog = async (req, res) => {
  try {
    const id = req.body.id;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please provide both title and content" });
    }

    const newBlog = await Blogs.create({
      title,
      content,
      author: id,
    });

    const blog = await newBlog.populate("author");

    return res.status(200).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating blog" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().populate("author");

    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res.status(200).json({
      message: "Blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    console.log(`Error in retrieving the blogs: ${error}`);
    return res.status(500).json({ message: "Error retrieving blogs" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blog = await Blogs.findById(id).populate("author");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(`Error in updating the blog: ${error}`);
    return res.status(500).json({ message: "Error updating blog" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blogs.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      message: "Blog deleted successfully",
      deletedBlog: blog.title,
    });
  } catch (error) {
    console.log(`Error in deleting the blog: ${error}`);
    return res.status(500).json({ message: "Error deleting blog" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id)
      .populate("author")
      .populate("Comment")
      .populate("Rating");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const getUserBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blogs.find({ author: id });
    
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

const blogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getById,
  getUserBlog
};

export default blogController;
