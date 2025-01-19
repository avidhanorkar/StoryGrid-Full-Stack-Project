import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    img: {
        type: String
    },
    bio: {
        type: String
    },
    // Social Links
    instagram: {
        type: String
    },
    twitter: {
        type: String
    },
    linkedIn: {
        type: String
    },
    personalWebsite: {
        type: String
    }
})

const Profiles = mongoose.model("Profiles", profileSchema);
export default Profiles