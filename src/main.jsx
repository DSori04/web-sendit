import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
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
    errorElement: <NotFound/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/login",
    element: <LogIn/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/new",
    element: <NewOrder/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/prices",
    element: <Prices/>,
    errorElement: <NotFound/>,
  },
  {
    path: "/tracking",
    element: <Tracking/>,
  },
  {
    path: "/tracking/:id",
    element: <Tracking />,
    errorElement: <NotFound/>,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/tracking/order_id=:order_id&user_id=:user_id",
    element: <Tracking />,
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HelmetProvider>
);