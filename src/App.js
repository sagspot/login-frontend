import { Redirect, Route, Switch } from 'react-router';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';

const App = () => {
  return (
    <Switch>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/update-profile">
        <UpdateProfile />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/reset">
        <ResetPassword />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="*">
        <Redirect to="/profile" />
      </Route>
    </Switch>
  );
};

export default App;
