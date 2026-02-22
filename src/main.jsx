import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditPledgePage from "./pages/EditPledgePage";
import EditFundraiserPage from "./pages/EditFundraiserPage";
import { AuthProvider } from "./context/AuthProvider";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import FundraiserCreatePage from "./pages/FundraiserCreatePage.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
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
      { path: "/fundraisers/:id", element: <FundraiserPage /> },
      { path: "/fundraisers/create",
        element: (
        <ProtectedRoute>
        <FundraiserCreatePage />
        </ProtectedRoute>
        ),
      },

      { path: "/fundraisers/:id/edit", 
        element: (
        <ProtectedRoute>
        <EditFundraiserPage />
        </ProtectedRoute>
        ),
      },

      { path: "/pledges/new", element: <PledgeForm /> },
      { path: "/pledges/:id/edit", 
        element: (
        <ProtectedRoute>
        <EditPledgePage />
        </ProtectedRoute>
        ),
      },

      { path: "/signup", element: <SignUpPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
// TODO: Re-enable StrictMode once the app is stable
  <React.StrictMode>
    <AuthProvider>     
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);