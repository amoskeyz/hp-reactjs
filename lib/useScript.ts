import React, { useEffect, useState } from "react";

interface Script {
  loaded: boolean;
  error: boolean;
}

const useScript = (scriptId: any, mode: string) => {
  const exists = document.getElementById(scriptId);
  const testScriptUrl = "https://checkout.seerbitapi.com/api/v2/seerbit.js";
  const liveScriptUrl = "https://checkout.seerbitapi.com/";

  const [state, setState] = useState<Script>({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    if (!exists) {
      const script = document.createElement("script");
      script.src = mode === "LIVE" ? liveScriptUrl : testScriptUrl;
      script.id = Math.random().toString();
      script.async = true;

      const onLoadScript = (): void => {
        setState({
          loaded: true,
          error: false,
        });
      };

      const onErrorScript = (): void => {
        script.remove();
        setState({
          loaded: false,
          error: true,
        });
      };

      script.addEventListener("load", onLoadScript);
      script.addEventListener("complete", onLoadScript);
      script.addEventListener("error", onErrorScript);

      document.head.appendChild(script);

      return () => {
        script.removeEventListener("load", onLoadScript);
        script.removeEventListener("error", onErrorScript);
      };
    } else {
      setState({
        loaded: true,
        error: false,
      });
    }
  }, []);

  return [state.error, state.loaded];
};

export default useScript;
