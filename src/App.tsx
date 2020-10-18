import React from "react";
import Card from "@material-ui/core/Card";
import Amplify from "aws-amplify";
import Signup from "./components/Signup";
import { COGNITO } from "./configs/aws";

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

const App: React.FC = () => {
  return (
    <Card style={{ width: 500, margin: "100px auto", padding: "40px" }}>
      <Signup />
    </Card>
  );
};

export default App;
