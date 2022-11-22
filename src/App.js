import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { RouterProvider } from "react-router-dom";

import { router } from "./Routes/routes";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);
function App() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router}></RouterProvider>
      </Elements>
    </div>
  );
}

export default App;
