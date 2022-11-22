import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return;
  }

  const card = elements.getElement(CardElement);

  if (card == null) {
    return;
  }

  const { error, paymentMethod } = stripe.createPaymentMethod({
    type: "card",
    card,
  });

  if (error) {
    console.log(error);
  } else {
    console.log(paymentMethod);
  }

  return (
    <CardElement
      options={{
        style: {
          base: {
            fontSize: "16px",
            color: "#424770",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#9e2146",
          },
        },
      }}
    />
  );
};

export default CheckoutForm;
