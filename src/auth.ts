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

        const { id, role, speaker, organizations, stripeCustomerId } = user;
        return {
          ...session,
          user: {
            ...session.user,
            id,
            role,
            speaker,
            organizations,
            stripeCustomerId,
            image:
              role === "organization"
                ? organizations.at(0)?.logotype
                : user.image,
          },
        };
      },
    },
  });
}
