import logo from "./logo.svg";
import "./App.css";
import { useHydrogenPayment } from "hydrogen-reactjs";

function App() {
  const options = {
    public_key: "SBTESTPUBK_t4G16GCA1O51AV0Va3PPretaisXubSw1",
    amount: 100,
    tranref: new Date().getTime(),
    currency: "NGN",
    email: "test@mail.com",
    full_name: "",
    mobile_no: "",
    description: "",
    tokenize: false,
    planId: "",
    customization: {
      theme: {
        border_color: "#000000",
        background_color: "#004C64",
        button_color: "#0084A0",
      },
      payment_method: ["card", "account", "transfer", "wallet", "ussd"],
      display_fee: true, // true
      display_type: "embed", //inline
      logo: "logo_url | base64",
    },
  };

  const close = (close) => {
    console.log(close);
  };
  const callback = (response, closeCheckout) => {
    console.log(response);

    setTimeout(() => closeCheckout(), 2000);
  };
  const PayButton = () => {
    const initializePayment = useHydrogenPayment({
      ...options,
      callback,
      close,
    });
    return <button onClick={initializePayment}>Pay</button>;
  };
  return (
    <div className="App">
      <PayButton />

    </div>
  );
}

export default App;
