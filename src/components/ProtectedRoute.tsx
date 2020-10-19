import React from "react";
import { Auth } from "aws-amplify";
import { Route, Redirect } from "react-router-dom";

interface Props {
  component: any;
}
const ProtectedRoute: React.FC<Props> = ({ component }) => {
  const Component = component;

  const [isAuthenticated, setLoggedIn] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      let user = null;

      try {
        user = await Auth.currentAuthenticatedUser();
        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        setLoggedIn(false);
      }
    })();
  });

  return (
    <Route
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default ProtectedRoute;
