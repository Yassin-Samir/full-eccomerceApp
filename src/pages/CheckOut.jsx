import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { checkOut as CheckoutAction } from "../redux/slices/cart";
import { CartSelector, UserSelector } from "../redux/selectors";
import { Box, TextField, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
const validationSchema = object({
  FirstName: string().required("required"),
  LastName: string().required("required"),
  Country: string().required("required"),
  streetAddress: string().required("required"),
  City: string().required("required"),
  ZipCode: string()
    .required("required")
    .matches(/^\d{5}(?:[-\s]\d{4})?$/, {
      message: "Please add a valid zip code",
    }),
});
const textFieldStyles = {
  input: { color: "white" },
  label: { color: "rgba(138, 138, 138, 0.5)" },
};
function CheckOut() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(CartSelector);
  const { LoggedIn, user } = useSelector(UserSelector);
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
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
      <Formik
        initialValues={{
          FirstName: "",
          LastName: "",
          Country: "",
          streetAddress: "",
          City: "",
          ZipCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid, touched, dirty, isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              margin: "0 auto",
              width: "90%",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Field
              name={"FirstName"}
              type={"text"}
              as={TextField}
              label={"FirstName"}
              variant={"outlined"}
              error={Boolean(errors.FirstName) && Boolean(touched.FirstName)}
              helperText={Boolean(touched.FirstName) && errors.FirstName}
              sx={textFieldStyles}
            />
            <Field
              name={"LastName"}
              type={"text"}
              as={TextField}
              label={"LastName"}
              variant={"outlined"}
              error={Boolean(errors.LastName) && Boolean(touched.LastName)}
              helperText={Boolean(touched.LastName) && errors.LastName}
              sx={textFieldStyles}
            />
            <Field
              name={"Country"}
              type={"text"}
              as={TextField}
              label={"Country"}
              variant={"outlined"}
              error={Boolean(errors.Country) && Boolean(touched.Country)}
              helperText={Boolean(touched.Country) && errors.Country}
              sx={textFieldStyles}
            />
            <Field
              name={"streetAddress"}
              type={"text"}
              as={TextField}
              label={"streetAddress"}
              variant={"outlined"}
              error={
                Boolean(errors.streetAddress) && Boolean(touched.streetAddress)
              }
              helperText={
                Boolean(touched.streetAddress) && errors.streetAddress
              }
              sx={textFieldStyles}
            />
            <Field
              name={"City"}
              type={"text"}
              as={TextField}
              label={"City"}
              variant={"outlined"}
              error={Boolean(errors.City) && Boolean(touched.City)}
              helperText={Boolean(touched.City) && errors.City}
              sx={textFieldStyles}
            />
            <Field
              name={"ZipCode"}
              type={"text"}
              as={TextField}
              label={"ZipCode"}
              variant={"outlined"}
              error={Boolean(errors.ZipCode) && Boolean(touched.ZipCode)}
              helperText={Boolean(touched.ZipCode) && errors.ZipCode}
              sx={textFieldStyles}
            />
            <Tooltip
              title={
                !LoggedIn
                  ? "Please Login first"
                  : !cartItems.length
                  ? "Please add Items in your cart"
                  : !isValid || !dirty
                  ? "Please Fill in the form"
                  : null
              }
              arrow
              placement="top"
              enterTouchDelay={0}
            >
              <Box
                component={"span"}
                sx={{
                  cursor: !LoggedIn ? "not-allowed" : "initial",
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!cartItems.length || !isValid || !dirty}
                  loading={isSubmitting}
                  sx={{ width: "100%" }}
                >
                  Checkout
                </LoadingButton>
              </Box>
            </Tooltip>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CheckOut;
