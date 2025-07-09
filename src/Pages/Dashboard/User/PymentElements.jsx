import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51Re6W0KHEkXvw65FCKsnPFet2aLc5998AoE9INx55D3rI2z8RNpqTV2cSLqNdRdRi77LHnGngevV78OZSHerYoRE009exgQfPL"
);
const PymentElements = ({ roleRequestData }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm roleRequestData={roleRequestData} />
    </Elements>
  );
};

export default PymentElements;
