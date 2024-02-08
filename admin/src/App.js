import { Fragment } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  // Navigate,
} from 'react-router-dom';

import Layout from './components/layout/Layout';
import ErrorModal from './components/UI/ErrorModal';
import Home from './components/main/Home';
import Login from './components/auth/Login';
import Accounts from './components/accounts/Accounts';
import Vaults from './components/vaults/Vaults';
import SubForm from './components/vaults/SubForm';
import Orders from './components/orders/Orders';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorModal />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="users" element={<Accounts />} />
      <Route path="vaults" element={<Vaults />} />
      <Route path="vault/:id" element={<SubForm />} />
      <Route path="orders" element={<Orders />} />
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
