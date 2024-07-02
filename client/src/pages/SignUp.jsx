import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik, Form } from "formik";
import { object, string } from "yup";
import { LogIn } from "../redux/slices/credentials";
import { UserSelector } from "../redux/selectors";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import WelcomeUser from "../components/WelcomeLogin";
import { doc, setDoc } from "firebase/firestore";
import FormikField from "../components/formikField";
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

    .matches(includeNumber, { message: "Please include at least 1 number" })
    .matches(specialCaseCharacter, {
      message: "Please add at least 1 special character",
    })
    .min(8, "Your password must exceed 8 characters"),
});
const textFieldStyles = {
  input: { color: "white" },
  label: { color: "rgba(138, 138, 138, 0.5)" },
};
function SignUp() {
  const { LoggedIn, user } = useSelector(UserSelector);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const dispatch = useDispatch();
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
      const { user } = userCredentials;
      await updateProfile(user, {
        displayName: name,
        photoURL: null,
      });
      const UserRef = doc(db, "users", user.uid);
      await setDoc(UserRef, {
        displayName: name,
        email: user.email,
        orders: [],
      });
      dispatch(
        LogIn({
          displayName: name,
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
            <FormikField
              name={"name"}
              type={"text"}
              label={"Name"}
              fullWidth
              sx={textFieldStyles}
            />
            <FormikField
              name={"email"}
              type={"email"}
              label={"Email"}
              fullWidth
              sx={textFieldStyles}
            />
            <FormikField
              name={"password"}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              label={"Password"}
              fullWidth={true}
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
