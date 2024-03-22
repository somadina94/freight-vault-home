import { useState, useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet-async';

import classes from './Vaults.module.css';
import { getVaults } from '../../api/api';
import Loading from '../UI/Loading';
import VaultsItem from './VaultsItem';

const Vaults = () => {
  const [vaults, setVaults] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const { jwt } = useCookies(['jwt'])[0];

  useEffect(() => {
    const fetchVaults = async () => {
      const res = await getVaults(jwt);
      if (res.status === 'success') {
        setVaults(res.data.vaults);
        setIsloading(false);
      } else {
        setIsloading(false);
        setError(true);
      }
    };
    fetchVaults();
  }, [jwt]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error">Something went wrong!</p>;
  }
  return (
    <Fragment>
      <Helmet>
        <title>Vaults</title>
        <meta name="description" content="List of vaults secured" />
        <link rel="canonical" href="/dashboard/vaults" />
      </Helmet>
      <div className={classes.container}>
        <h2>List of Vaults</h2>
        <div className={classes.vaults}>
          {vaults.map((el) => (
            <VaultsItem
              key={el._id}
              id={el._id}
              name={el.name}
              fee={el.fee}
              ounce={el.ounce}
              startDate={el.startDate}
              endDate={el.endDate}
              depositDate={el.depositDate}
              status={el.status}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Vaults;
