import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import MainLayout from "./layout/MainLayout";

// pages
import Dashboard from "./pages/dashboard";
import InvoicePage, { invoiceLoader } from "./pages/invoice";
import ErrorPage from "./pages/errors/ErrorPage";
import ProfilePage from "./pages/profile";
import ProfileStats from "./pages/profile/components/profileStats";
import AccountBalance from "./pages/profile/components/accountBalance";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/invoice/:id",
          element: <InvoicePage />,
          loader: invoiceLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <ProfileStats />,
              errorElement: <ErrorPage />,
            },
            {
              path: "balance",
              element: <AccountBalance />,
              errorElement: <ErrorPage />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
