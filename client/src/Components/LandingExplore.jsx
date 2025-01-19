import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import {Link} from "react-router-dom";

const LandingExplore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://storygrid-full-stack-project-1.onrender.com/api/v1/blog/getAll"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.blogs); // Set data to the blogs array
      } catch (error) {
        console.error("Fetch error: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    

    getData();
  }, []);

  // Check if data is an array before mapping
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensure data is an array before mapping
  if (!Array.isArray(data)) {
    return <div>No data available</div>; // Handle case where data is not an array
  }

  const limitedData = data.slice(0, 3);

  return (
    <div className="LandingExplore h-[60vh] border-b-2 flex flex-col gap-7 items-center justify-center">
      <div className="flex flex-col gap-2 text-center">
        <p className="text-4xl font-bold">Explore Some of the Blogs</p>
        <p>
          Curated Reads for Curious Minds – Explore Blogs That Make a
          Difference.
        </p>
      </div>

      {/* Blog Listings Card */}
      <div className="flex flex-row gap-5">
        {limitedData.map((item) => (
          <Link to={`/readBlog/${item._id}`} key={item._id}>
            <BlogCard
              title={item.title.slice(0, 20) + '...'}
              author={item.author ? item.author.userName : "Unknown"} 
              likes={item.Like.length}
              rating={4.8} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingExplore;
