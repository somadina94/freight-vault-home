import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import classes from './Accounts.module.css';
import Loading from '../UI/Loading';
import { getUsers } from '../../api/api';
import Account from './Account';

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [reload, setReload] = useState('false');
  const { jwt } = useCookies(['jwt'])[0];

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers(jwt);
      if (res.status === 'success') {
        setUsers(res.data.users);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [jwt, reload]);

  if (isloading) {
    return <Loading />;
  }

  if (error) {
    return <p className={classes.error}>Something went wrong!</p>;
  }
  return (
    <section className={classes.container}>
      <h2>List of all users</h2>
      <div className={classes.users}>
        {users.map((el) => (
          <Account
            key={el._id}
            id={el._id}
            name={el.name}
            email={el.email}
            role={el.role}
            dateOfB={el.dateOfB}
            status={el.status ? 'Active' : 'Blocked'}
            phone={el.phone}
            country={el.country}
            address={el.address}
            reload={setReload}
          />
        ))}
      </div>
    </section>
  );
};

export default Accounts;
