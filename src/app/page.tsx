import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { SmartBudgeting } from "@/components/sections/SmartBudgeting";
import { Features } from "@/components/sections/Features";
import { UniqueFeatures } from "@/components/sections/UniqueFeatures";
import { ScamShield } from "@/components/sections/ScamShield";
import { GoalsSavings } from "@/components/sections/GoalsSavings";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { PeriodWellness } from "@/components/sections/PeriodWellness";
import { HealthAgent } from "@/components/sections/HealthAgent";
import { InvestmentAdvisor } from "@/components/sections/InvestmentAdvisor";
import { Gamification } from "@/components/sections/Gamification";
import { FinancialLiteracy } from "@/components/sections/FinancialLiteracy";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WomenFirst } from "@/components/sections/WomenFirst";
import { Comparison } from "@/components/sections/Comparison";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";
import { GetStarted } from "@/components/sections/GetStarted";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { NoiseTexture } from "@/components/shared/NoiseTexture";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <NoiseTexture />
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Problem />
        <Solution />
        <SmartBudgeting />
        <Features />
        <UniqueFeatures />
        <ScamShield />
        <GoalsSavings />
        <DashboardPreview />
        <PeriodWellness />
        <HealthAgent />
        <InvestmentAdvisor />
        <Gamification />
        <FinancialLiteracy />
        <HowItWorks />
        <WomenFirst />
        <Comparison />
        <Testimonials />
        <CTABanner />
        <GetStarted />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
