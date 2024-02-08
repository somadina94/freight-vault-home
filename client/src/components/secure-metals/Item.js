import { useState, useRef } from 'react';
import { PiLockKey } from 'react-icons/pi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Item.module.css';
import { secureMetals } from '../../api/api';
import Spinner from '../UI/Spinner';
import AuthAlert from '../alerts/AuthAlert';

const Item = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [amount, setAmount] = useState('0.00');
  const amountRef = useRef();
  const { jwt } = useCookies(['jwt'])[0];
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleAmountChange = (e) => {
    const enteredValue = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters

    // Ensure the decimal part never exceeds 2 digits
    const decimalPart = enteredValue.slice(-2);
    const integerPart = enteredValue.slice(0, -2).replace(/^0+/, ''); // Remove leading zeros

    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );

    const formattedValue = `${
      formattedIntegerPart.length === 0 ? '0' : formattedIntegerPart
    }.${decimalPart}`;

    setAmount(formattedValue);

    // Set caret position to the end
    if (amountRef.current) {
      amountRef.current.setSelectionRange(
        formattedValue.length,
        formattedValue.length
      );
    }
  };

  const secureHandler = async () => {
    setShowSpinner(true);

    const data = {
      name: props.name,
      ounce: amount.replace(/,/g, ''),
    };

    const res = await secureMetals(data, jwt);

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
      setTimeout(() => {
        navigate('/dashboard/vaults');
      }, 8000);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }
    setShowSpinner(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 8000);
  };
  return (
    <div className={classes.item}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {showSpinner && <Spinner />}
      <h2>{props.name} Vault</h2>
      <PiLockKey className={classes.icon} />
      <div className={classes.fee}>
        <h4>Monthly fee</h4>
        <h4>1%</h4>
      </div>
      <form className={classes.form}>
        <label>Ounce</label>
        <input type="text" value={amount} onChange={handleAmountChange} />
      </form>
      <button
        type="button"
        onClick={() => (isLoggedIn ? secureHandler() : navigate('/login'))}
      >
        Secure Vault
      </button>
    </div>
  );
};

export default Item;
