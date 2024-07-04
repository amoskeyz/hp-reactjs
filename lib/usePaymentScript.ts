import React, { useEffect, useState } from "react";

interface ScriptType {
  loaded: boolean;
  error: boolean;
}

const usePaymentScript = (mode: string) => {
  const testScriptUrl =
    "https://hydrogenshared.blob.core.windows.net/paymentgateway/paymentGatewayIntegration_v1.js";
  const liveScriptUrl =
    "https://hydrogenshared.blob.core.windows.net/paymentgateway/paymentGatewayIntegration_v1.js";

  const [state, setState] = useState<ScriptType>({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    try {
      let paymentScript = document.createElement("script");
      paymentScript.src = mode === "LIVE" ? liveScriptUrl : testScriptUrl;
      paymentScript.async = true;
      paymentScript.id = Math.floor(Math.random() * 100).toString();

      const onErrorScript = (): void => {
        setState({
          loaded: false,
          error: true,
        });
      };

      const onLoadScript = (): void => {
        setState({
          loaded: true,
          error: false,
        });
      };

      paymentScript.addEventListener("error", onErrorScript);
      paymentScript.addEventListener("complete", onLoadScript);
      paymentScript.addEventListener("load", onLoadScript);

      document.head.appendChild(paymentScript);

      return () => {
        paymentScript.removeEventListener("error", onErrorScript);
        paymentScript.removeEventListener("load", onLoadScript);
      };
    } catch (error) {}
  }, []);

  return [state.error, state.loaded];
};

export default usePaymentScript;
