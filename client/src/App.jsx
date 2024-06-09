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
import WhatsappIcon from './assets/WhatsApp-icon.png'

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
      <a href="https://wa.me/+905303604105" className="fixed bottom-4 right-4 cursor-pointer flex flex-col items-center">
        <img src={WhatsappIcon} className="w-14 h-14 sm:w-20 sm:h-20 rounded hover:bg-green-300  transition-all" />
      </a>
    </>
  )
}

export default App
