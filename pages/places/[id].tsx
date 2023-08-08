import { useRouter } from "next/router";

export default function PlaceDetails() {
  const router = useRouter();
  return <>Place Details: {router.query.id}</>;
}
