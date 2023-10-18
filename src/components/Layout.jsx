import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { fetchJewellery } from "../redux/slices/jewellery";
import { LogIn, LogOut } from "../redux/slices/credentials";
import { jewellerySelector } from "../redux/selectors";
import Nav from "./Nav";
import UrlPath from "./UrlPath";
import LoadingComponent from "./Loading";
import Footer from "./footer";

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
    <>
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
    </>
  );
}

export default Layout;
