import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  customJewelPropsSelector,
  isItemInCartSelector,
  isAddingItemSelector,
  LoggedInSelector,
} from "../../redux/selectors";
import { addItem } from "../../redux/slices/cart";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StraightenIcon from "@mui/icons-material/Straighten";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { LoadingButton } from "@mui/lab";
function JewelProps({ jewelItem }) {
  const { jewel } = useParams();
  useEffect(() => {
    setCount(1);
  }, [jewel]);
  const { price, brand } = jewelItem;
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const isInCart = useSelector(isItemInCartSelector(jewel));
  const isAddingItem = useSelector(isAddingItemSelector);
  const isLoggedIn = useSelector(LoggedInSelector);
  const addItemHandler = () =>
    !isInCart &&
    dispatch(addItem({ ...jewelItem, quantity: count, name: jewel }));
  return (
    <div className="jewelProps">
      <span className="brand">{brand}</span>
      <h1 className="JewelName">{jewel}</h1>
      <p>${price}</p>
      <span>SHIPPING calculated at checkout</span>
      <Stack width={"30%"} rowGap={"0.5rem"}>
        <Typography variant="body2" color={"#8a8a8a8a"}>
          Quantity
        </Typography>
        <Stack
          direction={"row"}
          sx={{
            border: "1px solid",
            borderColor: "#8a8a8a8a",
            p: 1,
            alignItems: "center",
            justifyContent: "space-between",
            color: "#8a8a8a8a",
          }}
        >
          <RemoveOutlinedIcon
            onClick={() => count > 1 && setCount((prev) => prev - 1)}
            sx={{
              cursor: "pointer",
              color: "#8a8a8a8a",
            }}
          />
          <Box sx={{ color: "white" }}>{count}</Box>
          <AddOutlinedIcon
            sx={{
              cursor: "pointer",
              color: "#8a8a8a8a",
            }}
            onClick={() => setCount((prev) => prev + 1)}
          />
        </Stack>
      </Stack>
      <Tooltip
        title="please login first"
        disableHoverListener={isLoggedIn}
        arrow
        placement="top"
        enterTouchDelay={0}
      >
        <Box
          component={"span"}
          sx={{
            cursor: !isLoggedIn ? "not-allowed" : "initial",
          }}
        >
          <LoadingButton
            loading={isAddingItem}
            disableElevation
            fullWidth
            variant="contained"
            onClick={addItemHandler}
            disabled={!isLoggedIn}
          >
            {!isInCart ? (
              "Add to cart"
            ) : (
              <Fragment>
                <CheckCircleOutlineIcon
                  sx={{
                    mr: "1rem",
                  }}
                />
                Added
              </Fragment>
            )}
          </LoadingButton>
        </Box>
      </Tooltip>
      <div>
        <Menu
          Icon={BeachAccessIcon}
          header={"Materials"}
          text={
            "Built of Titanium Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          }
        />
        <Menu
          Icon={LocalShippingIcon}
          header={"Shipping & Returns"}
          text={`Free Shipping Outside Egypt
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}
        />
        <Menu
          Icon={StraightenIcon}
          header={"Dimensions"}
          text={`5 x 3.5 ( inches )
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}
        />
        <Menu
          Icon={FavoriteBorderIcon}
          header={"Care Instructions"}
          text={`Must not be placed in high tempratures.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}
        />
      </div>
    </div>
  );
}

function Menu({ header, Icon, text }) {
  return (
    <>
      <hr />
      <Accordion
        sx={{ background: "transparent", border: "none", boxShadow: "none" }}
      >
        <AccordionSummary
          sx={{
            "& .MuiAccordionSummary-content": {
              gap: "0.5rem",
              alignItems: "center",
            },
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Icon sx={{ color: "rgb(138, 138, 138)" }} />
          <Typography fontSize={"1.1rem"} color={"rgb(138, 138, 138)"}>
            {header}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color={"rgb(138, 138, 138)"}>
            {text}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default JewelProps;
