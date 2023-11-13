import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoggedInSelector, orderSelector } from "../redux/selectors";
import Typography from "@mui/material/Typography";

function Order() {
  const { orderId } = useParams();
  const LoggedIn = useSelector(LoggedInSelector);
  const order = useSelector(orderSelector(orderId));
  return (
    <>
      {LoggedIn && order ? (
        <div>{JSON.stringify(order)}</div>
      ) : (
        <Typography
          component={"h1"}
          color={"text.primary"}
          fontSize={"3rem"}
          sx={{ marginTop: "50px", textAlign: "center" }}
        >
          404
        </Typography>
      )}
    </>
  );
}

export default Order;
