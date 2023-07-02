const dotenv = require('dotenv');
const stripe = require('stripe');

dotenv.config();

const stripeSecretKey = process.env.VITE_STRIPE_SECRET_KEY;
const stripeInstance = stripe(stripeSecretKey);

exports.handler = async (event) => {
  try {
    const { paymentMethodId, amount } = JSON.parse(event.body);

    // Create a charge using the payment method and the specified amount
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Handle successful payment
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
    };
  } catch (error) {
    // Handle payment error
    console.log('Payment error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Payment failed' }),
    };
  }
};
