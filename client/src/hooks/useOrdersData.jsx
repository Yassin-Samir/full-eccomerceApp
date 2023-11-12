import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";

function useOrders(UserRef, setFunction) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!UserRef) return;
    const unSub = onSnapshot(UserRef, (user) => {
      if (!user.exists()) return;
      const data = user.data();
      dispatch(setFunction(data.orders));
    });
    return unSub;
  }, [UserRef]);
}

export { useOrders };
