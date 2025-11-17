import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/auth";

import PrivateRoute from "./pages/auth/ProtectedRoutes";
import Portal from "./layout";
import DashboardType from "./pages/dashboard";
import LeadDetail from "./pages/leads";

function App() {


  const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
      path: "/portal",
      element: (
        <PrivateRoute>
          <Portal />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardType />,
        },
        {
          path: "leads/:id",
          element: <LeadDetail/>,
        },
        
      ],
    }
]);
  return (
    <>
<RouterProvider router={router} />,
</>
  )
}

export default App
