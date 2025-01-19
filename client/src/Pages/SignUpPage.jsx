import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Reader",
  });

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
      const response = await fetch(
        `https://storygrid-full-stack-project-1.onrender.com/api/v1/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row-reverse justify-center items-center h-[50vw]">
      <div className="w-1/2 h-full">
        <img src="/assets/signUp.svg" alt="" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 max-w-md  p-8 rounded-lg drop-shadow-sm shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="userName"
          >
            userName
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

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

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="role"
          >
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border mb-2 border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="Reader">Reader</option>
            <option value="Writer">Writer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-black text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
