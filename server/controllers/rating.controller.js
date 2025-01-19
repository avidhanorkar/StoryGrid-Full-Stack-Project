import Blogs from "../models/blog.model.js";
import Ratings from "../models/rating.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const rateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    const blog = await Blogs.findById(id);
    const user = await User.findById(userId);

    if (!blog || !user) {
      return res.status(404).json({ message: "Blog or user not found" });
    }

    const newRating = await Ratings.create({
      user: userId,
      blog: id,
      rating: rating,
    });

    blog.Rating.push(newRating._id);
    await blog.save();

    return res.status(200).json({
      message: "Blog rated successfully",
      rating: newRating,
    });
  } catch (error) {
    console.log(`Error in rating controller: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAvgRating = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the input
    if (!id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    // Convert id to ObjectId
    const objectIdid = new mongoose.Types.ObjectId(id);

    // Aggregate query to calculate the average rating
    const result = await Ratings.aggregate([
      { $match: { blog: objectIdid } }, // Match the blog by ID
      {
        $group: {
          _id: "$blog",
          averageRating: { $avg: "$rating" }, // Calculate the average rating
          totalRatings: { $sum: 1 }, // Count the number of ratings
        },
      },
    ]);

    // If no ratings found, return averageRating as 0
    if (result.length === 0) {
      return res.status(200).json({
        id,
        averageRating: 0,
        totalRatings: 0,
      });
    }

    // Extract results
    const { averageRating, totalRatings } = result[0];

    // Respond with the average rating
    return res.status(200).json({
      id,
      averageRating: averageRating.toFixed(2),
      totalRatings,
    });
  } catch (error) {
    console.error("Error fetching average rating:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const ratingController = {
  rateBlog,
  getAvgRating,
};

export default ratingController;
