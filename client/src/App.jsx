import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Toaster } from "@/components/ui/toaster"
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Part from "./pages/part";
import Product from "./pages/product";
import AllProductsPage from "./pages/all-products-page";
import WhatsappIcon from './assets/WhatsApp-icon.png'
import { Helmet, HelmetProvider } from "react-helmet-async";

const DefaultMetaTags = () => {
  return <Helmet>
    <title>Hendese Otomotiv | Suzuki Çıkma Yedek Parça</title>
    <meta name="description" content="Hendese Otomotiv | Sakarya Arifiye Suzuki Çıkma Yedek Parça" />
    <meta property="og:title" content="Hendese Otomotiv | Suzuki Çıkma Yedek Parça" />
    <meta property="og:description" content="Sakarya Arifiye Suzuki Çıkma Yedek Parça" />
    <meta property="og:image" content="https://i.ibb.co/hRvXYN3/logo.jpg" />
    <meta property="og:url" content="https://www.hendeseoto.com" />
    <meta property="og:type" content="website" />
  </Helmet>
}

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
    <HelmetProvider>
      <DefaultMetaTags />
      <Toaster />
      <Analytics />
      <SpeedInsights />
      <RouterProvider router={router} />
      <a href="https://wa.me/+905303604105" className="fixed bottom-4 right-4 cursor-pointer flex flex-col items-center">
        <img src={WhatsappIcon} className="w-14 h-14 sm:w-20 sm:h-20 rounded hover:bg-green-300  transition-all" />
      </a>
    </HelmetProvider>
  )
}

export default App
