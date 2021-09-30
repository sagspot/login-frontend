import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logo from '../../assets/images/Sagspot.png';
import classes from './Header.module.css';
import { authActions } from '../store/auth-slice';

const Header = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem('user');
  };

  return (
    <header className={classes.header}>
      <div className="logo">
        <img className={classes.logo} src={logo} alt="Sagspot logo" />
      </div>

      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/profile">
              Profile
            </NavLink>
          </li>
        </ul>
        <button onClick={logoutHandler}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
