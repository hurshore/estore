import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from '../../context/cartContext';
import classes from './CheckoutForm.module.css';
import Link from 'next/link';

const checkoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const cartState = useCart();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:5000/api/payment/create-payment-intent", {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem('auth-token')
        }
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Open Sans, Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  return (
    <div className={classes.checkoutForm}>
      <div className={classes.paymentDetails}>
        <h3>Please enter your payment details:</h3>
        <div className={classes.cards}>
          <h3>CREDIT CARD</h3>
          <p>Test using these Stripe test credit card numbers with any CVC, postal code, and expiration date in the future:</p>
          <ul>
            <li>4242 4242 4242 4242 (payment succeeds)</li>
            <li>4000 0027 6000 3184 (requires authentication, will trigger a pop-up)</li>
            <li>4000 0000 0000 9995 (will decline with a decline code of insufficient funds)</li>
          </ul>
        </div>
       
      </div>

      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">
            {processing ? (
              <div className={classes.spinner} id="spinner"></div>
            ) : (
              `Pay $${cartState.total}`
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div id="card-error" className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? classes.resultMessage : `${classes.resultMessage} ${classes.hidden}`}>
          Payment succeeded, thanks for doing business with us.
          Back to <Link href="/shop"><a>shop</a></Link>
        </p>
      </form>
    </div>
  );
}

export default checkoutForm;