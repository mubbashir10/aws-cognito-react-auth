import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Amplify, { Auth } from "aws-amplify";
import { useInput } from "./utils/forms";
import { Toast } from "./utils/notifs";
import { COGNITO } from "./configs/aws";

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

const App: React.FC = () => {
  const { value: name, bind: bindName } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: phone, bind: bindPhone } = useInput("");
  const { value: company, bind: bindCompany } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");

  const handleSignUp = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    try {
      const { user } = await Auth.signUp({
        username: email,
        password: confirmPassword,
        attributes: {
          email,
          name,
          phone_number: phone,
          "custom:company": company,
        },
      });
      console.log(user);
      user && Toast("Success!!", "Signup was successful", "success");
    } catch (error) {
      console.error(error);
      Toast("Error!!", error.message, "danger");
    }
  };

  return (
    <div style={{ width: 500, margin: "100px auto" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onSubmit={handleSignUp}
      >
        <h1 style={{ fontSize: "22px", fontWeight: 800 }}>
          {" "}
          New Account Registration
        </h1>
        <TextField
          style={{ margin: "10px 0" }}
          label="Name"
          variant="outlined"
          {...bindName}
        />
        <TextField
          style={{ margin: "10px 0" }}
          label="Email"
          variant="outlined"
          {...bindEmail}
        />
        <TextField
          style={{ margin: "10px 0" }}
          label="Phone"
          variant="outlined"
          {...bindPhone}
        />
        <TextField
          style={{ margin: "10px 0" }}
          label="Company"
          variant="outlined"
          {...bindCompany}
        />
        <TextField
          style={{ margin: "10px 0" }}
          label="Password"
          variant="outlined"
          type="password"
          {...bindPassword}
        />
        <TextField
          style={{ margin: "10px 0" }}
          label="Confirm Password"
          variant="outlined"
          type="password"
          {...bindConfirmPassword}
        />
        <Button variant="contained" color="primary" size="large" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default App;
