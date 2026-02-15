import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditPledgePage from "./pages/EditPledgePage";
import EditFundraiserPage from "./pages/EditFundraiserPage";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import FundraiserCreatePage from "./pages/FundraiserCreatePage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/fundraiser/:id", element: <FundraiserPage /> },
      { path: "/pledges/:id/edit", element: <EditPledgePage /> },
      { path: "/fundraiser/create", element: <FundraiserCreatePage /> },
      { path: "/fundraisers/:id/edit", element: <EditFundraiserPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Here we wrap our app in the router provider so they render */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);
