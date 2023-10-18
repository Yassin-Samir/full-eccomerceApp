import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkOut as CheckoutAction } from "../redux/slices/cart";
import { CartSelector, UserSelector } from "../redux/selectors";

function CheckOut() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(CartSelector);
  const { LoggedIn, user } = useSelector(UserSelector);
  const navigate = useNavigate();
  useEffect(() => {
    !LoggedIn ? navigate("/") : null;
  }, [LoggedIn]);
  const handleCheckout = () => {
    dispatch(
      CheckoutAction({
        lineItems: cartItems.map((item) => ({
          price: item?.priceId,
          quantity: item?.quantity,
        })),
        email: user.email,
      })
    );
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <button className="shopNowBtn" onClick={handleCheckout}>
        CheckOut
      </button>
    </div>
  );
}

export default CheckOut;
