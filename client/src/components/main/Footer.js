import classes from './Footer.module.css';

const Footer = () => {
  const date = new Date(Date.now()).getFullYear();
  return (
    <footer className={classes.footer}>
      <p>Copyright {date} Freight Vault Home</p>
    </footer>
  );
};

export default Footer;
