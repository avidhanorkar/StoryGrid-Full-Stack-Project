import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

const LandingHero = () => {
  const { user, logout } = React.useContext(AuthContext);
  return (
    <>
      <div className="h-[60vh] text-left flex flex-row items-center justify-center gap-2 border-b-2 ">
        <div className="w-1/2 pl-[50px] flex flex-col gap-2">
          {user ? (
            <p>
              Hi! <span className="font-bold text-2xl">{user.user}</span>,
            </p>
          ) : null}
          <p className="text-5xl font-semibold pb-[10px]">
            Welcome to the StoryGrid!
          </p>
          <p className="text-2xl font-medium">
            From Writing Your First Blog to Finding Your Next Favorite Read,{" "}
            <span className="font-[600]">StoryGrid</span> Unites Writers and
            Readers in a Celebration of Expression.
          </p>
          <div className="flex gap-2 mt-5">
            {!user ? (
              <>
                <Link to="/signUp">
                  <Button
                    content="Get Started"
                    background="black"
                    textColor="white"
                    rounded
                    hoverShadow
                  />
                </Link>
                <Link to="/listings">
                  <Button
                    content="Browse Blogs"
                    border="2"
                    textColor="black"
                    rounded
                    hoverShadow
                  />
                </Link>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/listings">
                  <Button
                    content="Browse Blogs"
                    border="2"
                    rounded
                    hoverShadow
                    background="black"
                    textColor="white"
                  />
                </Link>
                {user.role === "Writer" && (
                  <Link to="/write-blog">
                    <Button
                      content="Write a Blog"
                      border="2"
                      rounded
                      hoverShadow
                      background="white"
                      textColor="black"
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <img src="/assets/Blogging-bro.svg" className="w-[450px]" alt="" />
        </div>
      </div>
    </>
  );
};

export default LandingHero;
