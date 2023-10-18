import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import "./css/Home/firstSlider.css";
import "./css/Home/features.css";
import "./css/Home/checkOutCollection.css";
import "./css/Home/secondJewellerySlider.css";
import "./css/Home/mainJewelSlider.css";
import "./css/Home/dummySection.css";
import "./css/Home/reviewSlider.css";
import "./css/Home/blogPosts.css";
import "./css/Home/BrandsSlider.css";
import "./css/Home/SubscribeEmail.css";
import "./css/jewelPage/ImgSlider.css";
import "./css/jewelPage/jewelPage.css";
import "./css/filterItems.css";
import "./css/sign.css";
import "./css/shop.css";
import "./css/App.css";
import "./css/Nav.css";
import "./css/footer.css";
import "./css/index.css";
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
