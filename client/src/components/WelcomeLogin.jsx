import { useNavigate } from "react-router-dom";
import { LogOut } from "../redux/slices/credentials";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
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
      <button className="shopNowBtn" onClick={handleSignOut}>
        SignOut
      </button>
    </div>
  );
}

export default WelcomeUser;
