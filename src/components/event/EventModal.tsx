"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import CheckoutForm from "../common/checkout/CheckoutForm";
import { Button, Modal, ModalInitiator, ModalWindow } from "../uikit";
import { getTicketIntent } from "@/lib/actions/event/joinEvent/ticketIntent";
import { Box, VStack } from "~/styled-system/jsx";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type EventModalProps = {
  eventId: string;
  joinEventAction: Function;
  leaveEventAction: Function;
  isJoinEventAction: Function;
};

export function EventModal({
  eventId,
  joinEventAction,
  leaveEventAction,
  isJoinEventAction,
}: EventModalProps) {
  const t = useTranslations("event.future_event_page");
  const [clientSecret, setClientSecret] = useState("");
  const [isJoin, setJoin] = useState(false);
  const [isPending, startTransition] = useTransition();

  const joinEvent = async () => {
    await joinEventAction(eventId, { next: { tags: ["eventJoin"] } });
    setJoin(true);
    setClientSecret("");
  };

  const getIsJoinInfo = async () => {
    setJoin(await isJoinEventAction(eventId));
  };

  const leaveFromEvent = async () => {
    startTransition(async () => {
      await leaveEventAction(eventId, { next: { tags: ["eventJoin"] } });
      setJoin(false);
    });
  };

  const getClientSecret = () => {
    startTransition(async () => {
      const { clientSecret: secret } = await getTicketIntent(eventId);
      setClientSecret(secret);
    });
  };

  useEffect(() => {
    void getIsJoinInfo();
  }, []);

  return (
    <Modal>
      {!isJoin ? (
        <ModalInitiator>
          <Button
            size="lg"
            variant="solid"
            colorPalette="primary"
            isLoading={isPending}
            onClick={getClientSecret}
          >
            {t("join")}
          </Button>
        </ModalInitiator>
      ) : (
        <Button
          size="lg"
          variant="solid"
          colorPalette="primary"
          disabled={isPending}
          onClick={leaveFromEvent}
        >
          {t("leave")}
        </Button>
      )}
      {clientSecret !== "" ? (
        <ModalWindow>
          <VStack gap="12px">
            <h4>{t("buy_a_ticket")}</h4>
            <Box bg="neutral.5" borderRadius="10px">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm succeedRefetch={joinEvent} />
              </Elements>
            </Box>
          </VStack>
        </ModalWindow>
      ) : null}
    </Modal>
  );
}
