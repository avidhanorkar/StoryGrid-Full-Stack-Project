import mongoose from "mongoose";

const userSchema = mongoose.Schema ({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Reader', 'Writer'],
    },
    phoneNo: {
        type: String,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const User = mongoose.model("User", userSchema);

export default User