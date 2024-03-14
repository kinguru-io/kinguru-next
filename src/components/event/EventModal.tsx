"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CheckoutForm from "../common/checkout/CheckoutForm";
import { Button } from "../uikit";
import { Modal, ModalInitiator, ModalWindow } from "../uikit/Modal";
import { getTicketIntent } from "@/lib/actions/event/joinEvent/ticketIntent";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type EventModalProps = {
  eventId: string;
};

export function EventModal({ eventId }: EventModalProps) {
  const t = useTranslations("event.future_event_page");
  const [clientSecret, setClientSecret] = useState("");

  const joinEvent = async () => {
    const { clientSecret: secret, id } = await getTicketIntent(eventId);
    setClientSecret(secret);
  };

  return (
    <>
      {clientSecret !== "" ? (
        <Modal>
          <ModalInitiator>
            <Button
              size="lg"
              variant="solid"
              colorPalette="primary"
              onClick={joinEvent}
            >
              {t("join")}
            </Button>
          </ModalInitiator>
          <ModalWindow>
            <h1>asdasdas</h1>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm succeedRefetch={() => {}} />
            </Elements>
          </ModalWindow>
        </Modal>
      ) : (
        <Button
          size="lg"
          variant="solid"
          colorPalette="primary"
          onClick={joinEvent}
        >
          {t("join")}
        </Button>
      )}
    </>
  );
}
