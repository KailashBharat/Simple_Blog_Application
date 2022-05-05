import mongoose from "mongoose";

export interface BlogType {
  title: string;
  description: string;
  [key: string]: string;
}

const BlogSchema = new mongoose.Schema<BlogType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blogs", BlogSchema);
export default Blog;
