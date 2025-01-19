import React, { useContext } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div className="h-16 w-[100vw] flex justify-between items-center px-[50px] border-b-2">
        <Link to={"/"}>
          <div className="flex items-center">
            <>
              <svg
                className=" text-gray-800 h-[2.5rem]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="black"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
                />
              </svg>
            </>
            <>
              <p className="text-3xl font-semibold">StoryGrid</p>
            </>
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <Button
            content="Blogs"
            padding="px-3 py-2"
            fontWeight="font-semibold"
            textColor="black"
            rounded
            hoverShadow
          />

          {!user ? (
            <>
              <Link to="/login">
                <Button
                  content="Login"
                  border="2"
                  rounded
                  hoverShadow
                  fontWeight="font-semibold"
                  textColor="black"
                />
              </Link>

              <Link to="/signUp">
                <Button
                  content="SignUp"
                  background="black"
                  textColor="white"
                  border="2"
                  rounded
                  hoverShadow
                />
              </Link>
            </>
          ) : (
            <>
              <Button
                onClick={logout} // Use the logout function from context
                content="Logout"
                border="2"
                rounded
                hoverShadow
                fontWeight="font-semibold"
                textColor="black"
              />
              <Link to={`/profile/${user.id}`}>
                <Button
                  content={user.user}
                  border="2"
                  textColor="white"
                  background="black"
                  rounded
                  hoverShadow
                  fontWeight="font-semibold"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
