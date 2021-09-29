import { Route, Switch } from 'react-router';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import ResetPasswordInitialized from './components/Auth/ResetPasswordInitialized';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';

const App = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <PrivateRoute component={Profile} path="/profile" />
      <PrivateRoute component={UpdateProfile} path="/update-profile" />
      <Route component={Login} path="/login" />
      <Route component={ResetPassword} path="/reset" />
      <Route component={ResetPasswordInitialized} path="/reset-initialized" />
      <Route component={Register} path="/register" />
      <Route component={NotFound} path="*" />
    </Switch>
  );
};

export default App;
