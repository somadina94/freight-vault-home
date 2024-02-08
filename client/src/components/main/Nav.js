import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import { authActions } from '../../store/auth-slice';
import { logOut } from '../../api/api';
import AuthAlert from '../alerts/AuthAlert';
import classes from './Nav.module.css';

const Nav = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const setCookie = useCookies(['jwt'])[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);

  const logoutHandler = async () => {
    const res = await logOut();
    if (res.status === 'success') {
      navigate('login', { replace: true });
      setCookie('jwt', res.token);
      setTimeout(() => {
        dispatch(authActions.logout());
      }, 2000);
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
    } else {
      setAlertMsg('Something went wrong!');
      setAlertStatus(false);
      setShowAlert(true);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  return (
    <nav className={classes.nav}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      <NavLink
        to="about"
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        About Us
      </NavLink>
      <NavLink
        to="storage"
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        Storage
      </NavLink>
      <NavLink
        to="buy-metals"
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        Buy Metals
      </NavLink>
      <NavLink
        to="secure-metals"
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        Secure Metals
      </NavLink>
      <NavLink
        to="contact-us"
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        Contact Us
      </NavLink>
      {!isLoggedIn && (
        <NavLink
          to="login"
          className={(navData) => (navData.isActive ? classes.active : '')}
        >
          Sign In
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink
          to="create-account"
          className={(navData) => (navData.isActive ? classes.active : '')}
        >
          Sign Up
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          to="dashboard"
          className={(navData) => (navData.isActive ? classes.active : '')}
        >
          Dashboard
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          to="#"
          className={(navData) => (navData.isActive ? classes.active : '')}
          onClick={logoutHandler}
        >
          Sign Out
        </NavLink>
      )}
    </nav>
  );
};

export default Nav;
