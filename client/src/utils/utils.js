export async function fetchBlogs() {
  const resp = await fetch("/blog-all");
  const { blogposts } = await resp.json();
  return blogposts;
}

export async function createBlog({ title, description }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  };

  const resp = await fetch("/blog", options);
  const data = await resp.json();

  console.log(data)

  return data;
}
