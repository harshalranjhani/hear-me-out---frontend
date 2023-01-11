import React from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";

const Welcome = (props) => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      {!user.display_name && (
        <Alert
          severity="error"
          sx={{ width: "50vh", margin: "auto", zIndex: 4 }}
        >
          <AlertTitle>Error</AlertTitle>
          Something went wrong —{" "}
          <h4>Either this is a connection issue or your token has expired.</h4>
          <br />
          <h4>
            It may also be possible that this account is not registered in the
            dashboard for this particular app. If the issue persists please
            send me a mail at{" "}
            <i>
              <a
                href="mailTo:ranjhaniharshal@gmail.com"
                style={{ color: "red" }}
              >
                ranjhaniharshal@gmail.com
              </a>
            </i>
          </h4>
          <br />
          <strong>Try logging out and logging back in!</strong>
        </Alert>
      )}
      <Typography variant="h5" p={3} width={500} sx={{ marginRight: 0 }}>
        Welcome, {user.display_name}
      </Typography>
    </>
  );
};

export default Welcome;
