import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import SubNav from '../main/SubNav';

const Dashboard = () => {
  return (
    <Fragment>
      <aside>
        <SubNav />
      </aside>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Dashboard;
