import Blogs from "../models/blog.model.js";

const isAuthor = async (req, res, next) => {
  try {
    const { blogId } = req.params;  // Ensure this is just the 'id' as a string
    const userId = req.user.id;

    // Find the blog by ID (ensure that 'id' is a valid ObjectId)
    const blog = await Blogs.findById(blogId);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the author
    if (blog.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Error in isAuthor middleware in blogs. ", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const blogMiddleware = {
    isAuthor
}
export default blogMiddleware;
