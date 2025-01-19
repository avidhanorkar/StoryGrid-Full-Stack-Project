import React from "react";
import { Link } from "react-router-dom";
const BlogListCard = ({ title, likes, author, rating, blog }) => {

  

  return (
    <div className="w-[80vw] h-[150px] rounded-lg hover:drop-shadow-lg shadow-inner bg-white border-2 text-black transition-colors duration-300  p-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <div>
            <p className="title text-3xl font-[600]">{title}</p>
            {/* <Link to={`/author/${blog.author._id}`}> */}
            {!author ? null : (
              <p className="author text-xl font-[550] text-gray-600 flex gap-2">
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
                {author}
              </p>
            )}
            {/* </Link> */}
          </div>
          <div className="flex flex-row gap-5">
            {/* Likes */}
            <p className="flex  gap-[7px] items-center">
              {/* Heart Icon */}
              <svg
                className="w-6 h-6 text-gray-400"
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
                className="w-6 h-6 text-gray-400"
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
        <div className="">
          <p className="content"> {blog.slice(0, 100) + "..."}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogListCard;
