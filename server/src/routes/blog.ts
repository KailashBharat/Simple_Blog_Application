import express from "express";
import {
  createBlogPost,
  getBlogPost,
  getAllBlogPosts,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blog";

const router = express.Router();

router
  .route("/blog")
  .post(createBlogPost)
  .get(getBlogPost)
  .patch(updateBlogPost)
  .delete(deleteBlogPost);

router.route("/blog-all").get(getAllBlogPosts);

export default router;
