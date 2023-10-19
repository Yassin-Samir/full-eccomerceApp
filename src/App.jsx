import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import "../src/css/home/firstSlider.css";
import "../src/css/home/features.css";
import "../src/css/home/checkOutCollection.css";
import "../src/css/home/secondJewellerySlider.css";
import "../src/css/home/mainJewelSlider.css";
import "../src/css/home/dummySection.css";
import "../src/css/home/reviewSlider.css";
import "../src/css/home/blogPosts.css";
import "../src/css/home/BrandsSlider.css";
import "../src/css/home/SubscribeEmail.css";
import "../src/css/jewelPage/ImgSlider.css";
import "../src/css/jewelPage/jewelPage.css";
import "../src/css/filterItems.css";
import "../src/css/sign.css";
import "../src/css/shop.css";
import "../src/css/App.css";
import "../src/css/Nav.css";
import "../src/css/footer.css";
import "../src/css/index.css";
import "swiper/css";
import "swiper/css/pagination";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Jewel = lazy(() => import("./pages/Jewel"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Success = lazy(() => import("./pages/success"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      { path: "/shop/:jewel", element: <Jewel /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/checkout/success",
        element: <Success />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
