import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";

export const useFetchCurrentUser = () => {
  const { status: sessionStatus } = useSession();
  const { data: user, status } = trpc.user.whoAmI.useQuery(undefined, {
    trpc: {
      context: {
        skipBatch: true,
      },
    },
  });
  return {
    user,
    status,
    authenticated: sessionStatus === "authenticated",
  };
};
