import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
  render () {
    return (
      <StripeCheckout
        amount={500}
        token={token=>console.log(token)}
        stripeKey={keys}
    )
  }
}

export default Payments;
