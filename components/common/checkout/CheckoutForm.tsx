import { Button } from "@chakra-ui/react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocale } from "@/utils/use-locale.ts";

export default function CheckoutForm({
  succeedRefetch,
}: {
  succeedRefetch: () => void;
}) {
  const { t } = useLocale();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "",
      },
      redirect: "if_required",
    });

    if (!error) {
      setIsProcessing(false);
      setTimeout(succeedRefetch, 1000);
      return;
    }

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        background: "rgba(255,255,255,.1)",
        borderRadius: "5px",
        color: "white",
        textAlign: "center",
      }}
    >
      <PaymentElement
        id="payment-element"
        options={{
          layout: "accordion",
        }}
      />
      <Button
        isLoading={isProcessing || !stripe || !elements}
        type={"submit"}
        id="submit"
        variant={"primary"}
        color={"black"}
        mt={5}
      >
        <span id="button-text">
          {isProcessing ? t("events.processing") : t("events.pay_now")}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
