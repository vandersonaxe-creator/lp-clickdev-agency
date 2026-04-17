"use client"

import React from 'react'
import { LandingNavbar } from './components/navbar'
import { HeroSection } from './components/hero-section'
import { FeaturesSection } from './components/features-section'
import { CTASection } from './components/cta-section'
import { ContactSection } from './components/contact-section'
import { FaqSection } from './components/faq-section'
import { LandingFooter } from './components/footer'
import { AboutSection } from './components/about-section'
import { AboutMeSection } from './components/about-me-section'
import { MethodSection } from './components/method-section'
import { LogoCarousel } from './components/logo-carousel'
import { StatsSection } from './components/stats-section'

export function LandingPageContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <LandingNavbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <LogoCarousel />
        <AboutSection />
        <AboutMeSection />
        <FeaturesSection />
        <MethodSection />
        <StatsSection />
        <FaqSection />
        <CTASection />
        <ContactSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  )
}
