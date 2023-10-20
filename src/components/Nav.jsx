import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartSelector, LoggedInSelector } from "../redux/selectors";
import { decrement, increment, remove } from "../redux/slices/cart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Badge, Box, Button, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
function Nav() {
  const isTablet = useMediaQuery("(min-width:950px)");
  return (
    <nav>
      {isTablet ? null : <TabletNav />}
      <div>
        <Link to={"/"}>
          <img
            src={
              "https://cdn.shopify.com/s/files/1/0658/5116/2929/files/jewellery-store-logo-1630986930.png"
            }
            alt="logo"
            loading="eager"
          />
        </Link>
      </div>
      {isTablet ? (
        <div className="center">
          <ul>
            <li>
              <Link to={"/shop"}>Best Selling</Link>
            </li>
            <li>
              <Link to={"/shop"}>New</Link>
            </li>
            <li>
              <Link to={"/shop"}>Popular</Link>
            </li>
            <li>
              <Link to={"/shop"}>Sale</Link>
            </li>
            <li>
              <Link to={"/shop"}>Viewall</Link>
            </li>
          </ul>
        </div>
      ) : null}
      <div className="end">
        <Link to={"/login"}>
          <svg fill="white">
            <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </Link>
        <Cart />
      </div>
    </nav>
  );
}
function TabletNav() {
  const [IsOpen, setIsOpen] = useState(false);
  const closeNav = () => setIsOpen(false);

  return (
    <>
      {!IsOpen ? (
        <MenuIcon
          sx={{
            cursor: "pointer",
            "&:hover": {
              fill: "rgb(232, 168, 110)",
              transform: "scale(1.1)",
            },
          }}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <CloseIcon
          sx={{
            cursor: "pointer",
            "&:hover": {
              fill: "rgb(232, 168, 110)",
              transform: "scale(1.1)",
            },
          }}
          onClick={closeNav}
        />
      )}
      <div className={`tabletNav ${IsOpen ? "Open" : ""}`}>
        <ul>
          <li>
            <Link onClick={closeNav} to={"/shop"}>
              Best Selling
            </Link>
          </li>
          <li>
            <Link onClick={closeNav} to={"/shop"}>
              New
            </Link>
          </li>
          <li>
            <Link onClick={closeNav} to={"/shop"}>
              Popular
            </Link>
          </li>
          <li>
            <Link onClick={closeNav} to={"/shop"}>
              Sale
            </Link>
          </li>
          <li>
            <Link onClick={closeNav} to={"/shop"}>
              Viewall
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`tabletNavBackdrop ${IsOpen ? "Open" : ""}`}
        onClick={closeNav}
      ></div>
    </>
  );
}

function Cart() {
  const { total, cartItems } = useSelector(CartSelector);
  const LoggedIn = useSelector(LoggedInSelector);
  const [Open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Badge
        badgeContent={cartItems.length > 0 ? cartItems.length : 0}
        color={"primary"}
      >
        <LocalMallOutlinedIcon
          sx={{
            fontSize: "1.7rem",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        />
      </Badge>
      <div className={`Cart ${Open ? "Open" : ""}`}>
        <div className="CartData">
          <p>Shopping Bag({cartItems?.length})</p>
          <CloseIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                fill: "rgb(232, 168, 110)",
                transform: "scale(1.1)",
              },
            }}
            onClick={() => setOpen(false)}
          />
        </div>
        {LoggedIn ? (
          <ul className="CartItems">
            {cartItems &&
              cartItems.map((Item, ind) => (
                <li key={ind + 1}>
                  <CartItem {...Item} />
                </li>
              ))}
          </ul>
        ) : (
          <p>Please Log In To View Your Items</p>
        )}
        <div className="CartData">
          <p>SUBTOTAL</p>
          <p>${total}</p>
        </div>
        {total ? (
          <Button
            variant="contained"
            onClick={() => {
              navigate("checkout");
              setOpen(false);
            }}
          >
            CHECKOUT
          </Button>
        ) : null}
      </div>
      <div
        className={`CartBackdrop ${Open ? "Open" : ""}`}
        onClick={() => setOpen(false)}
      ></div>
    </>
  );
}

function CartItem({ brand, price, quantity, name, src }) {
  const dispatch = useDispatch();
  return (
    <div className="cartItem">
      <div className="ImgContainer">
        <img src={src[0]} />
      </div>
      <div style={{ flexBasis: "40%", justifyContent: "space-around" }}>
        <h6>{name}</h6>
        <span>{brand}</span>
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
            onClick={() => dispatch(decrement({ name }))}
            sx={{
              cursor: "pointer",
              color: "#8a8a8a8a",
            }}
          />
          <Box sx={{ color: "white" }}>{quantity}</Box>
          <AddOutlinedIcon
            sx={{
              cursor: "pointer",
              color: "#8a8a8a8a",
            }}
            onClick={() => dispatch(increment({ name }))}
          />
        </Stack>
      </div>
      <div
        style={{
          justifyContent: "space-between",
          marginLeft: "auto",
        }}
      >
        <CloseIcon
          sx={{
            cursor: "pointer",
            "&:hover": {
              fill: "rgb(232, 168, 110)",
              transform: "scale(1.1)",
            },
          }}
          onClick={() => dispatch(remove({ name }))}
        />
        <p>{price}</p>
      </div>
    </div>
  );
}

export default Nav;
