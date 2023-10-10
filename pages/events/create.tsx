import { NewEventStepper } from "@/components/events/create";
import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function EventCreate() {
  return (
    <>
      <Navbar />
      <NewEventStepper />
      <FooterSection />
    </>
  );
}
