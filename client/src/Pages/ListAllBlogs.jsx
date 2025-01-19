import React, { useState, useEffect } from "react";
import BlogListCard from "../Components/BlogListCard";
import { Link, useParams } from "react-router-dom";
const ListAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true); // Step 2: Set loading to true before fetching
      try {
        const response = await fetch(
          `https://storygrid-full-stack-project-1.onrender.com/api/v1/blog/getUserBlog/${id}`
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]); // Reset blogs to an empty array
      } finally {
        setLoading(false); // Step 2: Set loading to false after fetching
      }
    };

    const getUser = async () => {
      try {
        const response = await fetch(`https://storygrid-full-stack-project-1.onrender.com/api/v1/user/${id}`);
        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    getBlogs();
    getUser();
  }, []);

  return (
    <div className="m-8">
      <div className="border-b-2 py-2">
        <p className="text-3xl font-[600]">All Blogs of <span className="text-4xl">{user.userName}</span> </p>
      </div>
      <div className="m-5 flex flex-col gap-5 justify-center items-center">
        {blogs.map((item) => (
          <Link to={`/readBlog/${item._id}`} key={item._id}>
            <BlogListCard
              title={item.title}
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

export default ListAllBlogs;
