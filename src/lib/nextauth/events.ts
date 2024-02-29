import { EventCallbacks } from "next-auth";
import prisma from "@/server/prisma.ts";

export const events = {
  async signOut({ session }) {
    const { sessionToken = "" } = session as unknown as {
      sessionToken?: string;
    };

    if (sessionToken) {
      await prisma.session.deleteMany({
        where: {
          sessionToken,
        },
      });
    }
  },
} as Partial<EventCallbacks>;
