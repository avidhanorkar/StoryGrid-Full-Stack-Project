import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/authContext";


const WriteComment = ({ id, getComments }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    if (!user) {
      console.error("Unauthorized: User not authenticated");
      return;
    }
    
    if (!comment.trim()) {
      console.error("Comment cannot be empty");
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
        throw new Error(await response.text()); 

      setComment("");
      getComments();
    } catch (error) {
      console.error("Error submitting comment:", error.message); 
    }
  };

  return (
    <div className="w-full">
      {user ? (
        <form onSubmit={handleSubmit}>
          <div className="mx-8 mb-4 border border-gray-500 rounded-lg bg-gray-50">
            <div className="px-4 py-2 rounded-t-lg">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                onChange={handleChange}
                value={comment} // Ensure controlled component
                id="comment"
                rows="4"
                className="w-full px-0 text-sm bg-gray-50 resize-none p-3 text-black border-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-center px-3 py-2">
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-blue-200"
              >
                Post comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-center text-red-500">Unauthorized: You must be logged in to comment.</p>
      )}
    </div>
  );
};

export default WriteComment;
