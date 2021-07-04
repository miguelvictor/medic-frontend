import { DashboardInfoResponse } from "../api"
import DashboardInfoCard, { DashboardInfoCardIcon } from "./dashboard-info-card"

export interface DashboardInfoProps {
  info: DashboardInfoResponse | null
  isLoading: boolean
}

export default function DashboardInfo({ isLoading, info }: DashboardInfoProps) {
  return (
    <div className="flex flex-col md:flex-row space-x-4">
      <DashboardInfoCard
        icon={DashboardInfoCardIcon.Scale}
        label="住院人数"
        value={info?.patients}
        unit="病人"
        trend={info?.trendPatients}
        isLoading={isLoading}
      />
      <DashboardInfoCard
        icon={DashboardInfoCardIcon.Heart}
        label="入住 ICU 人数"
        value={info?.icuPatients}
        unit="病人"
        trend={info?.trendIcuPatients}
        isLoading={isLoading}
      />
      <DashboardInfoCard
        icon={DashboardInfoCardIcon.Exclamation}
        label="预测危险人数"
        value={info?.warnings}
        unit="病人"
        trend={info?.trendWarnings}
        isLoading={isLoading}
      />
      <DashboardInfoCard
        icon={DashboardInfoCardIcon.UserGroup}
        label="医生人数"
        value={info?.doctors}
        unit="医生"
        trend={info?.trendDoctors}
        isLoading={isLoading}
      />
    </div>
  )
}
