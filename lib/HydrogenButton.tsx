import React, { ReactNode } from "react";
import useHydrogenPayment from "./useHydrogenPay";
import { HydrogenPaymentTypes } from "helpers";

interface ButtonTypes extends HydrogenPaymentTypes {
  text?: string;
  className?: string;
  children?: ReactNode;
}

const HydrogenPayButton = ({
  text = "Hydrogen Pay",
  className,
  children,
  ...payload
}: ButtonTypes): JSX.Element => {

  console.log(payload, "Hydrogen Pay")
  const initializePayment = useHydrogenPayment(payload);
  return (
    <button onClick={initializePayment} className={className}>
      {text || children}
    </button>
  );
};

export default HydrogenPayButton;
