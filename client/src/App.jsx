import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Part from "./pages/part";
import Product from "./pages/product";
import AllProductsPage from "./pages/all-products-page";

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
  {
    path: "/parca/:parca",
    element: <Part />
  },
  {
    path: "/parca/:parca/:id",
    element: <Product />
  },
  {
    path: `/tum-parcalar`,
    element: <AllProductsPage />
  }
]);
function App() {
  return (
    <>
      <Toaster />
      <Analytics />
      <RouterProvider router={router} />
    </>
  )
}

export default App
