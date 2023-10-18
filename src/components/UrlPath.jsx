import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
function UrlPath() {
  const { pathname } = useLocation();
  console.log({ pathname });
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
