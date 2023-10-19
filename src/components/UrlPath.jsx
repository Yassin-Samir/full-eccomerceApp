import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
function UrlPath() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const Path = pathname.split("/")[pathname.split("/").length - 1];
  return pathname === "/" ? null : (
    <div className="UrlPath">
      <Link to={"/"}>Home</Link> /{" "}
      <span className="active"> {Path.replace(/%20/gi, " ")}</span>
    </div>
  );
}

export default UrlPath;
