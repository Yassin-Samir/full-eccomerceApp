import { useSelector } from "react-redux";
import { UserSelector } from "../redux/selectors";
import { addOrders } from "../redux/slices/credentials";
import { useOrders } from "./useOrdersData";
import { doc } from "firebase/firestore";
import { db } from "../firebase";
import { useMemo } from "react";

function OrdersListener() {
  const { user } = useSelector(UserSelector);
  const userDoc = useMemo(() => {
    if (!user) return null;
    return doc(db, "users", user.uid);
  }, [user]);
  useOrders(userDoc, addOrders);
}

export default OrdersListener;
