import { HeroSection } from "@/components/sections/hero-section";
import { WhyMattersSection } from "@/components/sections/why-matters-section";
import { WhatIDesignSection } from "@/components/sections/what-i-design-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { WhyWorkWithMeSection } from "@/components/sections/why-work-section";
import { ProcessSection } from "@/components/sections/process-section";
import { HostingSection } from "@/components/sections/hosting-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyMattersSection />
      <WhatIDesignSection />
      <SelectedWorkSection />
      <WhyWorkWithMeSection />
      <ProcessSection />
      <HostingSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
