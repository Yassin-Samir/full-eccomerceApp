import { useSelector } from "react-redux";
import { UserSelector } from "../redux/selectors";
import Order from "../components/Order";
function Orders() {
  const { LoggedIn, orders } = useSelector(UserSelector);
  return (
    <>
      {LoggedIn ? (
        <div className="Orders">
          {orders &&
            orders.map((orderObj) => (
              <Order {...orderObj} key={orderObj.orderId} />
            ))}
        </div>
      ) : (
        <h1 style={{ marginTop: "50px", textAlign: "center" }}>
          Please Log In To View Your Orders
        </h1>
      )}
    </>
  );
}

export default Orders;
