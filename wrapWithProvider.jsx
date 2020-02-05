import React from "react";
import { Provider } from "react-redux";
import { StripeProvider } from "react-stripe-elements";

import createStore from "./src/state/store/createStore";

// eslint-disable-next-line react/display-name,react/prop-types
const wrapWithProvider = ({ element }) => {
  const store = createStore();

  return (
    <Provider store={store}>
      <StripeProvider apiKey="pk_test_3Rqy4w6tOumVTXVAEXg3qAve008RC0XO60">
        {element}
      </StripeProvider>
    </Provider>
  );
};

export default wrapWithProvider;
