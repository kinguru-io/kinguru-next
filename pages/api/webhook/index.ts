import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next/types";
import Stripe from "stripe";
import prisma from "@/server/prisma.ts";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;
const stripe = new Stripe(webhookSecret, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    try {
      const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntentSucceed = event.data.object;
          const { eventId, userId } = await prisma.ticketIntent.update({
            where: {
              id: paymentIntentSucceed.id,
            },
            data: {
              status: "succeed",
            },
            include: {
              event: true,
              user: true,
            },
          });

          await prisma.usersOnEvent.create({
            data: {
              eventId,
              userId,
            },
          });

          break;
        case "payment_intent.payment_failed":
          const paymentIntentFailed = event.data.object;
          await prisma.ticketIntent.update({
            where: {
              id: paymentIntentFailed.id,
            },
            data: {
              status: "failed",
            },
          });
          break;
        default:
          console.warn(`Unhandled event type: ${event.type}`);
      }
    } catch (err) {
      res.status(400).send(`Webhook Error: ${JSON.stringify(err)}`);
      return;
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
