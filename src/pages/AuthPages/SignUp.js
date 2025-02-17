import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GridShape from "../../components/common/GridShape";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import PageMeta from "../../components/common/PageMeta";
import axios from "axios";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    date_joined: "",
  });
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/users/", formData);
      setUserData([...userData, response.data]);
      setIsModalOpen(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
        //date_joined: "",
      });
      navigate("/signin");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard"
        description="Sign Up page for user registration."
      />
      <div className="relative flex w-full h-screen overflow-hidden bg-white z-1 dark:bg-gray-900">
        <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your details to sign up!
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* First Name and Last Name Fields */}
                <div className="flex space-x-4 mb-3">
                  <div className="w-full">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Email and Password Fields in Same Row */}
                <div className="flex space-x-4 mb-3">
                  <div className="w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                      </button>
                    </div>
                  </div>
                </div>


                {/* Role field*/}
                <div className="flex space-x-4 mb-3">
                  <div className="w-full">
                    <Label htmlFor="role">Role</Label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border bg-white border-gray-300 p-2 text-sm"
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      <option value="Agent">Agent</option>
                      <option value="User">User</option>
                    </select>
                  </div>
                </div>

                {/* Error Message */}
                {error && <div className="text-sm text-red-500">{error}</div>}

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
          <GridShape />
          <div className="flex flex-col items-center max-w-xs">
            <Link to="/" className="block mb-4">
              <img src="./images/logo/auth-logo.svg" alt="Logo" />
            </Link>
            <p className="text-center text-gray-400 dark:text-white/60">
              Powerful and optimized waste management system
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
