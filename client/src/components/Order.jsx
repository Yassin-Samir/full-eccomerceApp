import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { customJewelImgSelector } from "../redux/selectors";

function Order({ Items, orderId, Total }) {
  const Imgs = useSelector(customJewelImgSelector(Items[0].name));
  return (
    <Link to={`/orders/${orderId}`}>
      <div className="Order">
        <div className="OrderImg">
          <img src={Imgs[0]} alt="" />
        </div>
        <p>
          Your Order Item{Items.length > 1 ? "s" : ""}{" "}
          {Items.length > 1 ? "are" : "is"}{" "}
          {Items.map(({ name }) => name).join(",")}
        </p>
        <p>${Total}</p>
      </div>
    </Link>
  );
}

export default Order;
