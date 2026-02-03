import { useEffect, useRef } from "react";

const RazorpayButton: React.FC = () => {
  const containerRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 👇 prevents double injection in React 18 StrictMode
    if (container.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute(
      "data-payment_button_id",
      "pl_SBTk0NHmhpgBrH"
    );

    container.appendChild(script);
  }, []);

  return <form ref={containerRef}></form>;
};

export default RazorpayButton;
