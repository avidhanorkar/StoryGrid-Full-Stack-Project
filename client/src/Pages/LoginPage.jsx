import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://storygrid-full-stack-project-1.onrender.com/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate('/')
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row gap-2 justify-center items-center h-[40vw]">
      <div className="w-1/2 h-5/6">
        <img src="/assets/login.svg" className="h-full" alt="" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 max-w-md  p-8 rounded-lg drop-shadow-sm shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full mb-4 py-2 px-4 bg-black text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sign Up
        </button>

        <div className="mb-4">
          <p className="text-center">
            Don't Have an account? <Link to="/signUp" className="font-[600] underline">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
