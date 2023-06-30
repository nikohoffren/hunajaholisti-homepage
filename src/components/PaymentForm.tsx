import React, { useState } from "react";
import {
  loadStripe,
  Stripe,
  StripeCardElementChangeEvent,
} from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePublishableKey =
  "pk_test_51Mh61wJWNUHUmtvGf80SxOw5CUErnvAdrRMp2ip8I1rfwQnAht2y6AGDsCp3TzbQd7ZX94pgGMQ1saWWe3qBuFjZ00uwXzdsPK"; // Use your test publishable key here
const stripePromise = loadStripe(stripePublishableKey) as Promise<Stripe | null>;

interface PaymentFormProps {
  onPaymentSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    console.log("Processing payment...");

    // Validate form fields
    const { complete, error } = cardElement as unknown as StripeCardElementChangeEvent;
    if (!complete || error) {
      setErrorMessage("Please fill in all card details correctly.");
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (stripeError) {
      console.log("Payment error:", stripeError);
      return;
    }

    console.log("Payment successful!");

    // Make a POST request to your serverless function to process the payment
    try {
      const response = await axios.post("/.netlify/functions/payment", {
        paymentMethodId: paymentMethod.id,
      });

      console.log("Server response:", response.data);

      // Call the `onPaymentSuccess` callback
      onPaymentSuccess();
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handlePayment} className="p-4 bg-gray-800 text-white">
        <CardElement
          options={{ style: { base: { color: "#fff" } } }}
          className="p-3 bg-gray-700"
        />
        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Pay with Stripe
        </button>
      </form>
    </Elements>
  );
};

export default PaymentForm;
