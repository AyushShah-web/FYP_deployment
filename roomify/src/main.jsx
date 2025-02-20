import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Signup,
  VerifyOtp,
  UserNegotiations,
  UserProfile,
  UserRooms,
  UserRoomsList,
  ExperienceForm,
  RoomExperiences,
  RoomForm,
  SingleRoom,
  Protected as AuthLayout,
} from "./components/index.js";

import Rooms from "./pages/Rooms.jsx";
import Experiences from "./pages/Experiences.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import RentRoom from "./components/Payments/RentRoom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/category/rooms",
        element: <Rooms />,
      },
      {
        path: "/room/:slug",
        element: <SingleRoom />,
      },
      {
        path: "/verifyOtp",
        element: <VerifyOtp />,
      },
      {
        path: "/experiences",
        element: <Experiences />,
      },
      {
        path: "/experienceForm",
        element: (
          <AuthLayout authentication={true}>
            {" "}
            <ExperienceForm />
          </AuthLayout>
        ),
      },
      {
        path: "/experience/:slug",
        element: <RoomExperiences />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/rentRoom",
        element: <RentRoom />,
      },
      {
        path:"/payment/:slug",
        element:<RentRoom/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: (
          <AuthLayout authentication={true}>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: "userRooms",
        element: (
          <AuthLayout authentication={true}>
            <UserRooms />
          </AuthLayout>
        ),
      },
      {
        path: "userRoomList",
        element: (
          <AuthLayout authentication={true}>
            <UserRoomsList />
          </AuthLayout>
        ),
      },
      {
        path: "userNegotiations",
        element: (
          <AuthLayout authentication={true}>
            <UserNegotiations />
          </AuthLayout>
        ),
      },
      {
        path: "roomForm",
        element: (
          <AuthLayout authentication={true}>
            <RoomForm />
          </AuthLayout>
        ),
      },
      {
        path: "roomForm/:slug",
        element: (
          <AuthLayout authentication={true}>
            <RoomForm />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);
