import { getServerSession } from "next-auth";
import { adapterOptions } from "@/lib/nextauth/adapterOptions.ts";

export function getSession() {
  return getServerSession({
    ...adapterOptions,
    callbacks: {
      session({ session, user }) {
        if (!session?.user) {
          return session;
        }

        if (session.user.role === "organization") {
          session.user.image = user.organizations[0].logotype;
        }

        session.user.role = user.role;
        session.user.id = user.id;
        session.user.speaker = user.speaker;
        session.user.organizations = user.organizations;
        session.user.stripeCustomerId = user.stripeCustomerId;

        return session;
      },
    },
  });
}
