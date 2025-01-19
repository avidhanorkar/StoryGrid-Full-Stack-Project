import Comment from "../models/comment.model.js";

const hasCommented = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { cmntId } = req.params;

    const comment = await Comment.findById(cmntId);
    if (comment.user.toString() !== userId) {
      return res
        .status(401)
        .json({ msg: "you are not the one whose comment is this." });
    }

    next();
  } catch (error) {
    console.log(`Error in comment middleware: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const commentMiddleware = {
    hasCommented
}

export default commentMiddleware;
