import { PcmAlertsSection } from "./components/pcm-alerts-section"
import { PcmChartsSection } from "./components/pcm-charts-section"
import { PcmKpiSection } from "./components/pcm-kpi-section"

export default function Page() {
  return (
    <>
      <PcmKpiSection />
      <PcmChartsSection />
      <PcmAlertsSection />
    </>
  )
}
