import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import classes from './Item.module.css';
import AuthAlert from '../alerts/AuthAlert';
import Spinner from '../UI/Spinner';
import { approveVault, deleteVault } from '../../api/api';

const Item = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];

  const endDate = new Date(props.endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const startDate = new Date(props.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const depositDate = new Date(props.depositDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const approveHandler = async () => {
    setShowSpinner(true);

    const res = await approveVault(props.id, jwt);

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
      setTimeout(() => {
        props.reload((prevState) => !prevState);
      }, 4000);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }
    setShowSpinner(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const deleteHandler = async () => {
    setShowSpinner(true);

    const res = await deleteVault(props.id, jwt);

    if (!res.status) {
      setAlertMsg(`Vault deleted successfully`);
      setAlertStatus(true);
      setShowAlert(true);
      setTimeout(() => {
        props.reload((prevState) => !prevState);
      }, 4000);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }
    setShowSpinner(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };
  return (
    <div className={classes.item}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {showSpinner && <Spinner />}
      <div className={classes.content}>
        <h4>Id</h4>
        <h4>{props.id}</h4>
      </div>
      <div className={classes.content}>
        <h4>name</h4>
        <h4>{props.name}</h4>
      </div>
      <div className={classes.content}>
        <h4>User Id</h4>
        <h4>{props.userId}</h4>
      </div>
      <div className={classes.content}>
        <h4>Deposit Date</h4>
        <h4>{depositDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>Last Sub Date</h4>
        <h4>{startDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>End Date</h4>
        <h4>{endDate}</h4>
      </div>
      <div className={classes.content}>
        <h4>Ounce</h4>
        <h4>{props.ounce}</h4>
      </div>
      <div className={classes.content}>
        <h4>Monthly fee</h4>
        <h4>£{props.fee.toFixed(2)}</h4>
      </div>
      <div className={classes.content}>
        <h4>Status</h4>
        <h4>{props.status ? 'Approved' : 'Pending'}</h4>
      </div>
      <div className={classes.action}>
        <Link to={`/vault/${props.id}`}>Update</Link>
        {!props.status && (
          <button
            type="button"
            className={classes.approve}
            onClick={approveHandler}
          >
            Approve
          </button>
        )}
        <button
          type="button"
          className={classes.delete}
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
