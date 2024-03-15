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
    <>
      <Toaster />
      <Analytics />
      <RouterProvider router={router} />
    </>
  )
}

export default App
