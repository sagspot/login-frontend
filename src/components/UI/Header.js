import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/Sagspot.png';
import classes from './Header.module.css';

const Header = () => {
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
          <li>
            <NavLink activeClassName={classes.active} to="/update-profile">
              Update profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
