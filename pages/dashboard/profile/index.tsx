import "tailwindcss/tailwind.css";
import { BestSpeakersSection } from "@/components/bestSpeakers";
import { CompanyStatisticsSection } from "@/components/companyStatistics";
import { Events } from "@/components/events";
import { FooterSection } from "@/components/footer";
import { HeroContent } from "@/components/hero";
import { InviteSection } from "@/components/invite";
import { Navbar } from "@/components/navbar";
import { HowItWorks } from "@/components/works";

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
