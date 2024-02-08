import { useState } from 'react';
import { useCookies } from 'react-cookie';

import classes from './Item.module.css';
import AuthAlert from '../alerts/AuthAlert';
import Spinner from '../UI/Spinner';
import { approveOrder, deleteOrder } from '../../api/api';

const Item = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];

  const createdAt = new Date(props.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const approveHandler = async () => {
    setShowSpinner(true);

    const res = await approveOrder(props.id, jwt);

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

    const res = await deleteOrder(props.id, jwt);

    if (!res.status) {
      setAlertMsg(`Order deleted successfully`);
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
        <h4>Ounce</h4>
        <h4>{props.ounce}</h4>
      </div>
      <div className={classes.content}>
        <h4>Date</h4>
        <h4>{createdAt}</h4>
      </div>
      <div className={classes.content}>
        <h4>Price</h4>
        <h4>£{props.price.toFixed(2)}</h4>
      </div>
      <div className={classes.content}>
        <h4>Status</h4>
        <h4>{props.status ? 'Approved' : 'Pending'}</h4>
      </div>
      <div className={classes.action}>
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
