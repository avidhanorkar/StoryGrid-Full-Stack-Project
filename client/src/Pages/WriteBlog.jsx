import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://storygrid-full-stack-project-1.onrender.com/api/v1/blog/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blog.title,
          content: blog.content,
          id: user.id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit blog");
      }
      navigate(`/listAllBlogs/${user.id}`);
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div className="h-[80vh] w-full flex justify-center">
      <div className="w-[80%] h-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-3xl font-semibold h-[50px] focus:outline-none"
              id="title"
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Enter blog title"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className="shadow appearance-none h-[400px] resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              name="content"
              value={blog.content}
              onChange={handleChange}
              placeholder="Enter blog content..."
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              className="border-2 text-white bg-black rounded hover:shadow-md font-semibold"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
