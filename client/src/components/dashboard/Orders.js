import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import classes from './Orders.module.css';
import { getOrders } from '../../api/api';
import Loading from '../UI/Loading';
import OrderItem from './OrderItem';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const { jwt } = useCookies(['jwt'])[0];

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders(jwt);
      if (res.status === 'success') {
        setOrders(res.data.orders);
        setIsloading(false);
      } else {
        setIsloading(false);
        setError(true);
      }
    };
    fetchOrders();
  }, [jwt]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error">Something went wrong!</p>;
  }
  return (
    <div className={classes.container}>
      <h2>List of Orders</h2>
      <div className={classes.orders}>
        {orders.map((el) => (
          <OrderItem
            key={el._id}
            id={el._id}
            name={el.name}
            price={el.price}
            ounce={el.ounce}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
