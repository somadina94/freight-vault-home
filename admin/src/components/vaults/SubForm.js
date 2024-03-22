import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import classes from './SubForm.module.css';
import AuthAlert from '../alerts/AuthAlert';
import Spinner from '../UI/Spinner';
import Loading from '../UI/Loading';
import { getOneVault, UpdateVault } from '../../api/api';

const SubForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [vault, setVault] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { jwt } = useCookies(['jwt'])[0];
  const params = useParams();
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const depositDateRef = useRef(null);

  useEffect(() => {
    const FetchVault = async () => {
      const res = await getOneVault(params.id, jwt);
      if (res.status === 'success') {
        setVault(res.data.vault);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    };
    FetchVault();
  }, [jwt, params.id]);

  const updateHandler = async (e) => {
    e.preventDefault();
    setShowSpinner(true);

    const data = {
      depositDate: depositDateRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
    };

    const res = await UpdateVault(data, params.id, jwt);

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error">Something went wrong!</p>;
  }
  return (
    <form className={classes.form} onSubmit={updateHandler}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {showSpinner && <Spinner />}
      <h2>Update subscription dates</h2>
      <div className={classes.group}>
        <label>Date Secured</label>
        <input
          type="date"
          ref={depositDateRef}
          defaultValue={new Date(vault.depositDate).toISOString().split('T')[0]}
        />
      </div>
      <div className={classes.group}>
        <label>Last sub date</label>
        <input
          type="date"
          ref={startDateRef}
          defaultValue={new Date(vault.startDate).toISOString().split('T')[0]}
        />
      </div>
      <div className={classes.group}>
        <label>Sub end date</label>
        <input
          type="date"
          defaultValue={new Date(vault.endDate).toISOString().split('T')[0]}
          ref={endDateRef}
        />
      </div>
      <div className={classes.action}>
        <button type="submit">Update</button>
      </div>
    </form>
  );
};

export default SubForm;
