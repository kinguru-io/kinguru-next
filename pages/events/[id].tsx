import { useRouter } from "next/router";
import {
  EventCommentsSection,
  EventDetailsSection,
  EventGuestsSection,
  EventPlaceSection,
  EventSpeakersSection,
} from "@/components/events/details";
import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function EventDetails() {
  const router = useRouter();
  const eventId =
    !router.query.id || router.query.id instanceof Array ? "" : router.query.id;
  return (
    <>
      <Navbar />
      <EventDetailsSection eventId={eventId} />
      <EventSpeakersSection eventId={eventId} />
      <EventCommentsSection eventId={eventId} />
      <EventGuestsSection eventId={eventId} />
      <EventPlaceSection eventId={eventId} />
      <FooterSection />
    </>
  );
}
