import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const AuthToken = useSelector((state) => state.auth.AuthToken);
  const isAunthenticated = () => {
    if (AuthToken) return true;
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAunthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
