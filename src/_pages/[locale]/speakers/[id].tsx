import { useRouter } from "next/router";

export default function SpeakerDetails() {
  const router = useRouter();
  return <>Speaker Details: {router.query.id}</>;
}
