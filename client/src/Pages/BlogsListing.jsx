import React, { useState, useEffect } from "react";
import BlogListCard from "../Components/BlogListCard";
import { Link } from "react-router-dom";
const BlogsListing = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch(
          `https://storygrid-full-stack-project-1.onrender.com/api/v1/blog/getAll`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setBlogs(result.blogs);
      } catch (error) {
        console.log("Failed to fetch blogs:", error);
      }
    };

    getBlogs();
  }, []);

  return (
    <div className="m-8">
      <div className="border-b-2 py-2">
        <p className="text-4xl font-[600]">Blogs</p>
      </div>
      <div className="m-5 flex flex-col gap-5 justify-center items-center">
        {blogs.map((item) => (
          <Link to={`/readBlog/${item._id}`} key={item._id}>
            <BlogListCard
              title={item.title}
              author={item.author.userName}
              likes={item.Like.length}
              rating={item.Rating.length}
              blog={item.content}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogsListing;
