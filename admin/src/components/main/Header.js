import classes from './Header.module.css';
import Nav from './Nav';

const Header = () => {
  return (
    <header className={classes.header}>
      <h2>Freight Vault Home Admin</h2>
      <Nav />
    </header>
  );
};

export default Header;
