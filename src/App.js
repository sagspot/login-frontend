import { Route, Switch } from 'react-router';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/update-profile" component={UpdateProfile} />
      <Route path="/login" component={Login} />
      <Route path="/reset" component={ResetPassword} />
      <Route path="/register" component={Register} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default App;
