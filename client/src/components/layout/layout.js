import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../main/Header';
import Footer from '../main/Footer';
import Whatsapp from '../UI/Whatsapp';

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <Whatsapp />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
