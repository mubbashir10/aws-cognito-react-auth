import React from "react";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import { useInput } from "./../utils/forms";
import { Toast } from "./../utils/notifications";
import { Auth } from "aws-amplify";
import Button from "@material-ui/core/Button";

const Field = styled(TextField)({
  margin: "10px 0",
});

const Signup: React.FC = () => {
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
  );
};

export default Signup;
