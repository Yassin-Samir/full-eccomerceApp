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

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(232, 168, 110)",
    },
  },
});
function Layout() {
  const dispatch = useDispatch();

  const { jewels, Loading } = useSelector(jewellerySelector);
  useEffect(() => {
    !jewels ? dispatch(fetchJewellery()) : null;
    const unListen = auth.onAuthStateChanged((user) => {
      dispatch(
        user ? LogIn({ ...user?.providerData[0], uid: user.uid }) : LogOut()
      );
    });
    return unListen;
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <header>
        <Nav />
      </header>
      <UrlPath />
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
