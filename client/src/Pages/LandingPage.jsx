import React from "react";
import Button from "../Components/Button";
import LandingHero from "../Components/LandingHero";
import LandingExplore from "../Components/LandingExplore";
import JoinCommunity from "../Components/JoinCommunity";

const LandingPage = () => {
  return (
    <>
      <LandingHero />
      {/* Explore Blogs */}
      <LandingExplore />
      {/* Join Our Community */}
      <JoinCommunity />
    </>
  );
};

export default LandingPage;
