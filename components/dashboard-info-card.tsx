import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  HeartIcon,
  ScaleIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"

export enum DashboardInfoCardIcon {
  Exclamation,
  Heart,
  Scale,
  UserGroup,
}

export interface DashboardInfoCardProps {
  icon: DashboardInfoCardIcon
  label: string
  value?: number
  unit: string
  trend?: number
  isLoading: boolean
}

export default function DashboardInfoCard({
  icon,
  label,
  value,
  unit,
  trend,
  isLoading,
}: DashboardInfoCardProps) {
  const iconElement = getIconElement(icon)
  const trendElement = isLoading ? null : getTrendElement(trend)
  const valueElement = isLoading ? (
    <div className="animate-pulse h-4 w-16 bg-gray-400 rounded mt-1"></div>
  ) : (
    `${value ?? "～"} ${unit}`
  )

  return (
    <div className="p-6 bg-white shadow rounded-lg flex-1 flex items-center">
      {iconElement}
      <div className="ml-4">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-bold">{valueElement}</div>
      </div>
      {trendElement}
    </div>
  )
}

function getIconElement(
  icon: DashboardInfoCardIcon,
  containerClasses = "h-12 w-12 rounded flex",
  iconClasses = "h-8 w-8 text-white m-auto"
) {
  let iconElement = null

  switch (icon) {
    case DashboardInfoCardIcon.Heart:
      containerClasses += " bg-green-500"
      iconElement = <HeartIcon className={iconClasses} />
      break
    case DashboardInfoCardIcon.Exclamation:
      containerClasses += " bg-red-500"
      iconElement = <ShieldExclamationIcon className={iconClasses} />
      break
    case DashboardInfoCardIcon.Scale:
      containerClasses += " bg-yellow-500"
      iconElement = <ScaleIcon className={iconClasses} />
      break
    case DashboardInfoCardIcon.UserGroup:
      containerClasses += " bg-blue-500"
      iconElement = <UserGroupIcon className={iconClasses} />
      break
  }

  return <div className={containerClasses}>{iconElement}</div>
}

function getTrendElement(
  trend: number | undefined,
  containerClasses = "ml-4 text-sm mt-7 flex items-center"
) {
  if (!trend) return null

  const trendElement =
    trend > 0 ? (
      <ArrowSmUpIcon className="h-5" />
    ) : (
      <ArrowSmDownIcon className="h-5" />
    )

  // positive trend -> green text
  // negative trend -> red text
  if (trend > 0) {
    containerClasses += " text-green-600"
  } else {
    containerClasses += " text-red-600"
  }

  return (
    <div className={containerClasses}>
      {trendElement}
      {Math.abs(trend)}
    </div>
  )
}
