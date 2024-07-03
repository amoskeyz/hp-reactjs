import { useEffect } from "react";
import useScript from "./useScript";
import { hydrogenPay, HydrogenPaymentTypes } from "./helpers";

export default function initHydrogenPayment(
  payload: HydrogenPaymentTypes,
  callback: () => void,
  // close: () => void
): () => void {
  const [error, loaded] = useScript("34", payload.mode);

  const {
    amount,
    email,
    currency,
    description,
    meta,
    isRecurring,
    frequency,
    customerName,
    mode,
    token,
  }: HydrogenPaymentTypes = payload;

  function paymentInit(): void {
    if (error) {
      throw new Error("Error loading checkout script");
    }

    if (loaded) {
      let paymentObject = {
        amount,
        email,
        currency,
        description,
        meta,
        isAPI: false,
        isRecurring,
        frequency,
        CustomerName: customerName,
        customerName,
        mode,
        token,
      };
      hydrogenPay(paymentObject, callback,);
    }
  }

  useEffect(() => {
    if (error) {
      // console.log(erroe)
      throw new Error("Error loading checkout script");
    }
  }, [error]);

  return paymentInit;
}
