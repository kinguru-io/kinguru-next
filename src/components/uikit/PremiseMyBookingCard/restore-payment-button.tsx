"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementLocale } from "@stripe/stripe-js";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { CheckoutForm } from "@/components/common/checkout";
import { Button, ModalWindow, useModal } from "@/components/uikit";
import { restoreStripeIntent } from "@/lib/actions/booking";
import { stack } from "~/styled-system/patterns";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type IntentChunk = {
  clientSecret: string;
  amount: number;
};

export function RestorePaymentButton({ intentId }: { intentId: string }) {
  const t = useTranslations("profile.my_bookings");
  const [pending, startTransition] = useTransition();
  const [intent, setIntent] = useState<IntentChunk | null>(null);
  const { setOpen } = useModal();

  const restoreButtonClicked = () => {
    startTransition(async () => {
      const partialIntent = await restoreStripeIntent(intentId);

      if (!partialIntent || !partialIntent.clientSecret) {
        toast.error(t("unknown_error"));
        return;
      }

      setIntent(partialIntent);
      setOpen(true);
    });
  };

  const paymentSucceed = () => {
    toast.success(t("action_successful_booking"));
    setIntent(null);
    setOpen(false);
  };

  return (
    <>
      <Button type="button" onClick={restoreButtonClicked} isLoading={pending}>
        {t("pay_button_label")}
      </Button>
      {intent && (
        <PaymentWindow intentChunk={intent} onSuccess={paymentSucceed} />
      )}
    </>
  );
}

function PaymentWindow({
  intentChunk,
  onSuccess,
}: {
  intentChunk: IntentChunk;
  onSuccess: () => void;
}) {
  const locale = useLocale();

  return (
    <ModalWindow>
      <section className={stack({ gap: "4", minHeight: "80" })}>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: intentChunk.clientSecret,
            locale: locale as StripeElementLocale,
          }}
        >
          <CheckoutForm
            succeedRefetch={onSuccess}
            total={intentChunk.amount / 100}
          />
        </Elements>
      </section>
    </ModalWindow>
  );
}
