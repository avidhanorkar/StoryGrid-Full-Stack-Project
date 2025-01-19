import React, { useContext, useState, useEffect } from "react";
import ProfileInformation from "../Components/ProfileInformation";
import { AuthContext } from "../Context/authContext";
import { useParams } from "react-router-dom";
import BlogCard from "../Components/BlogCard";
import { Link } from "react-router-dom";
import Button from "../Components/Button";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const userName = user?.user;
  const email = user?.email;
  const role = user?.role;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // Step 1: Add loading state

  useEffect(() => {
    if (role === "Writer") {
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

      getBlogs();
    }
  }, [id, role]);

  const limitedData = blogs.slice(0, 2);

  return (
    <>
      <div className="h-[80vh] flex items-center gap-10 justify-center mt-2">
        <div className="h-full flex justify-center flex-col items-center w-[30%]">
          <div className="w-[300px] h-[300px] bg-black rounded-full"></div>
          <p className="text-black text-center text-[25px] font-semibold mt-[20px]">
            {userName}
          </p>
        </div>
        <div className="w-[70%] rounded-xl h-full flex justify-start flex-col pt-10 px-[120px] gap-10">
          <ProfileInformation
            userName={`${userName}`}
            email={`${email}`}
            role={`${role}`}
          />
          <div className="flex flex-col w-full h-1/2 items-center justify-center rounded-lg ">
            <div className="w-full flex flex-row justify-between border-b-2 pb-2">
              <p className="text-2xl font-semibold">Featured Blog</p>
              <Link to={`/listAllBlogs/${id}`}>
                <Button
                  content={`See All Blogs`}
                  background="black"
                  textColor="white"
                  border="2"
                  rounded
                />
              </Link>
            </div>
            {loading ? ( // Step 3: Display loading indicator
              <p className="text-3xl font-semibold text-center">Loading...</p>
            ) : role !== "Writer" ? (
              <p className="text-3xl font-semibold text-center">
                Read Some Blogs
              </p>
            ) : (
              <div className="mt-5 flex gap-2">
                {limitedData.map((item) => (
                  <Link to={`/readBlog/${item._id}`} key={item._id}>
                    <BlogCard
                      title={item.title.slice(0, 20) + "..."}
                      author={item.author ? item.author.userName : "Unknown"}
                      likes={item.Like.length}
                      rating={4.8}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
