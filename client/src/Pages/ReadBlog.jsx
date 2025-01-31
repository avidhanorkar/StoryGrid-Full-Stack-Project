import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentBody from "../Components/CommentBody";
import { Link } from "react-router-dom";
import WriteComment from "../Components/WriteComment";
import { AuthContext } from "../Context/authContext";

const ReadBlog = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const {user} = useContext(AuthContext);

   const getComments = async () => {
      try {
        const response = await fetch(
          `https://storygrid-full-stack-project-1.onrender.com/api/v1/comment/getComments/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // Assuming the comments are in result.comments
        setComments(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]); // Set to an empty array on error
      }
    };
  
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://storygrid-full-stack-project-1.onrender.com/api/v1/blog/readOne/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setBlog(result);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const avgRating = async () => {
      try {
        const rate = await fetch(
          `https://storygrid-full-stack-project-1.onrender.com/api/v1/rating/getAvgRating/${id}`
        );
        if (!rate.ok) {
          if (rate.status === 404) {
            setRating(0); // Set rating to 0 if no ratings are found
            return;
          }
          throw new Error(`HTTP error! status: ${rate.status}`);
        }

        const result = await rate.json();
        setRating(result.averageRating);
      } catch (error) {
        console.log(error);
        setRating(-1); // Set a fallback value for error cases
      }
    };

    fetchBlog();
    avgRating();
    getComments();
  }, [id]);

  const ToggleLike = async () => {
    try {
      const response = await fetch(`https://storygrid-full-stack-project-1.onrender.com/api/v1/blog/toggleLike/${blog._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error Liking blog:", error);
    }
  }
  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  let formattedDate;
  if (blog) {
    formattedDate = formatDate(blog.createdAt);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>No blog data available.</div>;
  }

  return (
    <>
      <div className="mx-[250px] mt-8">
        <div className="flex flex-col gap-2 pb-5  border-b-2">
          <div>
            <p className="text-4xl font-bold tracking-tight lg:text-5xl">
              {blog.title}
            </p>
          </div>
          <div className="flex gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
                fill="currentColor"
              />
              <path
                d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
                fill="currentColor"
              />
            </svg>
            <Link to={`/profile/${blog.author._id}`}>
              <p>{blog.author.userName}</p>
            </Link>
          </div>
          <div className="flex justify-between">
            <div className="createdAt flex flex-row gap-2">
              <img src="/assets/calendar.svg" className="w-6 h-6" alt="" />
              {formattedDate}
            </div>
            <div className="flex gap-5">
              <div className="likes flex flex-row gap-2">
                <svg onClick={ToggleLike}
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                {blog.Like.length}
              </div>
              <div className="rates flex flex-row gap-2">
                <svg
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                {rating}
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-2">
          <div className="m-8">
            <p className="text-xl ">{blog.content}</p>
          </div>
        </div>
        <div className="comments my-8 flex gap-5 flex-col">
          <div>
            <p className="text-2xl font-semibold">Comments</p>
          </div>

          <div className="commenthere flex justify-center mx-8">
            <WriteComment id={id} comments={getComments} />
          </div>

          <div className="mx-8 flex flex-col gap-3 ">
            {comments.map((comment) => (
              <CommentBody
                key={comment._id} // Use a unique key for each comment
                commenter={comment.user?.userName || "Anonymous"} // Accessing userName
                cmntBody={comment.comment} // Accessing comment text
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadBlog;
