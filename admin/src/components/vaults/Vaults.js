import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import classes from './Vaults.module.css';
import Loading from '../UI/Loading';
import { getVaults } from '../../api/api';
import Item from './Item';

const Vaults = () => {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchVaults = async () => {
      const res = await getVaults(jwt);
      if (res.status === 'success') {
        setVaults(res.data.vaults);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    };
    fetchVaults();
  }, [jwt, reload]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error">Something went wrong!</p>;
  }
  return (
    <section className={classes.container}>
      <h2>List of Vaults</h2>
      <div className={classes.vaults}>
        {vaults.map((el) => (
          <Item
            key={el._id}
            id={el._id}
            name={el.name}
            ounce={el.ounce}
            depositDate={el.depositDate}
            startDate={el.startDate}
            endDate={el.endDate}
            userId={el.user}
            fee={el.fee}
            status={el.status}
            reload={setReload}
          />
        ))}
      </div>
    </section>
  );
};

export default Vaults;
