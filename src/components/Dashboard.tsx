import React from "react";
import Button from "@material-ui/core/Button";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Toast } from "./../utils/notifications";
import { Auth } from "aws-amplify";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const goToLinkedIn = () => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = "https://www.linkedin.com/in/mubbashir10/";
    a.click();
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      Toast("Success!!", "Logged out successfully!", "success");
      history.push("/signin");
    } catch (error) {
      Toast("Error!!", error.message, "danger");
    }
  };

  return (
    <>
      <LockIcon /> <p>This is a private (auth protected) page. </p>
      <p style={{ fontSize: 12, marginBottom: "20px" }}>
        Thanks for following along, happy coding!{" "}
      </p>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "20px" }}
        onClick={goToLinkedIn}
      >
        <LinkedInIcon /> My LinkedIn Profile
      </Button>
      <Button variant="contained" color="default" onClick={handleLogout}>
        <ExitToAppIcon /> Logout
      </Button>
    </>
  );
};

export default Dashboard;
