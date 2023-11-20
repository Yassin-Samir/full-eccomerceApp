import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import { object, string } from "yup";
import { UserSelector } from "../redux/selectors";
import { LogIn } from "../redux/slices/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import WelcomeUser from "../components/WelcomeLogin";
const validationSchema = object({
  email: string().email("Invalid Email").required("required"),
  password: string().required("required"),
});
const textFieldStyles = {
  input: { color: "white" },
  label: { color: "rgba(138, 138, 138, 0.5)" },
};
function Login() {
  const { LoggedIn, user } = useSelector(UserSelector);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleSubmit = async (
    { email, password },
    { setErrors, setSubmitting }
  ) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredentials;
      dispatch(
        LogIn({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        })
      );
    } catch (error) {
      console.log(error);
      const shortenedError = error.code.substring(5, error.code.length);
      setErrors({ email: shortenedError, password: shortenedError });
    } finally {
      setSubmitting(false);
    }
  };

  return !LoggedIn ? (
    <div className="SignForm">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, isValid, touched, dirty, isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Field
              name={"email"}
              type={"email"}
              as={TextField}
              label={"Email"}
              variant={"outlined"}
              fullWidth={true}
              error={Boolean(errors.email) && Boolean(touched.email)}
              helperText={Boolean(touched.email) && errors.email}
              sx={textFieldStyles}
            />
            <Field
              name={"password"}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              as={TextField}
              label={"Password"}
              variant={"outlined"}
              fullWidth={true}
              error={Boolean(errors.password) && Boolean(touched.password)}
              helperText={Boolean(touched.password) && errors.password}
              sx={textFieldStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!isValid || !dirty}
              loading={isSubmitting}
            >
              Login
            </LoadingButton>
          </Form>
        )}
      </Formik>
      <Link
        style={{ color: "rgb(138, 138, 138)", fontSize: "1rem" }}
        to={"/signUp"}
      >
        Sign Up
      </Link>
    </div>
  ) : (
    <WelcomeUser user={user} />
  );
}

export default Login;
