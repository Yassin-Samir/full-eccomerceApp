import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addOrders } from "../redux/slices/credentials";

function useOrders(UserRef) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!UserRef) return;
    const unSub = onSnapshot(UserRef, (user) => {
      if (!user.exists()) return;
      const data = user.data();
      dispatch(addOrders(data.orders));
    });
    return unSub;
  }, [UserRef]);
}

export { useOrders };
