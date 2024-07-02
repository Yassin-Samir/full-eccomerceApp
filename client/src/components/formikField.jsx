import { TextField } from "@mui/material";
import { Field, useFormikContext } from "formik";
/**
 *
 * @param {{label:string,name:string,type:string} & import("@mui/material").TextFieldProps} param0
 * @returns {JSX.Element}
 */
function FormikField({ label, name, type = "text", ...props }) {
  const { errors, touched } = useFormikContext();
  return (
    <Field
      name={name}
      type={"text"}
      as={TextField}
      label={label || name}
      variant={"outlined"}
      error={Boolean(errors[name]) && Boolean(touched[name])}
      helperText={(Boolean(touched[name]) && errors[name]) || " "}
      {...props}
    />
  );
}

export default FormikField;
