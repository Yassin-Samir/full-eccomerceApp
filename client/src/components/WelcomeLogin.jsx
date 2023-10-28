import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
function WelcomeUser({ user }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Navigate({ to: "/" });
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
