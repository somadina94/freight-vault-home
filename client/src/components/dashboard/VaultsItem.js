import classes from './VaultsItem.module.css';

const VaultsItem = (props) => {
  const status = props.status ? 'Secured' : 'Processing';

  const createdDate = new Date(props.depositDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const lastSubDate = new Date(props.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const expiryDate = new Date(props.endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const currentDate = new Date();
  const lastPaymentDate = new Date(props.endDate);
  const months =
    (currentDate.getFullYear() - lastPaymentDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    lastPaymentDate.getMonth();

  const debt = props.fee * months;

  return (
    <div className={classes.vault}>
      <h2>{props.name}</h2>
      <div className={classes.content}>
        <h4>Id</h4>
        <h4>{props.id}</h4>
      </div>
      <div className={classes.content}>
        <h4>Ounce</h4>
        <h4>{props.ounce.toFixed(2)}</h4>
      </div>
      <div className={classes.content}>
        <h4>Monthly Fee</h4>
        <h4>£{props.fee.toFixed(2)}</h4>
      </div>
      <div className={classes.content}>
        <h4>Date Secured</h4>
        <h4>{createdDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>Last Payment Date</h4>
        <h4>{lastSubDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>Payment Expiry Date</h4>
        <h4>{expiryDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>Debt</h4>
        <h4>£{debt.toFixed(2)}</h4>
      </div>
      <div className={classes.content}>
        <h4>Status</h4>
        <h4>{status}</h4>
      </div>
    </div>
  );
};

export default VaultsItem;
