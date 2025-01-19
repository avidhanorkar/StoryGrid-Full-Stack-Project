import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/authContext";

const WriteComment = ({ id }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(
        `https://storygrid-full-stack-project-1.onrender.com/api/v1/comment/createComment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comment, userId: user?.id }), // Ensure correct key
        }
      );

      if (!response.ok) {
        throw new Error(await response.text()); // Get the error message
      }

      setComment(""); // Clear textarea before reloading
      window.location.reload();
    } catch (error) {
      console.error("Error submitting comment:", error.message); // Log any errors
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mx-8 mb-4 border border-gray-500 rounded-lg bg-gray-50">
          <div className="px-4 py-2 rounded-t-lg">
            {user ? (
              <div>
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  onChange={handleChange}
                  value={comment} // Ensure controlled component
                  id="comment"
                  rows="4"
                  className="w-full px-0 text-sm resize-none text-gray-900 border-0 focus:outline-none"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
            ) : (
              <p>You can't comment</p>
            )}
          </div>
          {user && (
            <div className="flex items-center justify-center px-3 py-2">
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-blue-200"
              >
                Post comment
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default WriteComment;
