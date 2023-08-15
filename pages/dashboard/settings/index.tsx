import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { BestSpeakersSection } from "components/home/bestSpeakers";
import { CompanyStatisticsSection } from "components/home/companyStatistics";
import { Events } from "components/home/events";
import { HeroContent } from "components/home/hero";
import { InviteSection } from "components/home/invite";
import { HowItWorks } from "components/home/works";

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
