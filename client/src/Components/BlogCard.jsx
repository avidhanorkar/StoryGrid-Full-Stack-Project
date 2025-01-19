import React, {useEffect, useState} from "react";


const BlogCard = ({ title, author, likes, rating, onReadMore }) => {


  return (
    <div className="blogCard hover:shadow-lg shadow-inner w-[400px] h-[180px] rounded-md border bg-white p-[25px] flex flex-col justify-between transition-all duration-300">
      {/* Title and Author */}
      <div>
        <p className="title text-2xl font-bold">{title}</p>
        <p className="text-xl">{author}</p>
      </div>

      {/* Read Now and Likes/Ratings */}
      <div className="flex flex-row justify-between">
        {/* Read More */}
        <div>
          <button
            className="text-blue-500 font-semibold hover:underline"
            onClick={onReadMore}
          >
            Read Now..
          </button>
        </div>

        {/* Likes and Ratings */}
        <div className="likesRatings flex gap-3">
          <p className="flex flex-row gap-[7px] items-center">
            {/* Heart Icon */}
            <svg
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
            {likes}
          </p>

          <p className="flex gap-[7px] items-center">
            {/* Star Icon */}
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
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
