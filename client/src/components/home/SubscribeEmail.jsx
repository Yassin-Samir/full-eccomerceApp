import { Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";

function SubscribeEmail() {
  const [Email, setEmail] = useState("");
  const [Loading, setLoading] = useState();
  return (
    <div className="subscriptionField">
      <h1>Subscribe to our emails</h1>
      <div>
        <TextField
          name="Email"
          value={Email}
          onChange={({ target: { value } }) => setEmail(value)}
          type="text"
          variant="outlined"
          label="Email"
          disabled={Loading}
        />
        <LoadingButton
          variant="contained"
          loading={Loading}
          onClick={async () => {
            setLoading(true);
            await new Promise((res, rej) => setTimeout(res, 1500));
            setLoading(false);
            setEmail("");
          }}
        >
          Subscribe
        </LoadingButton>
      </div>
    </div>
  );
}

export default SubscribeEmail;
