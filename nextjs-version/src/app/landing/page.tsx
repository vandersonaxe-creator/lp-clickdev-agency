import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title: 'Click Dev — Digitalização Industrial sob medida',
  description:
    'Dashboards e sistemas sob medida para pequenas e médias indústrias. Produção, manutenção, ativos e metrologia com dados em tempo real.',
  keywords: ['click dev', 'digitalização industrial', 'pcm', 'manutenção', 'metrologia', 'dashboards', 'pmes'],
  openGraph: {
    title: 'Click Dev — Digitalização Industrial sob medida',
    description:
      'Dashboards e sistemas sob medida para pequenas e médias indústrias. Produção, manutenção, ativos e metrologia com dados em tempo real.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Click Dev — Digitalização Industrial sob medida',
    description:
      'Dashboards e sistemas sob medida para pequenas e médias indústrias. Produção, manutenção, ativos e metrologia com dados em tempo real.',
  },
}

export default function LandingPage() {
  return <LandingPageContent />
}
