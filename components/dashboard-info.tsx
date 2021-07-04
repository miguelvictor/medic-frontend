import DashboardInfoCard, { DashboardInfoCardIcon } from "./dashboard-info-card"

export interface DashboardInfoProps {
  patients: number
  warnings: number
  discharged: number
  doctors: number
  trendPatients: number
  trendWarnings: number
  trendDischarged: number
  trendDoctors: number
}

export default function DashboardInfo({
  patients,
  warnings,
  discharged,
  doctors,
  trendPatients,
  trendWarnings,
  trendDischarged,
  trendDoctors,
}: DashboardInfoProps) {
  return (
    <div className="flex flex-col md:flex-row space-x-4">
      <DashboardInfoCard
        icon={DashboardInfoCardIcon.Scale}
        label="住院人数"
        value={patients}
        unit="病人"
        trend={trendPatients}
      />
      <DashboardInfoCard
        icon={DashboardInfoCardIcon.Exclamation}
        label="预测危险人数"
        value={warnings}
        unit="病人"
        trend={trendWarnings}
      />
      <DashboardInfoCard
        icon={DashboardInfoCardIcon.Heart}
        label="已出院人数"
        value={discharged}
        unit="病人"
        trend={trendDischarged}
      />
      <DashboardInfoCard
        icon={DashboardInfoCardIcon.UserGroup}
        label="医生人数"
        value={doctors}
        unit="医生"
        trend={trendDoctors}
      />
    </div>
  )
}
