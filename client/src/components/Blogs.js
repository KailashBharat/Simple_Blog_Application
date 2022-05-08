import React from "react";
import { useEffect, useState } from "react";
import { fetchBlogs } from "../utils/utils";
import "../styles/components.css"

export default function Blogs() {
  const [blogs, setBlogs] = useState("");

  useEffect(() => {
    (async function () {
      setBlogs(await fetchBlogs());
    })();
  }, []);

  return (
    <div>
      <table id = "blogs">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            ? blogs.map((blog, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{blog.title}</td>
                  <td>{blog.description}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
