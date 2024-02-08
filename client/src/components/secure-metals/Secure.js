import { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

import classes from './Secure.module.css';
import Item from './Item';
import { getMetals } from '../../api/api';
import Loading from '../UI/Loading';

const Secure = () => {
  const [metals, setMetals] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchMetals = async () => {
      const res = await getMetals();
      if (res.status === 'success') {
        setMetals(res.data.products);
        setIsloading(false);
      } else {
        setError(true);
        setIsloading(false);
      }
    };
    fetchMetals();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error">Something went wrong!</p>;
  }
  return (
    <Fragment>
      <Helmet>
        <title>Secure your Precious Metals</title>
        <meta
          name="description"
          content="Secure Gold, Silver and Platinum from Freight Vault Home"
        />
        <link rel="canonical" href="/secure-metals" />
      </Helmet>
      <section className={classes.container}>
        <h2>Secure Gold, Silver and Platinum at Freight Vault Home</h2>
        <div className={classes.secure}>
          {metals.map((el) => (
            <Item key={el._id} name={el.name} price={el.price} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Secure;
