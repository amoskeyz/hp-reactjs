export interface HydrogenPaymentTypes {
  amount: Number;
  customerName: string;
  reference?: string;
  email: string;
  currency?: string;
  description?: string;
  redirectUrl?: string;
  meta?: string;
  token: string;
  isRecurring?: boolean;
  frequency?: number;
  endDate?: string;
  onClose?: (event: Event) => void;
  onSuccess?: (event: Event) => void;
  payButton?: boolean;
  buttonStyle?: { [key: string]: string };
  buttontextStyles?: { [key: string]: string };
  buttonText?: string;
  autoStart?: boolean;
  mode: "LIVE" | "TEST";
}

export function hydrogenPay(
  options: HydrogenPaymentTypes,
  onClose?: (event: Event) => void,
  // onSuccess?: (event: Event) => void
) {
  // @ts-ignore
  window.handlePgData && window.handlePgData(options, options.token, onClose);
}
