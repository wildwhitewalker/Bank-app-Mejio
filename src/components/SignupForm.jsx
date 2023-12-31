import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [signupData, setSignupData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    userName: "",
    password: "",
    accountNumber: "",
    accountBalance: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const generateAccountNumber = () => {
      const existingAccountNumber =
        JSON.parse(localStorage.getItem("accounts")) || [];
      let newAccountNumber;

      do {
        newAccountNumber = String(
          Math.floor(1000000000 + Math.random() * 9000000000)
        );
      } while (
        existingAccountNumber.some(
          (account) => account.accountNumber === newAccountNumber
        )
      );
      return newAccountNumber;
    };

    const newAccountNumber = generateAccountNumber();
    console.log(newAccountNumber);

    setSignupData({
      ...signupData,
      accountNumber: newAccountNumber,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

    savedAccounts.push(signupData);

    localStorage.setItem("accounts", JSON.stringify(savedAccounts));

    alert("Account is Created!");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-300 via-red-500 to-purple-500">
      <h2 className="text-3xl font-semibold text-white mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md max-w-md">
        <div className="mb-4">
          <label className="text-gray-700">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={signupData.firstName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={signupData.middleName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={signupData.lastName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={signupData.phoneNumber}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Username:</label>
          <input
            type="text"
            name="userName"
            value={signupData.userName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700">
            <input type="checkbox" required />
            Accept Terms and Condition
          </label>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;