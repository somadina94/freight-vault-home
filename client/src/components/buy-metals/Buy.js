import { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

import classes from './Buy.module.css';
import gold from '../../images/gold.png';
import silver from '../../images/silver.png';
import platinum from '../../images/platinum.png';
import Item from './Item';
import { getMetals } from '../../api/api';
import Loading from '../UI/Loading';

const Buy = () => {
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
        <title>Buy Precious Metals</title>
        <meta
          name="description"
          content="Buy Gold, Silver and Platinum from Freight Vault Home"
        />
        <link rel="canonical" href="/buy-metals" />
      </Helmet>
      <section className={classes.container}>
        <h2>Buy Gold, Silver and Platinum from Freight Vault Home</h2>
        <section className={classes.buy}>
          {metals.map((el) => (
            <Item
              key={el._id}
              image={
                el.name === 'Gold'
                  ? gold
                  : el.name === 'Silver'
                  ? silver
                  : el.name === 'Platinum'
                  ? platinum
                  : ''
              }
              price={el.price}
              name={el.name}
            />
          ))}
        </section>
      </section>
    </Fragment>
  );
};

export default Buy;
