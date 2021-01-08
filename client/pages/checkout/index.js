import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import withAuth from '../../hoc/withAuth';
const promise = loadStripe("pk_test_51I5YXiJgUlScySzFTK5HgWxnx8tq6ldtkL8bfXo6BjdFnOCP0LHo3IB7z6okBRJS7kccsDV80oLoR9AnDNTEGt3v00ItR1OdyC");

const checkout = () => {
  return (
    <div>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

// export default checkout;

export default withAuth(checkout);