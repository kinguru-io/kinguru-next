import "tailwindcss/tailwind.css";
import { Events } from "@/components/events";
import { HeroContent } from "@/components/hero";
import { InviteSection } from "@/components/invite";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroContent />
      <Events />
      <InviteSection />
    </>
  );
}
