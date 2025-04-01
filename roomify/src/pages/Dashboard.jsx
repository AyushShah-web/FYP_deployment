import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuthorized, userUnAuthorized } from "../store/userSlice";
import SummaryApi from "../api/api";
import { FiMenu, FiX } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import {
  Profile,
  RoomForm,
  Negotiations,
  LandlordRooms,
  LandlordRoomsList,
  TenantsList,
  LandlordsList,
  Messages,
} from "../components/index";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import MyRooms from "../components/Dashboard/Tenant/MyRooms";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetching Data

  useEffect(() => {
    console.log("UserData", userData);

    if (Object.keys(userData).length === 0) {
      async function fetchData() {
        try {
          const response = await axios.get(SummaryApi.userData.url, {
            withCredentials: true,
          });
          console.log("app.js", response.data.data);
          let userData = response.data.data;
          // Set the user data correctly
          if (userData) {
            dispatch(userAuthorized(userData));
          }
        } catch (error) {
          console.error("Error", error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    dispatch(userUnAuthorized());
    try {
      await axios.get(SummaryApi.logout.url, { withCredentials: true });
    } catch (error) {
      console.error("Error", error);
    }
    window.location.href = "http://localhost:5173";
  };

  return loading ? (
    <div className="flex h-screen justify-center items-center">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  ) : (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen relative">
      <div
        className={`fixed md:relative z-20 w-64 bg-white shadow-md h-screen p-5 transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="text-[#0f5da7] text-2xl font-bold pb-5 text-center">
          Dashboard
        </h1>
        <div className="flex flex-col gap-4">
          <NavLink
            to={"/dashboard/profile"}
            className={({ isActive }) =>
              `p-3 rounded-md text-center transition ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "bg-[#0f5da7] text-white hover:bg-blue-700"
              }`
            }
          >
            Profile
          </NavLink>

          {/* Landlord */}
          {userData.type === "landlord" && (
            <>
              <NavLink
                to={"/dashboard/userRooms"}
                className={({ isActive }) =>
                  `p-3 rounded-md text-center transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-[#0f5da7] text-white hover:bg-blue-700"
                  }`
                }
              >
                Rooms
              </NavLink>
              <NavLink
                to="/dashboard/UserRoomList"
                className={({ isActive }) =>
                  `p-3 rounded-md text-center transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-[#0f5da7] text-white hover:bg-blue-700"
                  }`
                }
              >
                List Of Rooms
              </NavLink>
            </>
          )}

          {/* Tenant and Landlord */}
          {(userData.type === "landlord" || userData.type === "tenant") && (
            <>
              <NavLink
                to={"/dashboard/userNegotiations"}
                className={({ isActive }) =>
                  `p-3 rounded-md text-center transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-[#0f5da7] text-white hover:bg-blue-700"
                  }`
                }
              >
                Negotiations
              </NavLink>
              <NavLink
                to={"/dashboard/messages"}
                className={({ isActive }) =>
                  `p-3 rounded-md text-center transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-[#0f5da7] text-white hover:bg-blue-700"
                  }`
                }
              >
                Messages
              </NavLink>
            </>
          )}

          {/* Tenant  */}
          {userData.type === "tenant" && (
            <NavLink
              to={"/dashboard/myRooms"}
              className={({ isActive }) =>
                `p-3 rounded-md text-center transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "bg-[#0f5da7] text-white hover:bg-blue-700"
                }`
              }
            >
              Rented Rooms
            </NavLink>
          )}

          {/* Admin */}
          {userData.type === "admin" && (
            <>
              {" "}
              <NavLink
                to={"/dashboard/landlordsList"}
                className={({ isActive }) =>
                  `p-3 rounded-md text-center transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-[#0f5da7] text-white hover:bg-blue-700"
                  }`
                }
              >
                Landlords
              </NavLink>
              <NavLink
                to={"/dashboard/tenantsList"}
                className={({ isActive }) =>
                  `p-3 rounded-md text-center transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "bg-[#0f5da7] text-white hover:bg-blue-700"
                  }`
                }
              >
                Tenants
              </NavLink>
            </>
          )}
        </div>
        <div className="absolute self-center bottom-3 w-[90%] flex flex-col">
          <Link
            to={"/"}
            className="mt-6 w-[85%]  bg-primary bottom-0 flex items-center justify-center gap-2 p-3 rounded-md text-white hover:bg-red-600 transition"
          >
            Home <IoHome />
          </Link>
          <button
            onClick={logout}
            className="mt-6 w-[85%] flex items-center justify-center gap-2 p-3 rounded-md text-white bg-red-500 hover:bg-red-600 transition"
          >
            Logout <IoIosLogOut />
          </button>
        </div>
      </div>

      <button
        className="md:hidden fixed top-5 right-5 text-2xl text-[#0f5da7] z-30"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div
        className={`flex-1 p-1 lg:p-5  md:pr-4 bg-white shadow-lg rounded-lg transition-all duration-300 ${
          menuOpen ? "pl-0" : ""
        }`}
      >
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/userRooms" element={<LandlordRooms />} />
          <Route path="/userRoomList" element={<LandlordRoomsList />} />
          <Route path="/userNegotiations" element={<Negotiations />} />
          <Route path="/roomForm" element={<RoomForm />} />
          <Route path="/roomForm/:slug" element={<RoomForm />} />
          <Route path="/myRooms" element={<MyRooms />} />
          {userData.type != "admin" && (
            <Route path="/messages" element={<Messages />} />
          )}

          {userData.type == "admin" && (
            <>
              <Route path="/tenantsList" element={<TenantsList />} />
              <Route path="/landlordsList" element={<LandlordsList />} />
            </>
          )}
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
