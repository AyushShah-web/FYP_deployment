import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!(email && password)) {
      setError("Enter all the fields");
      return;
    }
    if (!(password.length >= 6)) {
      setError("Password should be more than 6 letters");
      return;
    }
    setError("");
    try {
      const loginIn = await axios.post(
        SummaryApi.login.url,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (loginIn) {
        window.location.href = "http://localhost:5173";
      }
    } catch (error) {
      console.log("Axios Error while logging in", error);
      setError("No user found. Enter Valid Details");
    } finally {
      setLoading(false);
    }
  };

  // Login with google
  const loginWithGoogle = () => {
    try {
      window.open(SummaryApi.gAuthLogin.url, "_self");
    } catch (error) {
      setError("Enter valid details");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="login-page flex flex-col justify-center items-center m-3 shadow-lg lg:py-10 lg:w-[30rem] bg-white rounded-2xl">
        <h1 className="text-2xl p-2 lg:pb-4 font-bold text-gray-900">
          LogIn Form
        </h1>
        <form
          onSubmit={submitForm}
          className="flex flex-col gap-4 w-screen max-w-[500px] p-3 lg:px-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="formEmail" className="text-gray-700">
              Enter Your Email:
            </label>
            <input
              id="formEmail"
              type="email"
              placeholder="Enter your email"
              className="p-2 border rounded-xl outline-none max-w-[20rem] focus:ring-2 focus:ring-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="formPassword" className="text-gray-700">
              Enter Your Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="formPassword"
              className="p-2 border rounded-xl outline-none max-w-[20rem] focus:ring-2 focus:ring-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              className="p-2"
              type="checkbox"
              id="formCheckbox"
              checked={checked}
              onChange={handleChange}
            />
            <label
              htmlFor="formCheckbox"
              className="text-md cursor-pointer text-gray-700"
            >
              Remember me
            </label>
          </div>
          <div>
            <p className="text-center text-sm text-red-600">{error}</p>
          </div>
          <div className="btns flex gap-4 justify-center mt-4">
            <button
              type="submit"
              className="p-2 bg-primary text-white rounded-xl flex-1 cursor-pointer hover:bg-primary/90 transition"
              disabled={loading}
            >
              {loading ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
        <div className="g-auth p-3 flex flex-col items-center mt-4">
          <h1 className="text-gray-700">OR</h1>
          <h1 className="text-gray-600">Sign In using your account with</h1>
          <button
            className="flex items-center bg-primary p-2 mt-2 rounded hover:text-white gap-2"
            onClick={loginWithGoogle}
          >
            <FcGoogle />
            Google
          </button>
          <p className="py-1 text-sm text-center text-primary">
            Note: Signing with google will treat you as tenant.
          </p>
          <div className="mt-4">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-primary ml-2 underline">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
