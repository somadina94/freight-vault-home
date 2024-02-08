import classes from './VaultsItem.module.css';

const VaultsItem = (props) => {
  const status = props.status ? 'Secured' : 'Processing';

  const createdDate = new Date(props.depositDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const lastSubDate = new Date(props.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const expiryDate = new Date(props.endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

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
        <h4>Deposited</h4>
        <h4>{createdDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>Last payment</h4>
        <h4>{lastSubDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>Payment Expiry</h4>
        <h4>{expiryDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>Status</h4>
        <h4>{status}</h4>
      </div>
    </div>
  );
};

export default VaultsItem;
