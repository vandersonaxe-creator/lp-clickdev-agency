"use client"

import { LandingNavbar } from "./components/navbar"
import { HeroSection } from "./components/hero-section"
import { ProofStrip } from "./components/proof-strip"
import { PainSection } from "./components/pain-section"
import { BentoSection } from "./components/bento-section"
import { ProcessSection } from "./components/process-section"
import { FounderSection } from "./components/founder-section"
import { TestimonialsSection } from "./components/testimonials-section"
import { FaqSection } from "./components/faq-section"
import { CTASection } from "./components/cta-section"
import { LandingFooter } from "./components/footer"
import { ScrollJourney } from "./components/scroll-journey"

export function LandingPageContent() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <ScrollJourney />

      <main>
        <HeroSection />
        <ProofStrip />
        <PainSection />
        <BentoSection />
        <ProcessSection />
        <FounderSection />
        <TestimonialsSection />
        <FaqSection />
        <CTASection />
      </main>

      <LandingFooter />
    </div>
  )
}
