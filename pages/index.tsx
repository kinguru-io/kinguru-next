import "tailwindcss/tailwind.css";
import { FooterSection } from "components/footer";
import {
  BestSpeakersSection,
  CompanyStatisticsSection,
  Events,
  HeroContent,
  InviteSection,
  HowItWorks,
} from "components/home";
import { Navbar } from "components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroContent />
      <Events />
      <InviteSection />
      <HowItWorks />
      <BestSpeakersSection />
      <CompanyStatisticsSection />
      <FooterSection />
    </>
  );
}
