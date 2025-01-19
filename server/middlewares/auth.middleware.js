import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(`Error in auth middleware: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const isWriter = async (req, res, next) => {
    try {
        const id = req.user.id;

        const user = await User.findById(id);

        if (user.role !== "Writer") {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    } catch (error) {
        console.log(`Error in isWriter middleware: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const authMiddleware = {
    auth,
    isWriter
}

export default authMiddleware