import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Amplify, { Auth } from "aws-amplify";
import { useInput } from "./utils/forms";
import { Toast } from "./utils/notifications";
import { COGNITO } from "./configs/aws";
import { styled } from "@material-ui/core/styles";

const Field = styled(TextField)({
  margin: "10px 0",
});

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
    <Card style={{ width: 500, margin: "100px auto", padding: "40px" }}>
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
        <Field label="Name" {...bindName} />
        <Field label="Email" {...bindEmail} />
        <Field label="Phone" {...bindPhone} />
        <Field label="Company" {...bindCompany} />
        <Field label="Password" type="password" {...bindPassword} />
        <Field
          label="Confirm Password"
          type="password"
          {...bindConfirmPassword}
        />
        <Button variant="contained" color="primary" size="large" type="submit">
          Sign Up
        </Button>
      </form>
    </Card>
  );
};

export default App;
