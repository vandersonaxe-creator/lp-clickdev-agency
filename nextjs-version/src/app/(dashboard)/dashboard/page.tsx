import { PcmAlertsSection } from "./components/pcm-alerts-section"
import { PcmChartsSection } from "./components/pcm-charts-section"
import { PcmKpiSection } from "./components/pcm-kpi-section"
import { DashboardTour } from "./components/dashboard-tour"

export default function Page() {
  return (
    <>
      <DashboardTour />
      <PcmKpiSection />
      <PcmChartsSection />
      <PcmAlertsSection />
    </>
  )
}
