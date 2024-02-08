import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBagShopping, FaHouseLock, FaKey } from 'react-icons/fa6';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { CgMenuGridO } from 'react-icons/cg';

import classes from './SubNav.module.css';

const SubNav = () => {
  const navRef = useRef();
  const navBtnRef = useRef();
  const [navBtnState, setNavBtnState] = useState(false);

  const navHander = () => {
    navRef.current.classList.toggle(classes.open);
    navRef.current.classList.toggle(classes.close);
    setNavBtnState((prevState) => !prevState);
  };

  const navBtnClasses = navBtnState
    ? `${classes.slider} ${classes.rotate}`
    : `${classes.slider}`;

  return (
    <nav className={`${classes.nav} ${classes.open}`} ref={navRef}>
      <CgMenuGridO
        className={navBtnClasses}
        onClick={navHander}
        ref={navBtnRef}
      />
      <NavLink
        to={`/dashboard/account`}
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        <MdOutlineManageAccounts className={classes.icon} />
        Dashboard
      </NavLink>
      <NavLink
        to={`orders`}
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        <FaBagShopping className={classes.icon} />
        Metal Orders
      </NavLink>
      <NavLink
        to={`vaults`}
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        <FaHouseLock className={classes.icon} />
        Metal Vaults
      </NavLink>
      <NavLink
        to={`update-password`}
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        <FaKey className={classes.icon} />
        Change Password
      </NavLink>
    </nav>
  );
};

export default SubNav;
