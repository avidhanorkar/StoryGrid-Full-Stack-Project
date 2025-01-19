import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

const JoinCommunity = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <div className="flex flex-col h-[40vh] gap-7 items-center justify-center ">
      {!user ? (
        <>
          <div className="flex flex-col gap-1">
            <p className="text-4xl text-center font-semibold ">
              Join Our Community!
            </p>
            <p className="text-center text-xl">
              Be Part of a Movement That Celebrates Creativity, Connection, and
              Collaboration
              <br />
              Join Us Today!
            </p>
          </div>
          <div className="flex justify-center">
            <Link to="/signUp">
              <Button
                content="Get Started"
                background="black"
                textColor="white"
                rounded
                hoverShadow
              />
            </Link>
          </div>
        </>
      ) : (
        <div>
          <p className="text-4xl text-center font-semibold ">
            Thank's For Being The Part of The Community!
          </p>
        </div>
      )}
    </div>
  );
};

export default JoinCommunity;
