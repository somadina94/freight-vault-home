import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import classes from './Account.module.css';
import AuthAlert from '../alerts/AuthAlert';
import Spinner from '../UI/Spinner';
import { block, unblock } from '../../api/api';

const Account = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const navigate = useNavigate();

  const dateOfB = new Date(props.dateOfB).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const blockHandler = async () => {
    setShowSpinner(true);

    const res = await block(props.id, jwt);

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
      setTimeout(() => {
        navigate('/users');
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
  const unblockHandler = async () => {
    setShowSpinner(true);

    const res = await unblock(props.id, jwt);

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
      setTimeout(() => {
        navigate('/users');
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
    <div className={classes.user}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {showSpinner && <Spinner />}
      <div className={classes.content}>
        <h4>Id</h4>
        <h4>{props.id}</h4>
      </div>
      <div className={classes.content}>
        <h4>Name</h4>
        <h4>{props.name}</h4>
      </div>
      <div className={classes.content}>
        <h4>Email</h4>
        <h4>{props.email}</h4>
      </div>
      <div className={classes.content}>
        <h4>Country</h4>
        <h4>{props.country}</h4>
      </div>
      <div className={classes.content}>
        <h4>Role</h4>
        <h4>{props.role}</h4>
      </div>
      <div className={classes.content}>
        <h4>Birth date</h4>
        <h4>{dateOfB}</h4>
      </div>
      <div className={classes.content}>
        <h4>Phone number</h4>
        <h4>{props.phone}</h4>
      </div>
      <div className={classes.content}>
        <h4>Address</h4>
        <h4>{props.address}</h4>
      </div>
      <div className={classes.content}>
        <h4>Status</h4>
        <h4>{props.status}</h4>
      </div>
      <div className={classes.action}>
        {props.status === 'Active' && (
          <button
            type="button"
            className={classes.active}
            onClick={blockHandler}
          >
            Block
          </button>
        )}
        {props.status === 'Blocked' && (
          <button
            type="button"
            className={classes.inactive}
            onClick={unblockHandler}
          >
            Unblock
          </button>
        )}
      </div>
    </div>
  );
};

export default Account;
