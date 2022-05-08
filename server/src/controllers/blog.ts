import { Response, Request } from "express";
import Blog from "../models/Blog";

interface UpdateType {
  description: string;
  title: string;
}

export async function createBlogPost(req: Request, res: Response) {
  const { title, description } = req.body;

  if (!title || !description)
    return res
      .status(200)
      .json({ msg: "Please fill in all the required fields" });

  try {
    const blogCreation = await Blog.create({ title, description });

    if (!blogCreation)
      return res.status(200).json({ msg: "Something went wrong" });

    res.status(200).json({ msg: "Succesfully created post" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getBlogPost(req: Request, res: Response) {
  const { id } = req.body;

  if (!id)
    return res
      .status(200)
      .json({ msg: "Please fill in all the required fields" });

  try {
    const blogpost = await Blog.findById(id);

    if (!blogpost) return res.status(200).json({ msg: "Blogpost not found" });

    res.status(200).json({ blogpost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getAllBlogPosts(req: Request, res: Response) {
  try {
    const blogposts = await Blog.find();

    if (!blogposts.length)
      return res.status(200).json({ msg: "Blogposts not found" });

    res.status(200).json({ blogposts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateBlogPost(req: Request, res: Response) {
  const { id, update }: { id: string; update: UpdateType } = req.body;

  if (!id || !update)
    return res
      .status(200)
      .json({ msg: "Please fill in all the required fields" });

  try {
    const blogpost = await Blog.findByIdAndUpdate(id, update);

    if (!blogpost) return res.status(200).json({ msg: "Blogpost not found" });

    res.status(200).json({ blogpost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteBlogPost(req: Request, res: Response) {
  const { id } = req.body;

  if (!id)
    return res
      .status(200)
      .json({ msg: "Please fill in all the required fields" });

  try {
    const blogpost = await Blog.deleteOne({ _id: id });

    if (!blogpost) return res.status(200).json({ msg: "Blogpost not found" });

    res.status(200).json({ blogpost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
