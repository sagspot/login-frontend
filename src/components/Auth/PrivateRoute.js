import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.isAuth);
  const isAunthenticated = () => {
    if (auth) return true;
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
