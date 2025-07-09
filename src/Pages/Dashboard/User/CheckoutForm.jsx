import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import './CheckoutForm.css'

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcess, setPaymentProcess] = useState(false);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
setPaymentProcess(true)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  fontFamily: "Arial, sans-serif",
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
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || paymentProcess}
        className="w-full bg-[#00705c] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#005e4e] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Pay $25
      </button>
    </form>
  );
};

export default CheckoutForm;
