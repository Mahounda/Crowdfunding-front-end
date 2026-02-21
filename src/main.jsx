import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditPledgePage from "./pages/EditPledgePage";
import EditFundraiserPage from "./pages/EditFundraiserPage";
import AddPledgePage from "./pages/AddPledgePage";
import PledgeForm from "./pages/PledgePage";
import { AuthProvider } from "./context/AuthProvider";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import FundraiserCreatePage from "./pages/FundraiserCreatePage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

import Layout from "./components/Layout.jsx";
import PledgeForm from "./components/PledgeForm.jsx";

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
      { path: "/pledges/new", element: <PledgeForm /> },
      { path: "/pledges/:id/edit", element: <EditPledgePage /> },

      { path: "/signup", element: <SignUpPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
// TODO: Re-enable StrictMode once the app is stable
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
);