import React, { useState } from "react";
import { Link } from "react-router";
import GridShape from "../../components/common/GridShape";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Checkbox from "../../components/form/input/Checkbox";
import PageMeta from "../../components/common/PageMeta";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="relative flex w-full h-screen overflow-hidden bg-white z-1 dark:bg-gray-900">
        <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
          {/* <!-- Auth Card --> */}
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password to sign up!
              </p>
            </div>
            <div>
              <form>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* <!-- First Name --> */}
                    <div className="sm:col-span-1">
                      <Label>
                        First Name<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="fname"
                        name="fname"
                        placeholder="Enter your first name"
                      />
                    </div>
                    {/* <!-- Last Name --> */}
                    <div className="sm:col-span-1">
                      <Label>
                        Last Name<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="lname"
                        name="lname"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  {/* <!-- Email --> */}
                  <div>
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  {/* <!-- Password --> */}
                  <div>
                    <Label>
                      Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
            
                  {/* <!-- Button --> */}
                  <div>
                    <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
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
        </div>
        <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
          {/* <!-- ===== Common Grid Shape Start ===== --> */}
          <GridShape />
          {/* <!-- ===== Common Grid Shape End ===== --> */}
          <div className="flex flex-col items-center max-w-xs">
            <Link to="index.html" className="block mb-4">
              <img src="./images/logo/auth-logo.svg" alt="Logo" />
            </Link>
            <p className="text-center text-gray-400 dark:text-white/60">
              Free and Open-Source Tailwind CSS Admin Dashboard Template
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
