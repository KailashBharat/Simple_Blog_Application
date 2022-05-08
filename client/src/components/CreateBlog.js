import React, { useState } from "react";
import { createBlog } from "../utils/utils";
import "../styles/components.css";

export default function CreateBlog() {
  const [state, setState] = useState({ title: "", description: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const { msg } = await createBlog(state);
    if (msg) alert(msg);
    setState({ title: "", description: "" });
  }

  return (
    <div className="create-blog">
      <h3>Create a blog post</h3>
      <form className="blog-form">
        <input
          id="title"
          placeholder="Title"
          value={state.title}
          onChange={(e) =>
            setState((prevState) => ({ ...prevState, title: e.target.value }))
          }
        />
        <textarea
          id="description"
          placeholder="Description"
          value={state.description}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />
        <button id="submit" type="button" onClick={(e) => handleSubmit(e)}>
          submit
        </button>
      </form>
    </div>
  );
}
