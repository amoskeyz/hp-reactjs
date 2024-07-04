import { useEffect } from "react";
import usePaymentScript from "./usePaymentScript";
import { openHydrogenPayModal, HydrogenPaymentTypes } from "./helpers";

export default function useHydrogenPayment(
  payload: HydrogenPaymentTypes
): () => void {
  const [scriptError, loaded] = usePaymentScript(payload.mode);

  function paymentInit(): void {
    if (scriptError) {
      throw new Error("Unable to load payment script");
    }
    if (loaded) {
      openHydrogenPayModal(payload);
    }
  }

  useEffect(() => {
    if (scriptError) {
      throw new Error("Unable to load payment script");
    }
  }, [scriptError]);

  return paymentInit;
}
