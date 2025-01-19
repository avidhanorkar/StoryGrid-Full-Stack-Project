import mongoose from "mongoose";

const likeSchema = mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Likes = mongoose.model("Likes", likeSchema);

export default Likes;