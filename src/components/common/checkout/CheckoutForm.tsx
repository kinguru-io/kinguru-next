import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ErrorIcon } from "react-hot-toast";
import { Button } from "@/components/uikit";
import { priceFormatter } from "@/lib/utils";
import { css } from "~/styled-system/css";
import { Flex, HStack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";

export function CheckoutForm({
  succeedRefetch,
  total,
  cancelButton,
}: {
  succeedRefetch: () => void;
  total?: number;
  cancelButton?: React.ReactNode;
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
      className={stack({ gap: "4" })}
    >
      {message && (
        <HStack maxWidth="80" fontSize="sm">
          <ErrorIcon className={css({ flexShrink: "0" })} />
          {message}
        </HStack>
      )}
      <PaymentElement
        id="payment-element"
        className={css({ minHeight: "96", minWidth: "80" })}
      />
      <Flex css={{ gap: "2", marginBlockStart: "auto" }}>
        {cancelButton}
        <Button
          id="submit"
          type="submit"
          isLoading={isProcessing || !stripe || !elements}
          rounded={false}
          className={css({ flexGrow: "1" })}
        >
          {t("pay_now")} {total && <b>{priceFormatter.format(total)}</b>}
        </Button>
      </Flex>
    </form>
  );
}
