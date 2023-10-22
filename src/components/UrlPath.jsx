import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
function UrlPath() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const SeparatedRoutesArr = pathname.split("/").filter((route) => route);
  const Path = SeparatedRoutesArr[SeparatedRoutesArr.length - 1];

  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {pathname === "/" ? "Jewellery Store" : Path.replace(/%20/gi, " ")}
        </title>
      </Helmet>
      {pathname === "/" ? null : (
        <div className="UrlPath">
          <Link to={"/"}>Home</Link> /
          <span className="active">{Path.replace(/%20/gi, " ")}</span>
        </div>
      )}
    </HelmetProvider>
  ); /* pathname === "/" ? null : (
    <HelmetProvider>
      <Helmet>
        <title>{Path.replace(/%20/gi, " ")}</title>
      </Helmet>
      <div className="UrlPath">
        <Link to={"/"}>Home</Link> /
        <span className="active">{Path.replace(/%20/gi, " ")}</span>
      </div>
    </HelmetProvider>
  ); */
}

export default UrlPath;
