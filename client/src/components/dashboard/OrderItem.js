import classes from './OrderItem.module.css';

const OrderItem = (props) => {
  const status = props.status ? 'Delivered' : 'Processing';
  return (
    <div className={classes.order}>
      <h2>{props.name}</h2>
      <div className={classes.content}>
        <h4>Id</h4>
        <h4>{props.id}</h4>
      </div>
      <div className={classes.content}>
        <h4>Price</h4>
        <h4>£{props.price.toFixed(2)}</h4>
      </div>
      <div className={classes.content}>
        <h4>Ounce</h4>
        <h4>{props.ounce.toFixed(2)}</h4>
      </div>
      <div className={classes.content}>
        <h4>Status</h4>
        <h4>{status}</h4>
      </div>
    </div>
  );
};

export default OrderItem;
