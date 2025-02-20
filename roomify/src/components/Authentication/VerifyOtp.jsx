import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../../api/api";
import showToast from "../ShowToast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const data = location.state || {};

  console.log("data", data);

  const registerUser = async () => {
    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
      userType: data.userType,
    };
    console.log(SummaryApi.signup.url);

    try {
      const response = await axios.post(SummaryApi.signup.url, userData);
      console.log("response.data.data", response.data.data);

      if (response.data.data["name"]) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const verifyOtpFunction = async () => {
    try {
      const response = await axios.put(SummaryApi.verifyOtp.url, {
        userEmail: data.email,
        otp: otp,
      });
      console.log("response data suscess code", response.data.statusCode);

      if (response.data.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!otp) {
        setError("Please enter the OTP");
        showToast("error", "Please enter the otp");
        return;
      }
      setError("");
      console.log("OTP Submitted:", otp);

      const otpVerified = await verifyOtpFunction();
      console.log(otpVerified);
      if (!otpVerified) {
        showToast("error", "Invalid OTP");
        setOtp("");
        return;
      }
      const register = await registerUser();
      console.log("register", register);

      if (!register) {
        showToast("error", "Error occured while registering");
        return;
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
      showToast("error", "Error occured while registered");
    } finally {
      setLoading(false);
      showToast("error", "Something went wrong");
    }
  };

  useEffect(() => {
    if (data) {
      showToast("success", "Otp Sent suscessfully");
    } else {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="flex flex-col justify-center items-center m-3 shadow-lg lg:py-10 lg:w-[25rem] bg-white rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Verify OTP</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-[300px]"
        >
          <input
            type="text"
            placeholder="Enter Your OTP"
            className="p-2 border rounded-xl outline-none focus:ring-2 focus:ring-primary text-center"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <p className="text-center text-red-700 text-sm">{error}</p>}
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-xl cursor-pointer hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? "Verifying" : "Verify"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyOtp;
