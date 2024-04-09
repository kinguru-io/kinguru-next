import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ErrorIcon } from "react-hot-toast";
import { Button } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";

export function CheckoutForm({
  succeedRefetch,
}: {
  succeedRefetch: () => void;
}) {
  const t = useTranslations("stripe_checkout_form");
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formSubmitted = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "" },
      redirect: "if_required",
    });

    if (!error) {
      setIsProcessing(false);
      setTimeout(succeedRefetch, 1000);
      return;
    }

    const errorMessage =
      error.type === "card_error" || error.type === "validation_error"
        ? error.message || null
        : t("unexpected_error_msg");

    setMessage(errorMessage);
    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={formSubmitted}
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
      })}
    >
      {message && (
        <HStack maxWidth="310px">
          <ErrorIcon className={css({ flexShrink: "0" })} />
          {message}
        </HStack>
      )}
      <PaymentElement id="payment-element" />
      <Button
        id="submit"
        type="submit"
        size="md"
        variant="ghost"
        isLoading={isProcessing || !stripe || !elements}
      >
        {t("pay_now")}
      </Button>
    </form>
  );
}
