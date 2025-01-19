import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage";
import ReadBlog from "./Pages/ReadBlog";
import Footer from "./Components/Footer";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import BlogsListing from "./Pages/BlogsListing";
import ListAllBlogs from "./Pages/ListAllBlogs";
import Profile from "./Pages/Profile";
import WriteBlog from "./Pages/WriteBlog";

const App = () => {
  return (
    <div className="">
      <Router>
        <div className="w-[100vw] ">
          <Navbar />
          <div className="mx-[50px]">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/readBlog/:id" element={<ReadBlog />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signUp" element={<SignUpPage />} />
              <Route path="/listings" element={<BlogsListing />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/listAllBlogs/:id" element={<ListAllBlogs />} />
              <Route path="/write-blog" element={<WriteBlog />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
