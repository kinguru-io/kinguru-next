"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { CheckoutForm } from "@/components/common/checkout";
import { Button, Modal, ModalInitiator, ModalWindow } from "@/components/uikit";
import {
  GetTicketIntentAction,
  IsJoinedAction,
  LeaveEventAction,
  RefreshOrderAction,
} from "@/lib/actions/event/order";
import { Box, VStack } from "~/styled-system/jsx";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type EventModalProps = {
  eventId: string;
  isJoined: boolean;
  refreshOrderAction: RefreshOrderAction;
  isJoinedAction: IsJoinedAction;
  getTicketIntentAction: GetTicketIntentAction;
  leaveEventAction: LeaveEventAction;
};

export function EventModal({
  eventId,
  isJoined,
  getTicketIntentAction,
  refreshOrderAction,
  leaveEventAction,
}: EventModalProps) {
  const t = useTranslations("event.future_event_page");
  const [clientSecret, setClientSecret] = useState("");
  const [isPending, startTransition] = useTransition();

  const paymentSucceed = () => {
    setClientSecret("");
    void refreshOrderAction();
  };

  const leaveFromEvent = async () => {
    startTransition(async () => {
      await leaveEventAction(eventId);
    });
  };

  const getClientSecret = () => {
    startTransition(async () => {
      const { clientSecret: secret } = await getTicketIntentAction(eventId);
      setClientSecret(secret);
    });
  };

  return (
    <Modal>
      {!isJoined ? (
        <ModalInitiator>
          <Button size="lg" isLoading={isPending} onClick={getClientSecret}>
            {t("join")}
          </Button>
        </ModalInitiator>
      ) : (
        <Button size="lg" disabled={isPending} onClick={leaveFromEvent}>
          {t("leave")}
        </Button>
      )}
      {clientSecret !== "" ? (
        <ModalWindow>
          <VStack gap="12px">
            <h4>{t("buy_a_ticket")}</h4>
            <Box bg="light" borderRadius="10px">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm succeedRefetch={paymentSucceed} />
              </Elements>
            </Box>
          </VStack>
        </ModalWindow>
      ) : null}
    </Modal>
  );
}
