import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { CgMenuGridO } from 'react-icons/cg';

import classes from './Header.module.css';
import logo from '../../images/home.png';
import Nav from './Nav';

const Header = () => {
  const navRef = useRef();

  const toggleMenuHandler = () => {
    navRef.current.classList.toggle(classes.display);
  };
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        <img src={logo} alt="logo" />
      </Link>
      <CgMenuGridO className={classes.menu} onClick={toggleMenuHandler} />
      <div className={classes.nav} ref={navRef}>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
