import { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Item.module.css';
import { buyMetals } from '../../api/api';
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

  const buyHandler = async () => {
    setShowSpinner(true);

    const data = {
      product: props.name,
      ounce: amount.replace(/,/g, ''),
    };

    const res = await buyMetals(data, jwt);

    if (res.status === 'success') {
      setAlertMsg(res.message);
      setAlertStatus(true);
      setShowAlert(true);
      setTimeout(() => {
        navigate('/dashboard/orders');
      }, 8000);
    } else {
      setAlertMsg(res.message);
      setAlertStatus(false);
      setShowAlert(true);
    }
    setShowSpinner(false);
    setAmount(0.0);
    setTimeout(() => {
      setShowAlert(false);
    }, 8000);
  };

  const stringAmount = JSON.stringify(amount);
  const fmtAmount = stringAmount.replace(/,/g, '');

  return (
    <div className={classes.item}>
      {showAlert && <AuthAlert message={alertMsg} status={alertStatus} />}
      {showSpinner && <Spinner />}

      <div className={classes.photo}>
        <img src={props.image} alt="product" />
      </div>
      <div className={classes.price}>
        <h4>PRICE:</h4>
        <h4>£{props.price.toFixed(2)}</h4>
      </div>
      <div className={classes.form}>
        <label>Quantity</label>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          ref={amountRef}
        />
      </div>
      <div className={classes.total}>
        <h4>Total:</h4>
        <h4>£{(JSON.parse(fmtAmount) * props.price).toFixed(2)}</h4>
      </div>
      <button
        type="button"
        onClick={() => (isLoggedIn ? buyHandler() : navigate('/login'))}
      >
        Place Order
      </button>
    </div>
  );
};

export default Item;
