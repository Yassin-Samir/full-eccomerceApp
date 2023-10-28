import { useState } from "react";
import { useSelector } from "react-redux";
import { Field, Formik, Form } from "formik";
import { object, string } from "yup";
import { UserSelector } from "../redux/selectors";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import WelcomeUser from "../components/WelcomeLogin";
const captialLettersRegex = /(?=.*[A-Z])/;
const specialCaseCharacter = /(?=.*[!@#$&*])/;
const includeNumber = /(?=.*[0-9])/;

const validationSchema = object({
  name: string().required("required"),
  email: string().email("Invalid Email").required("required"),
  password: string()
    .required("required")
    .matches(captialLettersRegex, {
      message: "Please add at least 1 capital letter",
    })
    .matches(specialCaseCharacter, {
      message: "Please add at least 1 special character",
    })
    .matches(includeNumber, { message: "Please include at lease 1 number" })
    .min(8, "Your password must exceed 8 charcterd"),
});
const textFieldStyles = {
  input: { color: "white" },
  label: { color: "rgba(138, 138, 138, 0.5)" },
};
function SignUp() {
  const { LoggedIn, user } = useSelector(UserSelector);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleSubmit = async (
    { email, password, name },
    { setErrors, setSubmitting }
  ) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const update = await updateProfile(userCredentials.user, {
        displayName: name,
        photoURL: null,
      });
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
          name: "",
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
              name={"name"}
              type={"text"}
              as={TextField}
              label={"Name"}
              variant={"outlined"}
              fullWidth={true}
              error={Boolean(errors.name) && Boolean(touched.name)}
              helperText={Boolean(touched.name) && errors.name}
              sx={textFieldStyles}
            />
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
              Sign Up
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <WelcomeUser user={user} />
  );
}

export default SignUp;
