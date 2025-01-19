import mongoose from 'mongoose'

const ratingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating