import { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Account.module.css';
import Spinner from '../UI/Spinner';
import AuthAlert from '../alerts/AuthAlert';
import { updateMe } from '../../api/api';
import { authActions } from '../../store/auth-slice';

const Account = () => {
  const account = useSelector((state) => state.auth.user);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const dateOfBRef = useRef();
  const { jwt } = useCookies(['jwt'])[0];
  const dispatch = useDispatch();

  const updateHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value,
      dateOfB: dateOfBRef.current.value,
    };

    const res = await updateMe(data, jwt);

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      console.log('ran');
      setShowAlert(true);
      dispatch(authActions.refreshUser({ user: res.data.user }));
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
    <form className={classes.form} onSubmit={updateHandler}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {showSpinner && <Spinner />}
      <h2>Account details</h2>
      <div className={classes.group}>
        <label>Name</label>
        <input type="text" ref={nameRef} defaultValue={account.name} />
      </div>
      <div className={classes.group}>
        <label>Email</label>
        <input type="text" ref={emailRef} defaultValue={account.email} />
      </div>
      <div className={classes.group}>
        <label>Address</label>
        <input type="text" ref={addressRef} defaultValue={account.address} />
      </div>
      <div className={classes.group}>
        <label>Phone number</label>
        <input type="number" ref={phoneRef} defaultValue={account.phone} />
      </div>
      <div className={classes.group}>
        <label>Date of Birth</label>
        <input
          type="Date"
          ref={dateOfBRef}
          defaultValue={new Date(account.dateOfB).toISOString().split('T')[0]}
        />
      </div>
      <div className={classes.action}>
        <button type="submit">Update account</button>
      </div>
    </form>
  );
};

export default Account;
