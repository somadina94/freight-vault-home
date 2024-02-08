import { Fragment } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  // Navigate,
} from 'react-router-dom';
// import { Transition } from 'react-transition-group';

import Layout from './components/layout/layout';
import Homepage from './components/pages/Home';
import Storage from './components/body/Storage';
import About from './components/body/About';
import Create from './components/auth/Create';
import Buy from './components/buy-metals/Buy';
import Secure from './components/secure-metals/Secure';
import Dashboard from './components/layout/Dashboard';
import Account from './components/dashboard/Account';
import Orders from './components/dashboard/Orders';
import Vaults from './components/dashboard/Vaults';
import Password from './components/dashboard/Password';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ContactUs from './components/body/ContactUs';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="storage" element={<Storage />} />
      <Route path="about" element={<About />} />
      <Route path="create-account" element={<Create />} />
      <Route path="buy-metals" element={<Buy />} />
      <Route path="secure-metals" element={<Secure />} />
      <Route path="login" element={<Login />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="resetPassword/:token" element={<ResetPassword />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Account />} />
        <Route path="account" element={<Account />} />
        <Route path="orders" element={<Orders />} />
        <Route path="vaults" element={<Vaults />} />
        <Route path="update-password" element={<Password />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
