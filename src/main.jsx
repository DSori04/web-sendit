import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import { Home } from "./Home/Home.jsx";
import { AboutUs } from './AboutUs/AboutUs'
import { Contact } from './Contact/Contact'
import { LogIn } from './LogIn/LogIn'
import { NewOrder } from './NewOrder/NewOrder'
import { Prices } from './Prices/Prices'
import { Tracking } from './Tracking/Tracking'
import { NotFound } from "./NotFound/NotFound";
import { SignUp } from "./LogIn/SignUp";
import AppContextProvider from "./GlobalStates";
import { Profile } from "./Profile/Profile";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/about-us",
    element: <AboutUs/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/login",
    element: <AppContextProvider><LogIn/></AppContextProvider>,
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/new",
    element: <NewOrder/>,
  },
  {
    path: "/prices",
    element: <Prices/>,
  },
  {
    path: "/tracking",
    element: <Tracking/>,
  },
  {
    path: "/tracking/:id",
    element: <Tracking />,
  },
  {
    path: "/profile",
    element: <Profile />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HelmetProvider>
);