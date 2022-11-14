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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
    element: <LogIn/>,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);