import { Redirect, Route, Switch } from 'react-router';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';

const App = () => {
  return (
    <Switch>
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/update-profile" component={UpdateProfile} />
      <Route path="/login" component={Login} />
      <Route path="/reset" component={ResetPassword} />
      <Route path="/register" component={Register} />
      <Route path="/" exact>
        <Redirect to="/profile" />
      </Route>
      <Route path="*">
        <Redirect to="/profile" />
      </Route>
    </Switch>
  );
};

export default App;
