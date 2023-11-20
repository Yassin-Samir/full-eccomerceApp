import { useNavigate, Link as RoutingLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "../redux/slices/credentials";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";
function WelcomeUser({ user }) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(LogOut());
      Navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="WelcomeUser">
      <p>Welcome {user?.displayName || ""}</p>
      <Button variant="contained" onClick={handleSignOut}>
        SignOut
      </Button>
      <Link component={RoutingLink} underline="none" to={"/Orders"}>
        Orders
      </Link>
    </div>
  );
}

export default WelcomeUser;
