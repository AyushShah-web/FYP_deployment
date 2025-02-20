import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAuthorized } from "./store/userSlice";
import axios from "axios";
import SummaryApi from "./api/api";

import {  Footer, NabBar } from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  return loading ? (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <h1 className="text-2xl">Loading...</h1>
    </div>
  ) : (
    <>
      <NabBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
