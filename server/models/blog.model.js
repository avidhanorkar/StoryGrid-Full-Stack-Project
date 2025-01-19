import mongoose from "mongoose"

const blogSchema = mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    Like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    Comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    Rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
    }]
})

const Blogs = mongoose.model("Blog", blogSchema);

export default Blogs