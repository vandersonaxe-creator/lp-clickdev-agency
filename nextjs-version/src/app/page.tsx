import type { Metadata } from "next"
import { LandingPageContent } from "./landing/landing-page-content"
import { landingMetadata } from "./landing/landing-metadata"

export const metadata: Metadata = landingMetadata

export default function HomePage() {
  return <LandingPageContent />
}
