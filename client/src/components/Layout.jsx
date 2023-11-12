import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { fetchJewellery } from "../redux/slices/jewellery";
import { LogIn, LogOut } from "../redux/slices/credentials";
import { jewellerySelector } from "../redux/selectors";
import { ThemeProvider, createTheme } from "@mui/material";
import Nav from "./Nav";
import UrlPath from "./UrlPath";
import LoadingComponent from "./Loading";
import Footer from "./footer";
import OrdersListener from "../hooks/OrdersListener";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(232, 168, 110)",
    },
    background: {
      default: "#2b2b2b",
      paper: "#2b2b2b",
    },
    text: {
      secondary: "#8a8a8a",
      primary: "rgb(232, 168, 110)",
    },
  },
});
function Layout() {
  const dispatch = useDispatch();

  const { jewels, Loading } = useSelector(jewellerySelector);
  useEffect(() => {
    !jewels ? dispatch(fetchJewellery()) : null;
    const unlisten = auth.onAuthStateChanged((user) =>
      dispatch(
        user
          ? LogIn({
              displayName: user.displayName,
              email: user.email,
              uid: user.uid,
            })
          : LogOut()
      )
    );
    return unlisten;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <header>
        <Nav />
      </header>
      <UrlPath />
      <OrdersListener />
      <main>
        {!Loading ? (
          <Suspense fallback={<LoadingComponent />}>
            <Outlet />
          </Suspense>
        ) : (
          <LoadingComponent />
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </ThemeProvider>
  );
}

export default Layout;
