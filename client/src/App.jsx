import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/login",
    element: <Login />
  },
  // {
  //   path: "/product/:productId",
  //   element: <ProductPage />
  // },
  // {
  //   path: "/iletisim",
  //   element: <Contact />
  // },
  // {
  //   path: `/kategori/:categoryName`,
  //   element: <CategoryPage />
  // }
]);
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
