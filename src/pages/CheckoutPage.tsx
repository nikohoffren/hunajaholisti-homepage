import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from '../components/PaymentForm';

const stripePublishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '';
const stripePromise = loadStripe(stripePublishableKey);

const CheckoutPage: React.FC = () => {
  const handlePaymentSuccess = () => {
    console.log('Payment successful');
    // Perform any necessary actions after successful payment
  };

  return (
    <div className="container">
      <div className="py-20"></div>
      <h2 className="text-white text-2xl mb-4">Checkout Page</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
