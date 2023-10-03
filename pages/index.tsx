import { Navbar } from "@/components/navbar";
import { FooterSection } from "components/footer";
import {
  BestSpeakersSection,
  CompanyStatisticsSection,
  Events,
  HeroContent,
  InviteSection,
  HowItWorks,
} from "components/home";

export interface HomeProps {}

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
