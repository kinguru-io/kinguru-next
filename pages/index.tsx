import "tailwindcss/tailwind.css";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const { data: session } = useSession();
  const user = trpc.aggregateUser.useQuery({
    name: session?.user?.name || "edelwud",
  });

  if (user.isLoading) {
    return <>Loading...</>;
  }

  return <>{user.data?._count}</>;
}
