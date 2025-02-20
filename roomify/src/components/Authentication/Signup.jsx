import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../../api/api";
import showToast from "../ShowToast";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userType, setUserType] = useState("Tenant");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!(email && password && name && rePassword && userType)) {
      setError("Enter all the fields");
      return;
    }
    if (!(password == rePassword)) {
      showToast("error", "Both password didn't match");
      setError("Re-entered password didn't match");
      return;
    }
    if (!(password.length >= 6)) {
      setError("Password should be more than 6 letters");
      return;
    }
    setError("");
    console.log("1");
    try {
      const userExist = await axios.get(
        `${SummaryApi.checkUserInDb.url}/${email}`
      );
      console.log("2");
      if (userExist.data.data) {
        setError("user Already Exists");
        return;
      }
      const response = await axios.post(SummaryApi.generateOtp.url, {
        userEmail: email,
      });
      if (!response.data.data) {
        showToast("error", "Error occured while generating OTP");
        return;
      }
      showToast("success", "Otp Sent suscessfully");
      navigate("/verifyOtp", {
        state: { email, password, name, userType, toast: true },
      });
    } catch (error) {
      setError("Error occured while making requests.");
    } finally {
      setLoading(false);
    }
  };

  const SignUpWithGoogle = () => {
    try{
    window.open(SummaryApi.gAuthLogin.url, "_self");
    }catch(error){
      setError("Enter valid details")
    }
  };

  return (
    <div className="flex justify-center">
      <div className="login-page flex flex-col justify-center items-center m-3 shadow-lg lg:py-10 lg:w-[30rem] bg-white rounded-2xl">
        <h1 className="text-2xl p-2 lg:pb-4 font-bold text-gray-900">
          SignUp Form
        </h1>
        <form
          onSubmit={submitForm}
          className="flex flex-col gap-4 w-screen px-3 lg:px-8 max-w-[500px]"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="formName" className="text-gray-700">
              Enter Your Name:
            </label>
            <input
              id="formName"
              type="text"
              placeholder="Enter your name"
              className="p-2 border rounded-xl outline-none max-w-[20rem] focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="formEmail" className="text-gray-700">
              Enter Your Email:
            </label>
            <input
              id="formEmail"
              type="email"
              placeholder="Enter your email"
              className="p-2 border rounded-xl outline-none max-w-[20rem] focus:ring-2 focus:ring-primary"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="rePassword" className="text-gray-700">
              Re-enter Your Password:
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              id="rePassword"
              className="p-2 border rounded-xl outline-none max-w-[20rem] focus:ring-2 focus:ring-primary"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          {error && <p className="text-center text-red-700 text-sm">{error}</p>}
          <div className="flex gap-2 ">
            <label htmlFor="userType" className="text-gray-700">
              Sign Up as:
            </label>
            <select
              name="userType"
              id="userType"
              className="rounded-xl border-2 px-2 py-1 outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="tenant">Tenant</option>
              <option value="landLord">Landlord</option>
            </select>
          </div>
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-xl flex-1 cursor-pointer hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </form>
        <div className="g-auth p-3 flex flex-col items-center mt-4">
          <h1 className="text-gray-700">Or</h1>
          <h1 className="text-gray-600">Sign Up using your account with</h1>
          <button
            className="flex items-center bg-primary p-2 rounded hover:text-white mt-2 gap-2"
            onClick={SignUpWithGoogle}
          >
            <FcGoogle />
            Google
          </button>
          <p className="py-1 text-sm text-center text-primary">Note: Signing with google will treat you as tenant.</p>

        </div>
        <div className="mt-4 mb-7">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-center ml-2 text-primary underline"
          >
            Login
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
