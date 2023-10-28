import { Button, TextField } from "@mui/material";
import React from "react";

function SubscribeEmail() {
  return (
    <div className="subscriptionField">
      <h1>Subscribe to our emails</h1>
      <div>
        <TextField name="Email" type="text" variant="outlined" label="Email" />
        <Button variant="contained">Subscribe</Button>
      </div>
    </div>
  );
}

export default SubscribeEmail;
