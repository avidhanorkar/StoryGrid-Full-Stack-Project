import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import blogController from "../controllers/blog.controller.js";
import blogMiddleware from "../middlewares/blog.middleware.js";
import likeController from "../controllers/like.controller.js";
import commentController from "../controllers/comment.controller.js";
import commentMiddleware from "../middlewares/comment.middleware.js";
import ratingController from "../controllers/rating.controller.js";

const routes = Router();

// user routes
routes.post("/user/register", authController.register);
routes.post("/user/login", authController.login);
routes.delete("/user/deleteAccount", authMiddleware.auth, authController.deleteAccount);
routes.put("/user/update", authMiddleware.auth, authController.updateProfile);
routes.get("/user/:id", authController.getUser)

// blog routes
// routes.post("/blog/create", authMiddleware.auth, authMiddleware.isWriter, blogController.createBlog);
routes.post("/blog/create", blogController.createBlog)
routes.get("/blog/getAll", blogController.getAllBlogs);
routes.put("/blog/updateBlog/:blogId", authMiddleware.auth, authMiddleware.isWriter, blogMiddleware.isAuthor,blogController.updateBlog);
routes.delete("/blog/deleteBlog/:blogId", authMiddleware.auth, authMiddleware.isWriter, blogMiddleware.isAuthor,blogController.deleteBlog);
routes.get("/blog/readOne/:id", blogController.getById);
routes.get("/blog/getUserBlog/:id", blogController.getUserBlog)

// like routes
routes.post("/blog/toggleLike/:blogId", authMiddleware.auth, likeController.toggleLike);
routes.get("/blog/getLikes/:blogId", likeController.getAllLikes);

// comment Routes
routes.post("/comment/createComment/:id", commentController.createComment);
// routes.delete("/comment/deleteComment/:id", commentController.deleteComment);
routes.get("/comment/getComments/:id", commentController.getAllComment)
// routes.put("/comment/updateComment/:cmntId", authMiddleware.auth, commentMiddleware.hasCommented, commentController.updateComment);

// rate Routes
routes.post("/rating/rateBlog/:blogId", authMiddleware.auth, ratingController.rateBlog);
routes.get("/rating/getAvgRating/:id", ratingController.getAvgRating);



export default routes