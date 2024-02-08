import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import classes from './Orders.module.css';
import Loading from '../UI/Loading';
import { getOrders } from '../../api/api';
import Item from './Item';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders(jwt);
      if (res.status === 'success') {
        setOrders(res.data.orders);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [jwt, reload]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error">Something went wrong!</p>;
  }
  return (
    <section className={classes.container}>
      <h2>List of Purchases</h2>
      <div className={classes.orders}>
        {orders.map((el) => (
          <Item
            key={el._id}
            id={el._id}
            name={el.name}
            ounce={el.ounce}
            userId={el.user}
            price={el.price}
            status={el.status}
            reload={setReload}
            createdAt={el.createdAt}
          />
        ))}
      </div>
    </section>
  );
};

export default Orders;
