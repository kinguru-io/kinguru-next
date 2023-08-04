import { useRouter } from "next/router";

export default function EventDetails() {
  const router = useRouter();
  return <>Event Details: {router.query.id}</>;
}
